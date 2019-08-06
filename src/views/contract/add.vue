<script>
export default {
    name: "add-target",
    data() {
        return {
            list:[],
            nodelist:[],
            targetmodeProps: {
                children: "children",
                label: "targetName"
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
        const id = this.$route.query.id;
        this.getTargetList(id)
        this.getNodeList(id)
    },
    methods: {
        //节点渲染 getTargetmodelList
       getTargetList(id){
            this.$ajax({
                url: '/target/getTargetmodelList',
                // url: '/target/getTargetmodelList.json',
                method: 'post',
                data: {
                categoryId:id
                }
            }).then(res => {
                if(res.success){
                 this.list = res.data.List;
                }
            })
       },
       //右侧节点tree 
       getNodeList(id){
            this.$ajax({
                url: '/node/getNodeList',
                // url: '/node/getNodeList.json',
                method: 'post',
                data: {
                 categoryId:id
                }
            }).then(res => {
                if(res.success){
                 console.log(res)
                 this.nodelist = res.data.nodeDirectoryInfoList;
                }
            })
       },
       clickModel (node) {
         this.param.target_model_id = node.nodeId;
       },
       handleNodeChange (node) {
         this.param.nodeId = node.nodeNumber;
       },
       creatSubmit () {
         if(this.param.target_model_id && this.param.nodeId){
           this.$ajax({
                url: '/target/createTarget',
                // url: '/target/createTarget.json',
                method: 'post',
                data: this.param
            }).then(res => {
                if(res.success){
                  this.$router.back();
                }
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
