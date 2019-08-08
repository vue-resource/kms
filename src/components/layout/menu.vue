<script>
export default {
    name: "silder",
    data() {
        return {
            nodelist:[],
            id:this.$route.query.id,
            defaultProps: {
                children: "children",
                label: "nodeName"
            }
        };
    },
    // 生命周期
    created() {
        // const id = this.$route.query.id;
        // console.log(id)        
        this.getNodeList();          
    },
    methods: {
        //节点渲染
        getNodeList(id=0){
          this.$ajax({
            url: '/node/getNodeList',
            method: 'get',
            params: {
              projectId: this.id
            }
          }).then(res => {
              this.nodelist = res.data;
          })
        }
    }
};
</script>
<template>
  <div>
    <el-tree :data="nodelist" default-expand-all :props="defaultProps"></el-tree>   
  </div>

</template>

