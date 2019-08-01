<script>
export default {
    name: "weight",
    props: {},
    data() {
       
        return {
           value:'',
           list:[],
          options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            tableData: [
                {
                    id: "1",
                    date: "2016-05-03",
                    rage: "角度没有定义",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "2",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "3",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "4",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                }
            ]
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {
      this.initDom()
      this.closeIssue();
      // this.createIssue();
    },
    methods: {
       initDom(){
           this.$ajax({
              // url: '/getIssueList',//问题管理
                url: '/getIssueList.json',
                method: 'get',
                params: {
                  nodeId: '12',
                  status: '1',
                  issueRank:"A",
                  leader:'张三',
                  createName:'问题创建人'
                }
              }).then(res => {           
                if(res.success){
                  let list = res.data.list;
                  console.log(this)
                  this.list = list;
                  // this.updateUsername('');
                  // this.$router.push('/login');
                }
            })
        },
        closeIssue(){
          this.$ajax({
              // url: '/closeIssue',//问题管理
                url: '/closeIssue.json',
                method: 'get',
                params: {
                  issueId:"1"
                }
              }).then(res => {                         
                if(res.success){             
                  console.log(this)
                  // this.list = list;
                  // this.updateUsername('');
                  // this.$router.push('/login');
                }
            })
        },
        createIssue(){
          let param = {
                  nodeId:"1",
                "nodeId":"8",
                "targetId":"8",
                "issueName":"外覆盖件",
                "issueScope":"内部",
                "issueCause":"注塑，卡接",
                "solution":"无",
                "remedialAction":"",
                "fileName":"张三",
                "leader":"李总",
                "status":"1",
                "issueRank":"中",
                "finishTime":"2019/7/29",
                "createTime":"2019/7/28"
                }
           this.$ajax({
              // url: '/createIssue',//创建问题
                url: '/createIssue.json',
                method: 'get',
                params: param
              }).then(res => {                         
                if(res.success){             
                  console.log(this)
                  // this.list = list;
                  // this.updateUsername('');
                  // this.$router.push('/login');
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
        <span>问题筛选 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
          class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightTwo">
        <span>问题筛选 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wighthree">
        <span>发起人 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightFour">
        <span>责任人 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightTargetBox">
        <router-link to="/issue/add">
          <el-button class="wightTarget" type="primary" @click="createIssue">创建问题</el-button>  
        </router-link>
            
      </div>
    </div>
    <el-table
      :data="list"
      height="300px"
      border
    >
      <el-table-column
        prop="id"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="issueName"
        label="问题描述"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="issueCause"
        width="150"
        label="问题原因"
      >
      </el-table-column>
      <el-table-column
        prop="issueRank"
        width="100"
        label="问题等级"
      >
      </el-table-column>
      <el-table-column
        prop="leader"
         width="100"
        label="责任人"
      >
      </el-table-column>
      <el-table-column
        prop="codename"
        label="相关功能"
      >
      <el-button class="wightTarget" type="plain" round>查看</el-button>  
      <el-button class="wightTarget" type="plain" round>编辑</el-button>  
      <el-button class="wightTarget" type="plain" round>关闭</el-button>  
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="less">
.weightwarp{
  font-size: 14px;
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
