<script>
export default {
    name: "project",
    props: {},
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
            }

        };
    },
    computed: {},
    watch: {},
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
                // url: 'target/getTargetmodelList',
                url: '/target/getTargetmodelList.json',
                method: 'get',
                params: {
                categoryId:id
                }
            }).then(res => {
                if(res.success){
                 console.log(res)
                 this.list = res.data.List;
                }
            })
       },
       //右侧节点tree 
       getNodeList(id){
            this.$ajax({
                // url: 'target/getNodeList',
                url: '/target/getNodeList.json',
                method: 'get',
                params: {
                 categoryId:id
                }
            }).then(res => {
                if(res.success){
                 console.log(res)
                 this.nodelist = res.data.nodeDirectoryInfoList;
                }
            })
       },







       creatSubmit(){
           console.log("提交信息")
       },
       handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleNodeClick(data) {
            console.log(data);
        }

    }
};
</script>
<template>
  <div class="concactAdd">
    <div class="left">
      <el-tree :data="list" default-expand-all :props="targetmodeProps" class="treeOne">
      </el-tree>
    </div>
    <div class="right">
       <el-tree :data="nodelist" default-expand-all :props="nodeProps" class="treeTwo">
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
.concactAdd{
  display: flex;
  .left{
   width:400px;
   height: 550px; 
   .treeOne{
      background: #ccc;
       height: 550px;
       overflow: auto;
   }
  }
  .right{
    width:400px;
    margin-left:40px;
    .treeTwo{
       background: #ccc;
       height: 550px;
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
