<script>
export default {
    name: "weight",
    props: {},
    data() {
       
        return {
           value:'',
          options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            tableData: [
                {
                    id: "1",
                    date: "2016-05-03",
                    rage: "角度没有定义",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "2",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "3",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                },
                {
                    id: "4",
                    rage: "角度没有定义",
                    date: "2016-05-02",
                    name: "无法确定",
                    address: "中",
                    codename: "马工"
                }
            ]
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {}
};
</script>
<template>
  <div class="weightwarp">
    <div>
      <!-- <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="目标管理" name="first">目标管理</el-tab-pane>
            <el-tab-pane label="分块BOM" name="second">分块BOM</el-tab-pane>
            <el-tab-pane label="成本分析" name="third">成本分析</el-tab-pane>
            <el-tab-pane label="问题管理" name="fourth">问题管理</el-tab-pane>
          </el-tabs> -->
    </div>
    <div class="wighthead">
      <div class="wightOne">
        <span>问题筛选 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
          class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightTwo">
        <span>问题筛选 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wighthree">
        <span>发起人 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightFour">
        <span>责任人 </span>
        <el-select
          v-model="value"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightTargetBox">
      <el-button size="mini" class="wightTarget" @click="creathand" type="primary">创建目标</el-button>        
      </div>
    </div>
    <el-table
      :data="tableData"
      height="200px"
      border
    >
      <el-table-column
        prop="id"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="问题描述"
        width="350"
      >
      </el-table-column>
      <el-table-column
        prop="rage"
        width="150"
        label="问题原因"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        width="100"
        label="问题等级"
      >
      </el-table-column>
      <el-table-column
        prop="codename"
        label="责任人"
      >
      </el-table-column>
      <el-table-column
        prop="codename"
        label="相关功能"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="less">
.weightwarp{
  font-size: 14px;
}
.wighthead{
  display: flex;
  margin-bottom:20px;
  .wightTwo{
    padding:0 20px;
  }
  .wighthree{
     padding-right:20px;
  }
  .seleteder{
    width:100px;
  }
  .wightTargetBox{
     flex:1;
     .wightTarget{
      float: right; 
    }
  }
  
}
</style>
