<script>
export default {
    name: "target-edit",
    data() {
      return {
        targetId: this.$route.query.id,
        detail: {
          fileList: []
        },
        defineFiles: [],
        methodsFiles: [],
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
              targetId: this.targetId,
              viewType:this.activeTab //添加视觉效果 by duyin 2019-8-14
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
        let rel = [];
        if(fileList.length > 0){
          rel = fileList.slice(-1).map(file => ({
            fileName: file.name,
            fileUrl: file.response.data
          }));
        }
        this.defineFiles = this.defineFiles.concat(rel);
      },
      handleSuccessRight (response, file, fileList) {
        let rel = [];
        if(fileList.length > 0){
          rel = fileList.slice(-1).map(file => ({
            fileName: file.name,
            fileUrl: file.response.data
          }));
        }
        this.methodsFiles = this.methodsFiles.concat(rel);
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
          <el-button type="plain" disabled>目标拆解</el-button>
    </div>
    <div class="cardBox">
      <!-- 目标定义 -->
      <el-card class="card-left">
        <div slot="header" class="clearfix">
          <span>目标定义</span>
          <span class="tab-tip">最近更新：2019-09-09</span>
        </div>
        <el-table :data="tableData" class="gridtableft">
          <el-table-column prop="id" label="序号" width="60" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称" width="250"></el-table-column>
          <el-table-column prop="targetUnit" label="单位"></el-table-column>
          <el-table-column label="目标值" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.actual" v-if="$route.query.tab == 0"></el-input>
              <span v-else>{{ scope.row.actual }}</span>
            </template>
          </el-table-column>
        </el-table>
        <h2 class="text-title">
          <span  class="upText">相关附件</span>
          <el-upload class="upload-demo" :on-success="handleSuccessleft" :show-file-list="false"
              action="/rms/api/upload/uploadTargetFile" v-if="$route.query.tab == 0">
              <el-button type="text" class="upset">上传附件</el-button>
          </el-upload>
        </h2>
        <ul v-if="defineFiles.length > 0" class="ui-list">
          <li v-for="(item,idx) in defineFiles" :key="idx" class="file-item">
            <div class="carborad">{{ item.fileName}}</div>
            <div class="btns-tip">
              <i class="el-icon-download" @click="$message('即将开发下载功能')"></i>
              <i class="el-icon-error" @click="defineFiles.splice(idx, 1)"></i>
            </div>
          </li>
        </ul>
        <div class="reviewFoot" v-if="$route.query.tab == 0">
          <el-button @click="updateTarget(2)" type="info" disabled>发布</el-button>
          <el-button @click="updateTarget(1)" type="warning" >提交</el-button>
          <el-button @click="updateTarget(0)" type="primary">保存</el-button>
        </div>
      </el-card>
      
      <!-- 目标解决方案 -->
      <el-card  class="card-right">
        <div slot="header" class="clearfix">
          <el-tabs class="contain-lab" v-model="activeTab">
            <el-tab-pane v-for="(tab,idx) in dataTab" :key="idx" 
            :disabled="tab.disabled" :label="tab.name" :name="tab.value"></el-tab-pane>
          </el-tabs>
          <span class="tab-tip">最近更新：2019-10-10</span>
        </div>
        <el-table :data="tableData" class="gridtableft">
          <el-table-column prop="id" label="序号" width="60" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称" width="250"></el-table-column>
          <el-table-column prop="targetUnit" label="单位"></el-table-column>
          <el-table-column prop="targetUnit" label="设计值"></el-table-column>
          <el-table-column label="目标值" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.actual" v-if="$route.query.tab == 1"></el-input>
              <span v-else>{{ scope.row.actual }}</span>
            </template>
          </el-table-column>
        </el-table>
        <h2 class="text-title">
          <span  class="upText">相关附件</span>
          <el-upload class="upload-demo" :on-success="handleSuccessRight" :show-file-list="false"
              action="/rms/api/upload/uploadTargetFile" v-if="$route.query.tab == 1">
              <el-button type="text" class="upset">上传附件</el-button>
          </el-upload>
        </h2>
        <ul v-if="methodsFiles.length > 0" class="ui-list">
          <li v-for="(item,idx) in methodsFiles" :key="idx" class="file-item">
            <div class="carborad">{{ item.fileName}}</div>
            <div class="btns-tip">
              <i class="el-icon-download" @click="$message('即将开发下载功能')"></i>
              <i class="el-icon-error" @click="methodsFiles.splice(idx, 1)"></i>
            </div>
          </li>
        </ul>
        <div class="reviewFoot" v-if="$route.query.tab == 1">
          <el-button @click="updateTarget(2)" type="info" disabled>发布</el-button>
          <el-button @click="updateTarget(1)" type="warning" >提交</el-button>
          <el-button @click="updateTarget(0)" type="primary">保存</el-button>
        </div>
      </el-card>
      <div class="btn-back">
        <el-button @click="$router.back()" type="plain">返回</el-button>
      </div>
      
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
    
    .el-card {
      // width: fit-content;
      position: relative;    
      &.card-right {margin-top: 20px;}
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
      padding-bottom:5px;
      position: relative;
      .upText{
        &::after{
          content: '';
          width: 100%;
          height: 1px;
          display: inline-block;
          border-bottom:1px solid #ccc;
        }
      }
      
      .upload-demo {
        .upset{
          position:absolute;
          right: 0;
          top:10px;
        }
       
      }
       
    }
    .ui-list{
      font-size:14px;
      .file-item{
        overflow: hidden;
        .carborad {
          float: left;
        }
        .btns-tip {
          float: right;
          i {
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
            &:hover {
              color: #409eff;
            }
          }
          
        }
      }
    }
    .reviewFoot{
      padding-top:10px;
      padding-bottom:20px;
    }
  }
  .btn-back {
    padding-top: 20px;
    padding-bottom: 100px;
    text-align: center;
  }
}
</style>