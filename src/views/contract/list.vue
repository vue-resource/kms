<script>
import { mapState} from 'vuex';
export default {
    name: "login",
    data() {
        return {
          projectId: this.$route.query.projectId,
          detail:{},
          list: {
            editPermission: false,
            nodeList: [],
            targetList: []
          },
          activeTab: '0',
          dataTab:[
            {name: '发出的目标', value: '0'},
            {name: '收到的目标', value: '1'}
          ]
        };
    },
    computed: {
      ...mapState('common',['nodeId'])
    },
    watch: {
      nodeId: {
        immediate: true,
        handler (nv) {
          if(nv !== ''){
            this.getTargetDirectoryInfoList();
          }
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods: {
      // 获取项目详情
      getDetail () {
        this.$ajax({
          url: '/project/getProjectInfo',
          method: 'get',
          params: {
            id: this.projectId
          }
        }).then(res => {
          if(res.success){
            this.detail = res.data;
          }
        })
      },
      // 获取目标列表
      getTargetDirectoryInfoList () {
        this.$ajax({
          url: '/target/getTargetDirectoryInfoList',
          method: 'get',
          params: {
            nodeId: this.nodeId,
            projectId: this.projectId,
            queryType: this.activeTab,
           
          }
        }).then(res => {
          if(res.success){
            this.list = res.data;
          }
        })
      },
      // 渲染列表
      renderTd (row, attr) {
          const nodeList = {
            snodeId: row.snodeId || '',
            vnodeId: row.vnodeId || '',
            fnodeId: row.fnodeId || '',
            dnodeId: row.dnodeId || ''
          };
          return nodeList.snodeId === attr.id 
            ? 'S' 
            : nodeList.dnodeId === attr.id 
              ? 'D' 
              : nodeList.vnodeId === attr.id 
                ? 'V'
                :nodeList.fnodeId === attr.id ? 'F' :''
      }
    }
};
</script>
<template>
  <div class="contractBox">
    <div class="congoal">
      <el-tabs v-model="activeTab" @tab-click="getTargetDirectoryInfoList" class="contab">
           <el-tab-pane v-for="(tab, idx) in dataTab" :key="idx"
           :label="tab.name" :name="tab.value"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="contraceTab">
      <kms-table border stripe>
        <thead slot="header" >
            <tr>
              <th colspan="6" class="empty">
                <div class="chartBox">
                  <div class="circle">
                    <el-progress type="circle" :percentage="detail.duration ? parseInt(detail.consumeDuration/detail.duration * 100) : 0" ></el-progress>        
                  </div>
                  <div class="cirleright">
                    <div class="cirlehead">
                      <div class="timeLeft">
                          <p>项目工期</p>
                          <p class="timeText">{{detail.duration}}天</p>
                      </div>
                      <div class="timeright">
                          <p>消耗</p>
                          <p class="timeText">{{detail.consumeDuration}}天</p>
                      </div>
                    </div>
                    <div class="cirlefoot">
                      <div class="processOne">
                        <div class="processOneText">
                          <p>总R：{{detail.countTarget}}</p>
                          <p class="add">昨日新增：{{detail.addTarget}}</p>
                        </div>
                        <el-progress :percentage="detail.countTarget ? (detail.addTarget/detail.countTarget * 100) : 0" :show-text="false"></el-progress>
                      </div>
                      <div class="processTwo">
                        <div class="processTwoText">
                            <p>总S：{{detail.countIssue}}</p>
                            <p class="add">昨日完成：{{detail.finishIssue}}</p>
                        </div>
                        <el-progress :percentage="detail.countIssue ? (detail.finishIssue/detail.countIssue * 100) : 0" :show-text="false"></el-progress>
                      </div>
                    </div>
                    <template v-if="activeTab == 0 && list.editPermission > 0">
                      <router-link :to="`/contract/add?projectId=${projectId}`">
                        <el-button class="goalTargetTex" type="primary">创建目标</el-button>
                      </router-link>
                    </template>
                  </div>
                </div>
              </th>
              <th class="attr-column" rowspan="2" v-for="(col, idx) in list.nodeList" :key="idx">
                  <span>{{ col.nodeName }}</span>
              </th>
            </tr>
            <tr>
                <th width="50">序号</th>
                <th>目标名称</th>
                <th>目标分类</th>
                <th width="50">单位</th>
                <th>目标值</th>
                <th>需求编号</th>
            </tr>
        </thead>
        <tbody slot="body">
            <tr v-for="(item, idx) in list.targetList" :key="idx">
                <td>{{ item.id }}</td>
                <td>{{ item.targetName }}</td>
                <td>{{ item.categoryName }}</td>
                <td>{{ item.targetUnit }}</td>
                <td>{{ item.targetNum }}</td>
                <td></td>
                <td class="attr-column" v-for="(action, idx) in list.nodeList" :key="idx">
                  <router-link v-if="renderTd(item, action)" 
                    :to="`/contract/edit?id=${item.id}&tab=${activeTab}&projectId=${projectId}`">
                    {{ renderTd(item, action) }}
                  </router-link>
                </td>
            </tr>
        </tbody>
      </kms-table>
      <div v-show="list.targetList.length === 0" class="data-blank">暂无数据</div>
      <!-- <el-table :data="list.targetList" max-height="300" border>
          <el-table-column label="序号" prop="id" width="60" fixed></el-table-column>
          <el-table-column label="目标名称" prop="targetName" width="250" fixed></el-table-column>
          <el-table-column label="目标分类" prop="categoryName" width="200" fixed></el-table-column>
          <el-table-column label="单位" prop="targetUnit" width="80" fixed></el-table-column>
          <el-table-column label="目标值" prop="targetNum" width="100" fixed></el-table-column>
          <el-table-column label="需求编号" prop="" fixed></el-table-column>
          <el-table-column v-for="(col, idx) in list.nodeList" :key="idx" align="center">
              <template slot="header">
                  <ul class="mul-thead">
                      <li>{{ col.nodeName }}</li>
                  </ul>
              </template>
              <template slot-scope="scope">
                <router-link v-if="renderTd(scope.row, col)" 
                  :to="`/contract/edit?id=${scope.row.id}&tab=${activeTab}&projectId=${projectId}`">
                  {{ renderTd(scope.row, col) }}
                </router-link>
              </template>
          </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>
<style lang="less">

.contractBox {
    margin-right: 50px;
    margin: 0 auto;
    .congoal {
      width: 100%;
      height:40px;
      position: relative;
      padding-bottom: 20px;  
      .contab{
        position: absolute;
        right: 0;
        height:40px;
      } 
      .goaltipOne {
        border-bottom: 1px solid blue;
      }
      .line {
          height: 15px;
          width: 1px;
          background: #999;
          position: relative;
          top: 1px;
          margin: 0 5px;
      }
    }
    .contraceTab{
      padding-top:10px;
      overflow-x: auto;
      width: 100%;
    }
    .chartBox {
        height: 200px;
        max-width: 500px;
        clear:both;
        display: flex;
        background: #f4f4f4;
        border-radius: 6px;
        position: relative;
        margin: 0px 10px 10px 0;
        .circle{
          margin-top:40px;
          margin-left:20px;     
        }
        .cirleright{
          color:#aeaeae;
          flex:1;
          padding: 20px;
          .cirlehead{
            display: flex;
            .timeText{
              font-weight: 300;
              font-size:24px;
              padding-top:10px;
             color: #000;
            }
            .timeright{
              padding-left:25px;
            }

          }
          .cirlefoot{
            .processOne{
               padding-top:10px;
                padding-bottom:10px;
               .processOneText{
                  display: flex;
                }
            }
            .add{
              padding-left:30px;
            }
            .processTwoText{
              display: flex;
            }
          }
          .goalTargetTex{
            position: absolute;
            right:20px;
            top:20px;   
          }
        }
    }
    .confine {
        width: 450px;
        height: 220px;
        margin-top: 20px;
        display: inline-block;
        background-size: 100% 100%;
    }
    .mul-thead {
      li {
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .contraceTab .ui-table .attr-column {
        width: 15px;
        line-height: 1;
        span {
          display: block;
          width: 14px;
          word-break: break-word;
        }
        // vertical-align: top;
    }
    .contraceTab .ui-table {
      table{
        table-layout: auto;
      }
      tr {
        th {
          background-color: #343747;
          color: #fff;
          &.empty {
            background-color: #fff;
            border: none;
          }
        }
      }
    }

    
    .data-blank {
      line-height: 100px;
      text-align: center;
      color: #bbb;
    }
}
</style>
