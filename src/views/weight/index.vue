<script>
export default {
    name: "weight",
    props: {},
    data() {
        return {
            tableData: [{
              id:'1',
              date: '2016-05-03',
              rage:'角度没有定义',
              name: '无法确定',
              address: '中',
              codename:'马工'
          }, {
            id:'2',
            rage:'角度没有定义',
            date: '2016-05-02',
            name: '无法确定',
            address: '中',
            codename:'马工'
          },
           {
            id:'3',
            rage:'角度没有定义',
            date: '2016-05-02',
            name: '无法确定',
            address: '中',
            codename:'马工'
          }, {
            id:'4',
            rage:'角度没有定义',
            date: '2016-05-02',
            name: '无法确定',
            address: '中',
            codename:'马工'
          }], 
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        
    }
};
</script>
<template>
    <div class="weightwarp">
       <div>
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="目标管理" name="first">目标管理</el-tab-pane>
            <el-tab-pane label="分块BOM" name="second">分块BOM</el-tab-pane>
            <el-tab-pane label="成本分析" name="third">成本分析</el-tab-pane>
            <el-tab-pane label="问题管理" name="fourth">问题管理</el-tab-pane>
          </el-tabs>
       </div>
       <el-table
            :data="tableData"
            height="200px"     
            border        
           >
            <el-table-column
              prop="id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="问题描述"
              width="350">
            </el-table-column>
            <el-table-column
              prop="rage"
              width="150"
              label="问题原因">
            </el-table-column>
             <el-table-column
              prop="address"
              width="100"
              label="问题等级">
            </el-table-column>
             <el-table-column
              prop="codename"       
              label="责任人">
            </el-table-column>
             <el-table-column
              prop="codename"       
              label="相关功能">
            </el-table-column>
          </el-table>
    </div>
</template>
<style lang="less">

</style>
