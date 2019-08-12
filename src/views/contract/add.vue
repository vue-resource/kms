<script>
export default {
    name: "add-target",
    data() {
        const self = this;
        return {
            categoryList:[],
            tmplList:[],
            nodelist:[],
            projectId: this.$route.query.projectId,
            targetCategoryProps: {
                children: "children",
                label: "categoryName"
            },
            targetmodeProps: {
                children: "children",
                label: "targetModelName"
            },
            nodeProps: {
                children: "children",
                label: "nodeName"
            },
            param: {
              target_model_id: '',
              nodeId: ''
            }
        };
    },
    // 生命周期
    created() {
        this.getCategoryList()
        this.getNodeList()
    },
    methods: {
        // 获取目标类目
        getCategoryList(){
            this.$ajax({
                url: 'node/getModelCategoryList',
                method: 'get'
            }).then(res => {
              if(res.success){
                this.categoryList = res.data;
              }
            })
        },
        // 获取目标模板
        getTargetList(id){
            this.$ajax({
                url: '/target/getTargetmodelList',
                method: 'get',
                params: {
                  categoryId: id
                }
            }).then(res => {
              if(res.success){
                this.tmplList = res.data;
              }
            })
        },
        // 获取目标节点
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
        clickCategory (node) {
            this.getTargetList(node.id);
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
                    data:{
                        ...this.param,
                        projectId: this.projectId
                    }
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
    <el-tree :data="categoryList" default-expand-all highlight-current :props="targetCategoryProps"
      @node-click="clickCategory">
    </el-tree>
    <el-tree :data="tmplList" default-expand-all highlight-current :props="targetmodeProps"
      @node-click="clickModel">
    </el-tree>
    <el-tree :data="nodelist" default-expand-all highlight-current show-checkbox :props="nodeProps"
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
