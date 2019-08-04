<script>
export default {
    name: "issue-list",
    data() {     
        return {
           value:'',
           list:[],
           options: [{value: '1',label: '黄金糕'}, {value: '2',label: '双皮奶'}],
        };
    },
    // 生命周期
    created() {
      const id = this.$route.query.id;
      this.issueList(id)
      // this.closeIssue(id);
    },
    methods: {
      //问题列表
       issueList(id=0){
           this.$ajax({
              // url: '/issue/getIssueList',//问题管理
                url: 'issue/getIssueList.json',
                method: 'get',
                params: {
                  nodeId: id,
                  status: '1',
                  issueRank:"A",
                  leader:'张三',
                  createName:'问题创建人'
                }
              }).then(res => {           
                if(res.success){
                  let list = res.data.list;
                  console.log(this,list)
                  this.list = list;
                }
            })
        },
        //关闭问题
        closeIssue(id){
          this.$ajax({
              // url: '/issue/closeIssue',//问题管理
                url: '/issue/closeIssue.json',
                method: 'get',
                params: {
                  issueId:id
                }
              }).then(res => {                         
                if(res.success){             
                  console.log(this)
                }
            })
        },
       
    }
};
</script>
<template>
  <div class="weightwarp">
    <div class="wighthead">
      <div class="wightOne">
        <span>问题筛选 </span>
        <el-select v-model="value" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="wightTwo">
        <span>问题筛选 </span>
        <el-select v-model="value" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="wighthree">
        <span>发起人 </span>
        <el-select v-model="value" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="wightFour">
        <span>责任人 </span>
        <el-select v-model="value" placeholder="请选择" class="seleteder">
          <el-option
            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="wightTargetBox">
        <router-link to="/issue/add">
           <!-- 无页面  -->
          <el-button class="wightTarget" type="primary" >创建问题</el-button>  
        </router-link>          
      </div>
    </div>
    <el-table :data="list" height="300px" border  stripe>
       <el-table-column  prop="id" label="序号" width="50"></el-table-column>
      <el-table-column  prop="issueName" label="问题描述" width="200"></el-table-column>
      <el-table-column prop="issueCause" width="150" label="问题原因"></el-table-column>
      <el-table-column prop="issueRank" width="100" label="问题等级"></el-table-column>
      <el-table-column prop="leader" width="100" label="责任人"></el-table-column>
      <el-table-column prop="codename" label="相关功能">   
        <router-link to="incheck"> 
             <el-button class="wightTarget" type="plain" round>查看</el-button>  
        </router-link> 
         <router-link to="add"> 
           <el-button class="wightTarget" type="plain" round>编辑</el-button>  
         </router-link> 
          <router-link to="close"> 
            <el-button class="wightTarget" type="plain" round>关闭</el-button>  
          </router-link> 
      </el-table-column>
    </el-table> 
  </div>
</template>
<style lang="less">
.weightwarp{
  font-size: 14px;
  padding-top:10px;
}
.wighthead{
  display: flex;
  margin-bottom:20px;
  .wightTwo{
    padding:0 20px;
  }
  .wighthree{
     padding-right:20px;
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
