<script>
export default {
    name: "login",
    data() {
        return {
          nodeId: this.$route.query.id,
          detail:{},
          list: {},
          activeTab: '0',
          dataTab:[
            {name: '发出的目标', value: '0'},
            {name: '收到的目标', value: '1'}
          ]
        };
    },
    created(){
      this.getDetail();
      this.getTargetDirectoryInfoList();
    },
    methods: {
      // 获取项目详情
      getDetail () {
        this.$ajax({
          url: '/project/getProjectInfo',
          // url: '/project/getProjectInfo.json',
          method: 'post',
          data: {
            id: this.nodeId
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
          // url: '/target/getTargetDirectoryInfoList.json',
          method: 'post',
          params: {
            nodeId: 1,
            queryType: 1 // By duyin 2019-8-7
            // nodeId: this.nodeId,
            // queryType: this.activeTab
          },
           headers:{
            "Content-Type":"application/json"
          }
        }).then(res => {
          if(res.success){
            this.list = res.data;
          }
        })
      },
      // 渲染列表
      renderTd (column, item) {
          return column.rNodeId.indexOf(item.id) > -1  
            ? 'R' 
            : column.sNodeId.indexOf(item.id) > -1
              ? 'S'
              : column.vNodeId.indexOf(item.id) > -1 ? 'V' : '';
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
    <div class="chartBox">
      <div class="circle">
         <el-progress type="circle" :percentage="(detail.consumeDuration/detail.duration * 100||0)" ></el-progress>        
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
              <p class="add">昨日新增：{{detail.addIssue}}</p>
            </div>
            <el-progress :percentage="(detail.a/detail.countTarget * 100)||0" :show-text="false"  style="width:400px"></el-progress>
          </div>
          <div class="processTwo">
             <div class="processTwoText">
                <p>总S：{{detail.countIssue}}</p>
                <p class="add">昨日完成：{{detail.finishIssue}}</p>
             </div>
            <el-progress :percentage="(detail.b/detail.countIssue * 100)||0" :show-text="false" style="width:400px"></el-progress>
          </div>
        </div>
        <router-link :to="`/contract/add?id=${nodeId}`">
          <el-button class="goalTargetTex" type="primary">创建目标</el-button>
        </router-link>
      </div>
    </div>
    <div class="contraceTab">
      <el-table :data="list.targetlist" max-height="300" border>
          <el-table-column label="序号" prop="nodeId" width="100" fixed></el-table-column>
          <el-table-column label="目标名称" prop="targetName" width="100" fixed></el-table-column>
          <el-table-column label="目标分类" prop="targetCategory" width="100" fixed></el-table-column>
          <el-table-column label="单位" prop="targetUnit" width="100" fixed></el-table-column>
          <el-table-column label="目标值" prop="targetNum" width="100" fixed></el-table-column>
          <el-table-column label="需求编号" prop="reNum" width="100" fixed></el-table-column>
          <el-table-column v-for="(col, idx) in list.nodeList" :key="idx" align="center">
              <template slot="header">
                  <ul class="mul-thead">
                      <li>{{ col.nodeName }}</li>
                      <li>{{ col.role }}</li>
                      <li>{{ col.responsibler }}</li>
                  </ul>
              </template>
              <template slot-scope="scope">
                <router-link v-if="renderTd(scope.row, col)" :to="`/contract/${scope.row.id}?tab=${activeTab}&projectId=${nodeId}`">
                  {{ renderTd(scope.row, col) }}
                </router-link>
              </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="less">

.contractBox {
    margin-right: 50px;
    margin: 0 auto;
    .congoal {
        float: right;
        display: flex;
        font-size: 14px;   
      .contab{
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
    }
    .chartBox {
        width: 642px;
        height: 220px;
        clear:both;
        display: flex;
         background: #f4f4f4!important;
        border-radius: 6px;
         position: relative;
        margin: 0px 10px 10px 0;
        .circle{
          margin-top:40px;
          margin-left:26px;     
        }
        .cirleright{
          padding-top:30px;
          padding-left:25px;    
           color:#aeaeae;
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
        background: url("~@/assets/img/confine.jpeg") no-repeat;
        background-size: 100% 100%;
    }
    .mul-thead {
      margin: 0 -10px;
      li {
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
      }
    }
}
</style>
