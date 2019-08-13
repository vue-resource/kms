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
    mounted () {
      setTimeout(() => {
          this.projectId = this.$route.query.projectId;
          if(this.projectId){
            this.getNodeList();
          }
      }, 300)
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

