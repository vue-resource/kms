<script>
export default {
    name: "target-edit",
    data() {
      return {
        targetId: this.$route.params.id,
        param: {
          name: '',
          nodeName: '',
          projectPeriod: '',
          time: ''
        },
        targetDetail: {},
        projectDetail: {},
        activeTab: '1',
        dataTab:[
          {name: '目标解决方案', value: '1'},
          {name: '目标验证', value: '2', disabled: true}
        ]
      }
    },
    computed: {
      tableData () {
        return [this.targetDetail]
      }
    },
    // 生命周期
    created() {
      this.getDetail();
      this.queryTarget();
    },
    methods: {
      // 项目详情
      getDetail () {
        this.$ajax({
          // url: '/project/getProjectInfo',
          url: '/project/getProjectInfo.json',
          method: 'get',
          params: {
            id: this.$route.query.projectId
          }
        }).then(res => {
          if(res.success){
            this.projectDetail = res.data;
          }
        })
      },
      // 目标详情
      queryTarget(){
        this.$ajax({
            // url: '/target/queryTarget',
            url: '/target/queryTarget.json',
            method: 'get',
            params: {
              targetId: this.targetId
            }
          }).then(res => {
            if(res.success){
              this.targetDetail = res.data;
            }
          })
      },
      updateTarget (role) {
        this.$ajax({
          // url: '/target/updateTarget',
          url: '/target/updateTarget.json',
          method: 'get',
          params: {
            ...this.param,
            cs:role,
            nodeId: this.targetId,
            adjunctList: this.targetDetail.adjunctList,
            targetNum: this.targetDetail.targetNum
          }
        }).then(res => {
          if(res.success){
            this.$router.push('/contract')
          }
        })
      }
    }
};
</script>
<template>
  <div class="project-edit">
    <el-form inline  >
      <el-form-item label="目标名称">
        <el-input placeholder="" v-model="param.name"></el-input>
      </el-form-item>
      <el-form-item label="边界系统">
        <el-input v-model="param.nodeName"></el-input>
      </el-form-item><br>
      <el-form-item label="边界系统">
        <el-select v-model="param.projectPeriod" placeholder="请选择" class="involution">
          <el-option v-for="item in projectDetail.projectTime" :key="item.id"
            :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间计划">
        <el-date-picker v-model="param.time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="involution">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="reletionship">
          <router-link to="/contract/topo">
            <el-button type="primary" class="temp-text">需求关系图</el-button>
          </router-link>
          <el-button type="plain">目标拆解</el-button>
    </div>
        <div class="cardBox">
            <el-card>
            <div slot="header" class="clearfix">
              <span v-if="$route.query.tab == 0">目标定义</span>
              <el-tabs class="contain-lab" v-model="activeTab" v-else>
                <el-tab-pane v-for="(tab,idx) in dataTab" :key="idx" 
                :disabled="tab.disabled" :label="tab.name" :name="tab.value"></el-tab-pane>
              </el-tabs>
              <span class="tab-tip">2019-08-03</span>
            </div>
            <el-table :data="tableData" class="gridtableft">
              <el-table-column prop="targetId" label="序号" width="100" ></el-table-column>
              <el-table-column prop="targetName" label="目标名称"></el-table-column>
              <el-table-column prop="targetUnit" label="单位"></el-table-column>
              <el-table-column label="目标值">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.targetNum"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <h2 class="text-title">相关附件</h2>
            <ul v-if="targetDetail.adjunctList" class="ui-list">
              <li v-for="(item,idx) in targetDetail.adjunctList" :key="idx">
                <div class="carborad">{{ item.fileName}}</div>
              </li>
            </ul>
            <div class="reviewFoot">
              <el-button @click="updateTarget(2)" type="primary" round>发布</el-button>
              <el-button @click="updateTarget(1)" type="plain" round>提交</el-button>
              <el-button @click="updateTarget(0)" type="plain" round>保存</el-button>
              <el-button @click="$router.push('/contract')" type="plain" round>取消</el-button>
            </div>
          </el-card>
         
        </div>
  
  </div>
</template>
<style lang="less">
.project-edit {
  .clearfix {
    clear: both;
    display: block;
    position: relative;
  }
  .tab-tip {
    position: absolute;
    right: 0;
    top:0;
  }
  .involution{
    width:180px;
  }
  .reletionship{
    position: absolute;
    right:0;
    transform: translate3d(-50%,-60px,0);
    height:40px;
   .temp-text{
     margin-right:10px;
   }
  }
  .cardBox{
    display: flex;
    width:400px; 
    .text-title{
      padding-top:10px;
      border-bottom:1px solid #ccc;
      padding-bottom:5px;
    }
    .ui-list{
      font-size:14px;
      padding-top:15px;
      li{
        line-height: 30px;
      }
    }
    .reviewFoot{
      padding-top:10px;
      padding-bottom:20px;
    }
  }
}
</style>