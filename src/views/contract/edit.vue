<script>
export default {
    name: "target-edit",
    data() {
      return {
        targetId: this.$route.query.id,
        detail: {
          fileList: []
        },
        activeTab: '1',
        dataTab:[
          {name: '目标解决方案', value: '1'},
          {name: '目标验证', value: '2', disabled: true}
        ]
      }
    },
    computed: {
      tableData () {
        const {id, targetName, actual, targetUnit} = this.detail;
        return [{
          id,
          targetName,
          actual,
          targetUnit
        }];
      }
    },
    // 生命周期
    created() {
      this.queryTarget();
    },
    methods: {
      // 目标详情
      queryTarget(){
        this.$ajax({
            url: '/target/queryTarget',
            method: 'get',
            params: {
              targetId: this.targetId
            }
          }).then(res => {
            if(res.success){
              this.detail = res.data;
            }
          })
      },
      updateTarget (role) {
        const { id, fileList } = this.detail;
        const actual = this.tableData[0].actual;
        this.$ajax({
          url: '/target/updateTarget',
          method: 'post',
          data: {
            id,
            fileList,
            actual
          }
        }).then(res => {
          if(res.success){
            this.$router.back();
          }
        })
      },
      handleSuccessleft (response, file, fileList) {
        console.log(response, file, fileList)
      },
      handleSuccessRight (response, file, fileList) {
        console.log(response, file, fileList)
      }
    }
};
</script>
<template>
  <div class="project-edit">
    <el-form inline  class="">
      <el-form-item label="目标名称：">{{ detail.targetName }}</el-form-item>
      <el-form-item label="边界系统：">{{ detail.nodeName }}</el-form-item>
      <el-form-item label="项目阶段：">{{ detail.periodName }}</el-form-item>
      <el-form-item label="时间计划：">{{ detail.datePlan }}</el-form-item>
    </el-form>
    <div class="reletionship">
          <router-link :to="`/contract/topo?id=${targetId}`">
            <el-button type="primary" class="temp-text">需求关系图</el-button>
          </router-link>
          <el-button type="plain">目标拆解</el-button>
    </div>
        <div class="cardBox">
          <el-card class="card-left">
            <div slot="header" class="clearfix">
              <span>目标定义</span>
              <span class="tab-tip">2019-09-09</span>
            </div>
            <el-table :data="tableData" class="gridtableft">
              <el-table-column prop="id" label="序号" width="60" ></el-table-column>
              <el-table-column prop="targetName" label="目标名称" width="300"></el-table-column>
              <el-table-column prop="targetUnit" label="单位"></el-table-column>
              <el-table-column label="目标值" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.actual"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <h2 class="text-title">
              相关附件
              <el-upload class="upload-demo" :on-success="handleSuccessleft"
                  action="http://39.100.134.212:8081/rms/api/upload/uploadTargetFile">
                  <el-button type="text">上传附件</el-button>
              </el-upload>
            </h2>
            <ul v-if="detail.fileList" class="ui-list">
              <li v-for="(item,idx) in detail.fileList" :key="idx">
                <div class="carborad">{{ item.fileName}}</div>
              </li>
            </ul>
            <div class="reviewFoot">
              <el-button @click="updateTarget(2)" type="primary" round>发布</el-button>
              <el-button @click="updateTarget(1)" type="plain" round disabled>提交</el-button>
              <el-button @click="updateTarget(0)" type="plain" round disabled>保存</el-button>
              <el-button @click="$router.back()" type="plain" round>取消</el-button>
            </div>
          </el-card>
          <el-card  class="card-right">
            <div slot="header" class="clearfix">
              <el-tabs class="contain-lab" v-model="activeTab">
                <el-tab-pane v-for="(tab,idx) in dataTab" :key="idx" 
                :disabled="tab.disabled" :label="tab.name" :name="tab.value"></el-tab-pane>
              </el-tabs>
              <span class="tab-tip">2019-10-10</span>
            </div>
            <el-table :data="tableData" class="gridtableft">
              <el-table-column prop="id" label="序号" width="60" ></el-table-column>
              <el-table-column prop="targetName" label="目标名称" width="300"></el-table-column>
              <el-table-column prop="targetUnit" label="单位"></el-table-column>
              <el-table-column prop="targetUnit" label="设计值"></el-table-column>
              <el-table-column prop="targetUnit" label="实际值" width="150"></el-table-column>
            </el-table>
            <h2 class="text-title">
              相关附件
              <el-upload class="upload-demo" :on-success="handleSuccessRight"
                  action="http://39.100.134.212:8081/rms/api/upload/uploadTargetFile">
                  <el-button type="text">上传附件</el-button>
              </el-upload>
            </h2>
            <ul v-if="detail.fileList" class="ui-list">
              <li v-for="(item,idx) in detail.fileList" :key="idx">
                <div class="carborad">{{ item.fileName}}</div>
              </li>
            </ul>
          </el-card>
          
        </div>
  
  </div>
</template>
<style lang="less">
.project-edit {
  padding-top:20px;
  color: #7a7a7a;
 
  .clearfix {
    clear: both;
    display: block;
    position: relative;
  }
  .tab-tip {
    position: absolute;
    right: 0;
    top:10px;
     color: #7a7a7a;  
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
    .el-card {
      width: 800px;
      &.card-right {margin-left: 20px;}
    }
    .contain-lab{
      height: 20px;
     border: 0;
     .el-tabs__nav-wrap::after{
       width:0;
       content: '';
       display: inline-block;
     }
    }
    .text-title{
      padding-top:10px;
      border-bottom:1px solid #ccc;
      padding-bottom:5px;
      overflow: hidden;
      .upload-demo {
        float: right;
      }
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