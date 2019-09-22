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
        deep: true,
        handler (nv) {
          if(nv.query.projectId){
            this.projectId = nv.query.projectId;
            this.getNodeList();
          }
        }
      }
    },
    computed: {
      ...mapState('common', ['nodeId']),
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
              this.$nextTick(() => {
                const keys = [this.nodeId]
                this.$refs.tree.setCheckedKeys(keys);
              })
          })
        },
        clickModel (node) {
          this.updateNodeId(node);
          if(this.$route.path !== '/contract/list'){
            this.$router.push(`/contract/list?projectId=${localStorage.get('projectId')}`)
          }
        }
    }
};
</script>
<template>
  <div>
    <el-tree :data="nodelist" default-expand-all :props="defaultProps" ref="tree"
    node-key="id" highlight-current @node-click="clickModel"></el-tree>   
  </div>
</template>
<style lang="less">
.el-tree-node__label {
    font-size: 14px;
    display: block;
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
