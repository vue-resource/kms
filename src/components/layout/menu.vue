<script>
import { mapActions } from 'vuex';
export default {
    name: "silder",
    data() {
        return {
            nodelist:[],
            projectId: '',
            defaultProps: {
                children: "children",
                label: "nodeName"
            }
        };
    },
    watch: {
      '$route': {
        immediate: true,
        handler (nv) {
          this.projectId = nv.query.projectId;
          this.getNodeList();
        }
    },
    methods: {
        ...mapActions('common', ['updateNodeId']),
        //节点渲染
        getNodeList(){
          this.$ajax({
            url: '/node/getNodeList',
            method: 'get',
            params: {
              projectId: this.projectId
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

