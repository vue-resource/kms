<script>
export default {
    name: "target-edit",
    data() {
      return {
        targetId: this.$route.query.id,
        viewType: this.$route.query.tab,
        detail: {
          definitionList: [],
          definitionAdjunctList: [],
          schemeList: [],
          schemeAdjunctList: [],
          finalList:[]
        },
        chooseProp: false,
        curProp: null,
        targetNumberNew:'',
        activeTab: '1',
        dataTab:[
          {name: '目标解决方案', value: '1'},
          // {name: '目标验证', value: '2', disabled: true}
        ]
      }
    },
    computed: {
      tableData () {
        const {targetId, targetName, draftNum, targetUnit, targetNum, actual} = this.detail;
        return [{
          targetId,
          targetName,
          draftNum,
          targetUnit,
          actual,
          targetNum
        }];
      },
      propList () {
        const {definitionList, schemeList, finalList, targetStatus} = this.detail;
        const propSet = this.viewType == 0
          ? definitionList
          : targetStatus > 1 && targetStatus < 4
            ? finalList : schemeList;
        return propSet ? propSet.filter(item => item.propertyType == 1) : [];
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
              viewType:this.viewType
            }
          }).then(res => {
            if(res.success){
              this.detail = res.data;
            }
          })
      },
      startUpload(prop) {
        this.curProp = prop;
        this.$refs.upload.$el.querySelector('input[type=file]').click();
      },
      handleSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        if(response.success !== 1){
          this.$message(response.errorMsg);
          this.$refs.upload.clearFiles();
          return;
        }
        const {id, propertyName} = this.curProp;
        console.log('test', this.curProp)
        const rel = [{
            id: '',
            fileName: file.name,
            fileUrl: file.response.data,
            propertyId: id,
            propertyName
        }];
        if(this.viewType == 1){
          if(this.detail.targetStatus < 2){
            this.detail.schemeAdjunctList =  this.detail.schemeAdjunctList.concat( rel );
          }else {
            this.detail.finalAdjunctList =  this.detail.finalAdjunctList.concat( rel );
          }
        }else {
          this.detail.definitionAdjunctList =  this.detail.definitionAdjunctList.concat( rel );
        }
        this.chooseProp = false;
        this.$refs.upload.clearFiles();
      },
      getParams (status) {
        const { id,targetId, definitionList, definitionAdjunctList, 
          schemeList, schemeAdjunctList, finalList, finalAdjunctList} = this.detail;
        const { targetNum, draftNum, actual } = this.tableData[0] || {};
        const viewType = this.viewType;
        const targetStatus = status;
       
        const fileInfoEntityList = viewType == 0 
          ? definitionAdjunctList
          : this.detail.targetStatus > 1 && this.detail.targetStatus < 4
            ? finalAdjunctList : schemeAdjunctList;
        const propertyInfoList = viewType == 0 
          ? definitionList 
          : this.detail.targetStatus > 1 && this.detail.targetStatus < 4
            ? finalList : schemeList;
        return {
          id,targetId, viewType, targetStatus, targetNum, draftNum, actual,
          fileInfoEntityList, propertyInfoList
        };
      },
      sureUpdate (role) {
        const param = this.getParams(role);
        this.$ajax({
          url: '/target/updateTarget',
          method: 'post',
          data: param
        }).then(res => {
          if(res.success){
            this.$router.back();
          }
        })
      },
      downHandle(id){
        let orgin = window.location.origin,
        token = this.$store.state.common.token;
        window.location.href= orgin+"/rms/api/upload/getFile?fileId="+id+"&token="+token;
        
      },
      delHandle(){
         this.$confirm('是否删除该内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$ajax({
              url: '/target/delTarget',
              method: 'get',
              params: {
                targetId: this.targetId,
                viewType:this.viewType
              }
            }).then(res => {
              console.log(res)
              if(res.success){
               
                this.$router.back();
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      updateTarget (role) {
        if(role == 2 || role ==4){
          this.$confirm('此操作不可撤销, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.sureUpdate(role);
          })
        }else {
          this.sureUpdate(role);
        }
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
      <!-- <router-link :to="`/contract/topo?id=${targetId}`"> -->
        <el-button type="plain"  disabled>需求关系图</el-button>
      <!-- </router-link> -->
      <el-button type="plain" disabled>目标拆解</el-button>
      <el-button v-if="viewType == 0 && detail.targetStatus < 2" 
          @click="delHandle"
          type="primary" 
      class="temp-text" >删除</el-button>
    </div>
    <div class="cardBox">
      <!-- 目标定义 -->
      <el-card class="card-left">
        <div slot="header" class="clearfix">
          <span>目标定义</span>
          <span class="tab-tip">最近更新：{{ detail.updateTime }}</span>
        </div>
        <el-table :data="tableData" class="gridtableft">
          <el-table-column prop="targetId" label="序号" width="60" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称"></el-table-column>
          <el-table-column prop="targetUnit" label="单位" width="80"></el-table-column>
          <el-table-column label="目标值">
            <template slot-scope="scope">
              <el-input v-if="viewType == 0 && detail.targetStatus < 2"
                v-model="scope.row.draftNum"></el-input>
              <span v-else>{{ scope.row.draftNum }}</span>
            </template>
          </el-table-column>
          <template v-if="detail.definitionList && detail.definitionList.length > 0">
            <template v-for="(item, idx) in detail.definitionList">
              <el-table-column :label="item.propertyName" :key="idx" v-if="item.propertyType != 1">
                <input 
                  v-if="viewType == 0 && detail.targetStatus < 2"
                  v-model="item.propertyNumber" class="inputNum">
                <span v-else>{{ item.propertyNumber }}</span>
              </el-table-column>
            </template>
          </template>
        </el-table>
        <h2 class="text-title">
          <el-button 
            v-if="viewType == 0 && detail.targetStatus < 2 
            && detail.definitionList 
            && detail.definitionList.filter(item => item.propertyType == 1).length > 0" 
            type="text" @click="chooseProp = true">上传附件</el-button>
          <span  class="upText">相关附件</span>
        </h2>
        <ul v-if="detail.definitionAdjunctList && detail.definitionAdjunctList.length > 0" class="ui-list">
          <li v-for="(item,idx) in detail.definitionAdjunctList" :key="idx" class="file-item">
            <div class="carborad">{{ item.fileName }}</div>
            <div class="btns-tip">
              <span>属性名称：{{ item.propertyName }}</span>
              <i class="el-icon-download" v-if="item.id" @click="downHandle(item.id)"></i>
              <i class="el-icon-error" v-if="viewType == 0 && detail.targetStatus < 2"
                @click="detail.definitionAdjunctList.splice(idx, 1)"></i>
            </div>
          </li>
        </ul>
        <div class="reviewFoot" v-if="viewType == 0 && detail.targetStatus < 2">
          <el-button @click="updateTarget(1)" type="warning">发布</el-button>
          <el-button @click="updateTarget()" type="primary">保存</el-button>
        </div>
      </el-card>
      
      <!-- 目标解决方案 -->
      <el-card  class="card-right">
        <div slot="header" class="clearfix">
          <el-tabs class="contain-lab" v-model="activeTab">
            <el-tab-pane v-for="(tab,idx) in dataTab" :key="idx" 
            :disabled="tab.disabled" :label="tab.name" :name="tab.value"></el-tab-pane>
          </el-tabs>
          <span class="tab-tip">最近更新：{{ detail.updateTime }}</span>
        </div>
        <el-table :data="tableData" class="gridtableft">
          <el-table-column prop="targetId" label="序号" width="60" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称"></el-table-column>
          <el-table-column prop="targetUnit" label="单位" width="80"></el-table-column>
          <template v-if="detail.actual">
            <el-table-column label="实际值">
              <template slot-scope="scope">
                <el-input
                  v-if="viewType == 1 && detail.targetStatus < 2"
                  v-model="scope.row.actual"></el-input>
                <span v-else>{{ scope.row.actual }}</span>
              </template>
            </el-table-column>
          </template>
          <template v-if="detail.schemeList && detail.schemeList.length > 0">
            <template v-for="(item, idx) in detail.schemeList">
              <el-table-column :label="item.propertyName" :key="idx" v-if="item.propertyType != 1">
                <input type="text" 
                  v-if="viewType == 1 && detail.targetStatus < 2 "
                  v-model="item.propertyNumber" class="inputNum"/>
                <span v-else>{{ item.propertyNumber }}</span>
            </el-table-column>
            </template>
          </template>
        </el-table>
        <h2 class="text-title">
          <el-button 
            v-if="viewType == 1 && detail.targetStatus < 2 && detail.schemeList 
              && detail.schemeList.filter(item => item.propertyType == 1).length > 0" 
            type="text" @click="chooseProp = true">上传附件</el-button>
          <span  class="upText">相关附件</span>
        </h2>
        <ul v-if="detail.schemeAdjunctList && detail.schemeAdjunctList.length > 0" class="ui-list">
          <li v-for="(item,idx) in detail.schemeAdjunctList" :key="idx" class="file-item">
            <div class="carborad">{{ item.fileName}}</div>
            <div class="btns-tip">
              <i class="el-icon-download" v-if="item.id" @click="downHandle(item.id)"></i>
              <i v-if="viewType == 1 && detail.targetStatus < 2"
                class="el-icon-error" @click="detail.schemeAdjunctList.splice(idx, 1)"></i>
            </div>
          </li>
        </ul>
        <div class="reviewFoot" v-if="viewType == 1 && detail.targetStatus < 2">
          <el-button @click="updateTarget(1)" type="warning">发布</el-button>
          <el-button @click="updateTarget()" type="primary">保存</el-button>
        </div>
        <div class="reviewFoot" v-if="viewType == 0 && detail.targetStatus == 1">
          <el-button @click="updateTarget(2)" type="warning">确定</el-button>       
        </div>
      </el-card>

      <!-- 目标验证 -->
      <el-card  class="card-right" v-if="detail.targetStatus > 1">
        <div slot="header" class="clearfix">        
          <span>目标验证</span>
          <span class="tab-tip">最近更新：{{ detail.updateTime }}</span>    
        </div>
        <el-table :data="tableData" class="gridtableft">
          <el-table-column prop="targetId" label="序号" width="60" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称"></el-table-column>
          <el-table-column prop="targetUnit" label="单位" width="80"></el-table-column>
          <template v-if="detail.actual">
            <el-table-column label="实际值">
              <template slot-scope="scope">
                <el-input 
                  v-if="viewType == 1 && detail.targetStatus < 4"
                  v-model="scope.row.actual"></el-input>
                <span v-else>{{ scope.row.actual }}</span>
              </template>
            </el-table-column>
          </template>
          <template v-if="detail.finalList && detail.finalList.length > 0">
            <template v-for="(item, idx) in detail.finalList">
              <el-table-column :label="item.propertyName" :key="idx" v-if="item.propertyType != 1">
                <input 
                  v-if="viewType == 1 && detail.targetStatus < 4"
                  type="text" v-model="item.propertyNumber" class="inputNum"/>
                <span v-else>{{ item.propertyNumber }}</span>
              </el-table-column>
            </template>
          </template>
        </el-table>
        <h2 class="text-title">
          <el-button 
            v-if="viewType == 1 && detail.targetStatus < 4 && detail.finalList 
              && detail.finalList.filter(item => item.propertyType == 1).length > 0" type="text" 
            @click="chooseProp = true">上传附件</el-button>
          <span class="upText">相关附件</span>
        </h2>
        <ul v-if="detail.finalAdjunctList &&detail.finalAdjunctList.length > 0" class="ui-list">
          <li v-for="(item,idx) in detail.finalAdjunctList" :key="idx" class="file-item">
            <div class="carborad">{{ item.fileName}}</div>
            <div class="btns-tip">
              <i class="el-icon-download" v-if="item.id" @click="downHandle(item.id)"></i>
              <i v-if="viewType == 1 && detail.targetStatus < 4"
                @click="detail.finalAdjunctList.splice(idx, 1)" class="el-icon-error"></i>
            </div>
          </li>
        </ul>
        <div class="reviewFoot" v-if="viewType == 1 && detail.targetStatus < 4">
          <el-button @click="updateTarget(3)" type="warning">发布</el-button>
          <el-button @click="updateTarget()" type="primary">保存</el-button>
        </div>
        <div class="reviewFoot" v-if="viewType == 0 && detail.targetStatus == 3">
          <el-button @click="updateTarget(4)" type="warning">确定</el-button>       
        </div>
      </el-card>

      <div class="btn-back">
        <el-button @click="$router.back()" type="plain">返回</el-button>
      </div>
    </div>
    
    <!-- 上传附件，添加属性 -->
    <el-dialog title="选择属性" :visible.sync="chooseProp" width="50%" class="choose-prop-dialog">
      <el-upload class="upload-demo" :on-success="handleSuccess" :show-file-list="false" ref="upload"
          action="/rms/api/upload/uploadTargetFile">
      </el-upload>
      <ul class="choose-prop-list">
        <li v-for="(prop, idx) in propList" :key="idx" @click="startUpload(prop)">
          <el-button type="text">{{ prop.propertyName }}</el-button>
        </li>
      </ul>
    </el-dialog>
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
    transform: translate3d(-5%,-60px,0);
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
       .inputNum{
        -webkit-appearance: none;
          background-color: #FFF;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #DCDFE6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 40px;
          outline: 0;
          padding: 0 15px;
          -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
          height: 32px;
          line-height: 32px;
          &:focus{
            border-color: #409EFF;
          }
      }
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
      .el-button {float: right;}
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
  .choose-prop-dialog {
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
    }
    .el-dialog__body {
      padding: 20px;
      .choose-prop-list{
        overflow: hidden;
        li {
          float: left;
          width: 20%;
          cursor: pointer;
          line-height: 25px;
          padding-left: 20px;
          &:hover { background-color: #EBEEF5;color:#409EFF;}
        }
      }
    }
  }
}
</style>