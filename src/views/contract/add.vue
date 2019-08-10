<script>
export default {
    name: "add-target",
    data() {
        return {
            list:[],
            nodelist:[],
            projectId: this.$route.query.id,
            targetmodeProps: {
                children: "children",
                label: "targetModelName"
            },
            nodeProps: {
                children: "children",
                label: "nodeName"
            },
            param: {
              projectId: this.$route.query.id,
              target_model_id: '',
              nodeId: ''
            }
        };
    },
    // 生命周期
    created() {
        this.getTargetList()
        this.getNodeList()
    },
    methods: {
        //节点渲染 getTargetmodelList
       getTargetList(){
            this.$ajax({
                url: '/target/getTargetmodelList',
                method: 'get',
                params: {
                  categoryId: this.projectId
                }
            }).then(res => {
                 this.list = res.data;
            })
       },
       //右侧节点tree 
       getNodeList(){
            this.$ajax({
                url: '/node/getNodeList',
                method: 'get',
                params: {
                  categoryId: this.projectId
                }
            }).then(res => {
                // if(res.success){
                
                 this.nodelist = res.data;
               
            })
       },
       clickModel (node) {
         console.log(node)
         //this.param.target_model_id = node.nodeId; by duyin 2019-8-8
         this.param.target_model_id = node.id;
       },
       handleNodeChange (node) {
         console.log(node)
         //this.param.nodeId = node.nodeNumber; by duyin 2019-8-8
         this.param.nodeId = node.id;
       },
       creatSubmit () {
         console.log(this.param.target_model_id , this.param.id)
         if(this.param.target_model_id && this.param.nodeId){
           this.$ajax({
                url: '/target/createTarget',
                method: 'post',
                data: this.param
            }).then(res => {
                // if(res.success){
                  this.$router.back();
                // }
            })
         }
       }
    }
};
</script>
<template>
  <div class="concactAdd">
    <div class="left">
      <el-tree :data="list" default-expand-all :props="targetmodeProps" class="treeOne"
        @node-click="clickModel">
      </el-tree>
    </div>
    <div class="right">
       <el-tree :data="nodelist" default-expand-all :props="nodeProps" class="treeTwo"
        @node-click="handleNodeChange">
        </el-tree>
    </div>
    <div class="submitBtn">
      <div class="btn">
       <el-button  class="goalTarget" @click="creatSubmit" type="primary">提交</el-button>         
      </div>
      <div class="cencel">
        <el-button  class="goalTarget" @click="$router.back()" plain>取消</el-button>         
      </div>
    </div>
  </div>
</template>
<style lang="less">
.contract{
  padding:20px;
}
.concactAdd{
  display: flex;
  margin-top:50px;
  .left{
   width:200px;
   height: 380px; 
   .treeOne{
      background: #F4F4F4;
       height: 380px;
       overflow: auto;
   }
  }
  .right{
    width:200px;
    margin-left:40px;
    .treeTwo{
       background: #F4F4F4;
       height: 380px;
       overflow: auto;
   }
  }
  
  .submitBtn{
    margin-left:30px;
    .btn{
      width:200px;
      display: block;
      padding-bottom:20px;
    }
    .goalTarget{
      width:150px;
    }
    .cencel{
      width:200px;
       display: block;
    }
  }
}
 
</style>
