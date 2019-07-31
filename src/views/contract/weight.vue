<script>
export default {
    name: "weight",
    props: {},
    data() {
        return {
          issue:'',
          value1:'',
          issuePeople:'',
          Barvalue:'',
          options: [{value: '选项1',label: '黄金糕'}, {value: '选项2',label: '双皮奶'}],
          options1: [{value: '选项1',label: '黄金糕'}, {value: '选项2',label: '双皮奶'}],
          options2: [{value: '选项1',label: '黄金糕'}, {value: '选项2',label: '双皮奶'}],
          options3: [{value: '选项1',label: '黄金糕'}, {value: '选项2',label: '双皮奶'}],
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
    methods: {
      creathandle(){
        console.log("创建消息")
      }
    }
};
</script>
<template>
  <div class="weightwarp">
    <div class="wighthead">
      <div class="wightOne">
        <span>问题筛选 </span>
        <el-select
          v-model="issue"
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
          v-model="value1"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options1"
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
          v-model="issuePeople"
          placeholder="请选择"
           class="seleteder"
        >
          <el-option
            v-for="item in options2"
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
          v-model="Barvalue"
          placeholder="请选择"
          class="seleteder"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="wightTargetBox">
      <el-button size="mini" class="wightTarget" @click="creathandle" type="primary">创建目标</el-button>        
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
