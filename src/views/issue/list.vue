<script>
import { mapState} from 'vuex';
export default {
    name: "issue-list",
    data() {
        return {
          projectId: this.$route.query.projectId,
          param: {
            status: '',
            issueRank: '',
            leader: '',
            createName: ''
          },
          list:[],
          userlist: [],
        };
    },
    // 生命周期
    created() {
      this.issueList()
      this.getUserList();
    },
    computed: {
      ...mapState('common',['nodeId'])
    },
    watch: {
      nodeId (nv) {
       this.issueList();
      }
    },
    methods: {
      //问题列表
       issueList(){
          const self = this;
          this.$ajax({
              url: '/issue/getIssueList',
              method: 'get',
              params: {
                nodeId: self.nodeId, 
                projectId:self.projectId,
                ...self.param
              }
            }).then(res => {  
               if(res.success){         
                this.list = res.data;
               }
          })
        },
        getUserList(){
           this.$ajax({
            url: '/user/getUserList',
            method: 'get'
          }).then(res => {    
             if(res.success){
              this.userlist = [{username:'全部', id: '', userId: ''}].concat(res.data);
             } 
          })
        },
        issueReset(){
          console.log("888")
        },
        //关闭问题
        closeIssue(id){
          this.$ajax({
              url: '/issue/closeIssue',
              method: 'get',
              params: {
                issueId:id 
              }
            }).then(res => {                         
              if(res.success){             
                this.issueList();
              }
          })
        }
    }
};
</script>
<template>
  <div class="weightwarp">
    <div class="wighthead">
      <div class="wightOne">
        <span>问题级别 </span>
        <el-select v-model="param.issueRank" placeholder="请选择" class="seleteder">
          <el-option label="全部" value=""></el-option>
          <el-option label="高" value="0"></el-option>
          <el-option label="中" value="1"></el-option>
          <el-option label="低" value="2"></el-option>
        </el-select>
      </div>
      <div class="wightTwo">
        <span>问题状态 </span>
        <el-select v-model="param.status" placeholder="请选择" class="seleteder">
          <el-option label="全部" value=""></el-option>
          <el-option label="关闭" value="0"></el-option>
          <el-option label="进行中" value="1"></el-option>
        </el-select>
      </div>
      <div class="wighthree">
        <span>发起人 </span>
        <el-select v-model="param.createName" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in userlist" :key="item.id" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="wightFour">
        <span>责任人 </span>
        <el-select v-model="param.leader" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in userlist" :key="item.id" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="issueList" >搜索</el-button>  
      <el-button type="primary" @click="issueReset" >重置</el-button>  
      <div class="wightTargetBox">
        <router-link :to="`/issue/action?projectId=${this.projectId}`">
          <el-button class="wightTarget" type="primary" >创建问题</el-button>  
        </router-link>          
      </div>
    </div>
    <el-table :data="list" border stripe>
      <el-table-column prop="id" label="序号" width="50"></el-table-column>
      <el-table-column prop="issueName" label="问题描述" width="200"></el-table-column>
      <el-table-column prop="issueCause" width="200" label="问题原因"></el-table-column>
      <el-table-column prop="issueRankName" width="100" label="问题等级"></el-table-column>
      <el-table-column prop="leaderName" width="100" label="责任人"></el-table-column>
      <el-table-column label="相关功能">
        <template slot-scope="scope">
          <router-link :to="`/issue/detail?id=${scope.row.id}`"> 
            <el-button class="wightTarget" type="plain" round>查看</el-button>  
          </router-link> 
          <router-link :to="`/issue/action?projectId=${projectId}&id=${scope.row.id}`"> 
            <el-button class="wightTarget" type="plain" round>编辑</el-button>  
          </router-link> 
          <el-button class="wightTarget" type="plain" round @click="closeIssue(scope.row.id)">关闭</el-button>  
        </template>
      </el-table-column>
    </el-table> 
  </div>
</template>
<style lang="less">
.weightwarp{
  font-size: 14px;
  padding-top:25px;
}
.wighthead{
  display: flex;
  margin-bottom:20px;
 color: #7a7a7a;
  .wightTwo{
    padding:0 20px;
  }
  .wighthree{
     padding-right:20px;
  }
  .wightFour{
    margin-right:10px;
  }
  .seleteder{
    width:100px;
  }
  .wightTargetBox{
     flex:1;
     .wightTarget{
      float: right; 
    }
  }
  
}
</style>
