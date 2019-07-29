<script>
// import chartImg from '~@/assets/img/chart.jpeg';
// console.log(chartImg)
export default {
    name: "login",
    props: {},
    data() {
        return {
            activeName: "first",
            dataTab:[],
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
            let name = tab.name;
            console.log("name",name)
            let obj = {
              first:[],
              second:[],
              third:[],
              fourth:[]
            }
            this.dataTab = obj[name];//后台数据接口数据
          console.log(this.dataTab)
        },
        creathand(){
          console.log("3223")
        }
    }
};
</script>
<template>
  <div class="contract">
    <div>
     
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="目标管理" name="first"></el-tab-pane>
    <el-tab-pane label="分块BOM" name="second"></el-tab-pane>
    <el-tab-pane label="成本分析" name="third"></el-tab-pane>
    <el-tab-pane label="问题管理" name="fourth"></el-tab-pane>
  </el-tabs>
    </div>
    <div class="congoal">
      <div class="goaltipOne">发出的目标</div>
      <!-- <div class="line"></div> -->
      <div class="goaltipTwo">收到的目标</div>
    </div>
    <div class="chartBox">
      <!-- <img src="chartImg" alt=""> -->
      <el-progress type="circle" :percentage="68" class="circle"></el-progress>
      <div class="cirleright">
        <div class="cirlehead">
           <div class="timeLeft">
              <p>项目工期</p>
              <p class="timeText">460天</p>
           </div>
           <div class="timeright">
              <p>消耗</p>
              <p class="timeText">460天</p>
           </div>
        </div>
        <div class="cirlefoot">
          <div class="processOne">
            <div class="processOneText">
              <p>总R：460</p>
              <p class="add">昨日新增：6556</p>
            </div>
            <el-progress :percentage="30"  style="width:400px"></el-progress>
          </div>
          <div class="processTwo">
             <div class="processTwoText">
                <p>总S：5060</p>
                <p class="add">昨日新增：12</p>
             </div>
            <el-progress :percentage="60" style="width:400px"></el-progress>
          </div>
        </div>
        <div class="goalTarget" @click="creathand">创建目标</div>
      </div>
    </div>
    <div class="confine1">

    </div>
    <el-table
      :data="tableData3"
      height="350"
      border
      style="width: 1200px"
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
        // background: url("~@/assets/img/chart.jpeg") no-repeat;
        // background-size: 100% 100%;
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
            .timeLeft{
             
            }
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
        background: url("~@/assets/img/confine.jpeg") no-repeat;
        background-size: 100% 100%;
    }
}
</style>
