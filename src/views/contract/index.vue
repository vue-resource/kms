<script>
// import chartImg from '~@/assets/img/chart.jpeg';
// console.log(chartImg)
export default {
    name: "login",
    props: {},
    data() {
        return {
            activeName2: "first",
            tableData3: [
                {
                    id: "1",
                    date: "2016-05-03",
                    rage: "[min]",
                    name: "快充SOC(30%~80%)时间，常温",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "2",
                    rage: "[s]",
                    date: "2016-05-02",
                    name: "滑行距离，初速120-0km/h",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "3",
                    rage: "[min]",
                    date: "2016-05-04",
                    name: "0-100km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "4",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "5",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "6",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "7",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "8",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "9",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                },
                {
                    id: "10",
                    rage: "[min]",
                    date: "2016-05-01",
                    name: "0-120km/h加速时间，常温（20-30C）,SOC>=50%",
                    address: "<35~45",
                    codename: "B01.005"
                }
            ]
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<template>
  <div class="contract">
    <div>
      <el-tabs
        v-model="activeName2"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="目标管理"
          name="first"
        >目标管理</el-tab-pane>
        <el-tab-pane
          label="分块BOM"
          name="second"
        >分块BOM</el-tab-pane>
        <el-tab-pane
          label="成本分析"
          name="third"
        >成本分析</el-tab-pane>
        <el-tab-pane
          label="问题管理"
          name="fourth"
        >问题管理</el-tab-pane>
      </el-tabs>
    </div>
    <div class="congoal">
      <div class="goaltipOne">发出的目标</div>
      <div class="line"></div>
      <div class="goaltipTwo">收到的目标</div>
    </div>
    <div class="chartBox">
      <!-- <img src="chartImg" alt=""> -->
    </div>
    <div class="confine">

    </div>
    <el-table
      :data="tableData3"
      height="350"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="目标名称"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="rage"
        width="50"
        label="单位"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        width="100"
        label="目标值"
      >
      </el-table-column>
      <el-table-column
        prop="codename"
        label="需求编号"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="less">
.contract {
    margin-right: 50px;
    margin: 0 auto;
    .congoal {
        float: right;
        display: flex;
        font-size: 14px;

        border-bottom: 1px solid #ddd;
        .goaltipOne {
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
        width: 530px;
        height: 220px;
        display: inline-block;
        background: url("~@/assets/img/chart.jpeg") no-repeat;
        background-size: 100% 100%;
        margin-top: 20px;
    }
    .confine {
        width: 450px;
        height: 220px;
        margin-top: 20px;
        display: inline-block;
        background: url("~@/assets/img/confine.jpeg") no-repeat;
        background-size: 100% 100%;
    }
}
</style>
