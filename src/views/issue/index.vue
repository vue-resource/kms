<script>
export default {
    name: "issue-index",
    data () {
        const projectId = this.$route.query.projectId;
        return {
            activeName: '4',
            dataTab:[
              {name: '目标管理', value: '1', path: '/contract?projectId='+projectId},
              // {name: '分块BOM', value: '2', path: '/b', disabled: true},
              // {name: '成本分析', value: '3', path: '/a', disabled: true},
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
      <el-tabs v-model="activeName" @tab-click="handleTabClk" class="headlist">
           <el-tab-pane v-for="(tab, idx) in dataTab" :key="idx" :disabled="tab.disabled"
           :label="tab.name" :name="tab.value"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
  </div>
</template>
<style lang="less">
.contract {
    margin-right: 50px;
    margin: 0 auto;
    padding:20px;
    .headlist{
      height:40px;
    }
    .congoal {
        float: right;
        display: flex;
        font-size: 14px;
        .goaltipOne {
          padding-right:10px;
          border-bottom: 1px solid blue;
        }
        .line {
            height: 15px;
            width: 1px;
            background: #999;
            position: relative;
            top: 1px;
            margin: 0 5px;
        }
    }
    .chartBox {
        width: 642px;
        height: 220px;
        display: flex;
        background: #ccc;
        border-radius: 6px;
         position: relative;
        margin: 10px 10px 10px 0;
        .circle{
          margin-top:40px;
          margin-left:26px;
        }
        .cirleright{
          padding-top:25px;
          padding-left:25px;        
          .cirlehead{
            display: flex;
            .timeText{
              font-weight: 300;
              font-size:24px;
              padding-top:10px;
            }
            .timeright{
              padding-left:25px;
            }
          }
          .cirlefoot{
            .processOne{
               padding-top:10px;
               .processOneText{
                  display: flex;
                }
            }
            .add{
              padding-left:30px;
            }
            .processTwoText{
              display: flex;
            }
          }
          .goalTarget{
            position: absolute;
            right:20px;
            top:20px;
            background: blue;
            color: #fff;
            border-radius: 6px;
            padding:5px 20px;
            font-size:12px;
          }
        }
    }
    .confine {
        width: 450px;
        height: 220px;
        margin-top: 20px;
        display: inline-block;
        background-size: 100% 100%;
    }
}
</style>
