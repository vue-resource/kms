<script>
export default {
    name: "silder",
    data() {
        return {
            nodelist:[],
            defaultProps: {
                children: "children",
                label: "nodeName"
            }
        };
    },
    // 生命周期
    created() {
        const id = this.$route.query.id;
        console.log(id)
        if(id){
          this.getNodeList(id);          
        }
    },
    methods: {
        //节点渲染
        getNodeList(id=0){
          this.$ajax({
            url: '/node/getNodeList',
            method: 'get',
            params: {
              projectId: id
            }
          }).then(res => {
            if(res.success){
              console.log(res)
              this.nodelist = res.data.nodeDirectoryInfoList;
            }
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

