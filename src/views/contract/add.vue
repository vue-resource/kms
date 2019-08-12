<script>
export default {
    name: "add-target",
    data() {
        return {
            list:[],
            nodelist:[],
            projectId: this.$route.query.projectId,
            targetmodeProps: {
                children: "children",
                label: "categoryName"
            },
            nodeProps: {
                children: "children",
                label: "nodeName"
            },
            param: {
              projectId: this.projectId,
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
        //节点渲染 目标模板
       getTargetList(){
            this.$ajax({
                url: '/target/getTargetmodelList',
                method: 'get',
                params: {
                  categoryId: this.projectId
                }
            }).then(res => {
              if(res.success){
                this.list = res.data;
              }
            })
       },
       //目标节点 
       getNodeList(){
            this.$ajax({
                url: '/node/getNodeList',
                method: 'get',
                params: {
                  projectId: this.projectId
                }
            }).then(res => {
                if(res.success){
                  this.nodelist = res.data;
                }
            })
       },
       clickModel (node) {
         this.param.target_model_id = node.id;
       },
       creatSubmit () {
         this.param.nodeId = this.$refs['node-tree'].getCheckedNodes(true).map(item => item.id);
         if(this.param.target_model_id && this.param.nodeId.length > 0){
           this.$ajax({
                url: '/target/createTarget',
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
    <el-tree :data="list" default-expand-all highlight-current :props="targetmodeProps" class="treeOne"
      @node-click="clickModel">
    </el-tree>
    <el-tree :data="nodelist" default-expand-all highlight-current show-checkbox :props="nodeProps" class="treeTwo"
      ref="node-tree">
    </el-tree>
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
  .el-tree {
    width:200px;
    border: 1px solid #ccc;
    overflow: auto;
    min-height: 200px;
    max-height: 800px;
    margin-left: 20px;
    &:first {margin-left: 0;}
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
