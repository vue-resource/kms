<script>
import { mapState, mapActions } from 'vuex';
import localStorage from '@/utils/tools/localstorage';
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
      $route:{
        immediate: true,
        handler (nv) {
          if(nv.query.projectId){
            this.projectId = nv.query.projectId;
            this.getNodeList();
          }
        }
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
          if(this.$route.path !== '/contract/list'){
            this.$router.push(`/contract/list?projectId=${localStorage.get('projectId')}`)
          }
        }
    }
};
</script>
<template>
  <div>
    <el-tree :data="nodelist" default-expand-all :props="defaultProps" @node-click="clickModel"></el-tree>   
  </div>
</template>

