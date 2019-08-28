<script>
export default {
    name: "login",
    data () {
        const projectId = this.$route.query.projectId;
        return {
            activeName: '1',
            dataTab:[
              {name: '目标管理', value: '1', path: '/contract?projectId='+projectId},
              {name: '分块BOM', value: '2', path: '/b', disabled: true},
              {name: '成本分析', value: '3', path: '/a', disabled: true},
              {name: '问题管理', value: '4', path: '/issue?projectId='+projectId},
            ]
        };
    },
    methods: {
      handleTabClk (tab) {
        const route = this.dataTab.find(item => item.value === tab.paneName);
        this.$router.push(route.path);
      }
    }
};
</script>
<template>
  <div class="contract">
      <el-tabs v-model="activeName" @tab-click="handleTabClk" class="tablist">
           <el-tab-pane v-for="(tab, idx) in dataTab" :key="idx" :disabled="tab.disabled"
           :label="tab.name" :name="tab.value"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
  </div>
</template>
<style lang="less">
.contract {
    margin: 0 auto;
    padding:0 20px;
    .tablist{
      height:40px;
      padding-top:20px;
    }
}
</style>
