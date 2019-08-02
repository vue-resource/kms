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
        this.getNodeList(id);
    },
    methods: {
        //节点渲染
        getNodeList(id){
          this.$ajax({
            // url: '/node/getNodeList',
            url: '/node/getNodeList.json',
            method: 'get',
            params: {
              projectId:id
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

