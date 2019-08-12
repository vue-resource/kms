<script>
import { mapActions } from 'vuex';
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
        this.getNodeList();          
    },
    methods: {
        ...mapActions('common', ['updateNodeId']),
        //节点渲染
        getNodeList(id){
          this.$ajax({
            url: '/node/getNodeList',
            method: 'get',
            params: {
              projectId: this.id
            }
          }).then(res => {
              this.nodelist = res.data;
          })
        },
        clickModel (node) {
          this.updateNodeId(node.id);
        }
    }
};
</script>
<template>
  <div>
    <el-tree :data="nodelist" default-expand-all :props="defaultProps" @node-click="clickModel"></el-tree>   
  </div>
</template>

