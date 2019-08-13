<script>
import { mapState} from 'vuex';
export default {
    name: "issue-action",
    data() {
      return {
        issueId: this.$route.query.id,
        projectId: this.$route.query.projectId,
        param: {},
        userlist:[],
        activeTab: '0',
        targetList:[],
        list:[],
        rules: {
          issueName: [ { required: true, message: '请输入问题描述', trigger: 'change' }],
          issueScope: [ { required: true, message: '请输入问题影响', trigger: 'change' }],
          issueCause: [ { required: true, message: '请输入问题原因', trigger: 'change' }],
          remedialAction: [ { required: true, message: '请输入纠正措施', trigger: 'change' }],
          leaderName: [ { required: true, message: '请选择问题负责人', trigger: 'change' }],
          issueRank: [ { required: true, message: '请选择问题级别', trigger: 'change' }],
          finishTime: [ { required: true, message: '请选择完成时间', trigger: 'change' }],
          targetName: [ { required: true, message: '请选择问题对应目标', trigger: 'change' }],
          adjunctList: [ { required: true,type:"array", message: '请上传附件', trigger: 'change' }]
        }
      }   
    },
    // 生命周期
    created() {
      this.getUserList();
      this.getTargetDirectoryInfoList();
     
      if(this.issueId){
        this.getDetail();
        
      }
    },
    computed: {
      ...mapState('common',['nodeId'])
    },
    watch: {
      nodeId (nv) {
      this.getTargetDirectoryInfoList();
      }
    },
    methods: {
       // 获取目标列表
      getTargetDirectoryInfoList () {
        this.$ajax({
          url: '/target/getTargetDirectoryInfoList',
          method: 'get',
          params: {
            nodeId: this.nodeId,
            projectId:this.projectId,
            queryType: this.activeTab
          }
        }).then(res => {
          if(res.success){
            this.targetList = res.data.targetList;
            this.targetList.map((item,key)=>{
              this.list.push({
                id:item.id,
                targetName:item.targetName
              })
            })
          }
        })
      },
        //问题详情
        getDetail(){
          this.$ajax({
            url: '/issue/getIssue',
            method: 'get',
            params: {
              issueId: this.issueId
            }
          }).then(res => {  
             if(res.success){  
              this.param = res.data;
             }
          })
        },
         getUserList(){
           this.$ajax({
            url: '/user/getUserList',
            method: 'get'
          }).then(res => {  
             if(res.success){  
              this.userlist = res.data;
             }
          })
        },
        createIssue () {
          const self = this;
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$ajax({
                url: '/issue/createIssue',
                method: 'post',
                data: self.param,
              }).then(res => {  
                 if(res.success){                       
                  this.$router.back();
                 }
              })
            }
          });
        },
        //POST /upload/uploadTargetFile
        uploadTargetFile(){
          this.$ajax({
                url: '/upload/uploadTargetFile',
                method: 'post',
              }).then(res => {  
                 if(res.success){                       
                  console.log(res)
                 }
              })
        },
        onSuccess (response, file, fileList) {
          console.log(response, file, fileList)
        }
    }
};
</script>
<template>
  <div class="issue-destail">
    <el-card>
      <h2 slot="header">问题详情</h2>
      <div class="addMain">
        <el-form label-width="100px" ref="form" :rules="rules" :model="param">
          <el-form-item label="问题描述:" prop="issueName">
            <el-input v-model="param.issueName"></el-input>
          </el-form-item>
          <el-form-item label="问题影响:" prop="issueScope">
            <el-input v-model="param.issueScope"></el-input>
          </el-form-item>
          <el-form-item label="问题原因:" prop="issueCause">
            <el-input v-model="param.issueCause"></el-input>
          </el-form-item>
          <el-form-item label="纠正措施:" prop="remedialAction">
            <el-input v-model="param.remedialAction" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="问题负责人:" prop="leaderName">
            <el-select v-model="param.leaderName" placeholder="请选择" >
              <el-option
                v-for="item in userlist" :key="item.id" :label="item.username" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题级别:" prop="issueRankId">
            <el-select v-model="param.issueRank" placeholder="请选择">
              <el-option label="高" :value="0"></el-option>
              <el-option label="中" :value="1"></el-option>
              <el-option label="低" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间:" prop="finishTime">
            <el-date-picker v-model="param.finishTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="对应目标:" prop="nodeId">
             <el-select v-model="param.nodeId" placeholder="请选择" >
              <el-option
                v-for="item in list" :key="item.id" :label="item.targetName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关附件:" >
            <ul>
              <li v-for="(item,idx) in param.adjunctList" :key="idx">{{ item.fileName }}</li>
            </ul>
            <el-upload class="upload-demo" :on-success="onSuccess"
              action="http://39.100.134.212:8081/rms/api/upload/uploadTargetFile">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label=" " >
            <el-button type="primary" @click="createIssue">提交</el-button> 
            <el-button @click="$router.back()">返回</el-button> 
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<style lang="less">
.issue-destail {
  padding: 20px;
}
</style>
