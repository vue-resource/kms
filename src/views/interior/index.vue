<script>
// import chartImg from '~@/assets/img/chart.jpeg';
// console.log(chartImg)
export default {
    name: 'login',
    props: {

    },
    data () {
        return {
          activeName2: 'first',
          activeName:'two',
          tabName:[],
          istab :'ALL',
           tableData: [{
              id:'1',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }, {
            id:'3',
            rage:'[min]',
            date: '2016-05-04',
            name: '0-100km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          }, {
            id:'4',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          },
          {
            id:'5',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          },
          {
            id:'6',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          },
          {
            id:'7',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          },
          {
            id:'8',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          },
           {
            id:'9',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          }, {
            id:'10',
             rage:'[min]',
            date: '2016-05-01',
            name: '0-120km/h加速时间，常温（20-30C）,SOC>=50%',
            address: '<35~45',
            codename:'B01.005'
          }],
           tableData1: [{
              id:'仪表盘1',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'仪表盘2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }],
            tableData2: [{
              id:'CCB',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'仪表盘2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }],
            tableData3: [{
              id:'手套箱1',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'仪表盘2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }], 
           tableData4: [{
              id:'出风口',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'仪表盘2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }],
           tableData5: [{
              id:'外覆盖件',
              date: '2016-05-03',
              rage:'[min]',
              name: '快充SOC(30%~80%)时间，常温',
              address: '<35~45',
              codename:'B01.005'
          }, {
            id:'仪表盘2',
            rage:'[s]',
            date: '2016-05-02',
            name: '滑行距离，初速120-0km/h',
            address: '<35~45',
            codename:'B01.005'
          }]
        }
      
    },
    computed: {

    },
    watch: {

    },
    // 生命周期
    created () {
     this.tabName = this.tableData
    },
    methods: {
       handleClick(tab, event) {
         let label = tab.label;
          let arrTxtObj = {
            'ALL': this.tableData,
            '仪表盘本体': this.tableData1,
            'CCB': this.tableData2,
            '手套箱': this.tableData3,
            '出风口': this.tableData4,
            '外覆盖件': this.tableData5
          }
          this.istab = label;
          this.tabName = arrTxtObj[label];
      },
      sorHand(tag){
        console.log(tag)
        alert(tag+"Event")
      },
     

    }
}
</script>
<template>
    <div class="interior">
       <div>
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="目标管理" name="first">目标管理</el-tab-pane>
            <el-tab-pane label="分块BOM" name="second">分块BOM</el-tab-pane>
            <el-tab-pane label="成本分析" name="third">成本分析</el-tab-pane>
            <el-tab-pane label="问题管理" name="fourth">问题管理</el-tab-pane>
          </el-tabs>
       </div>
       
        <div class="chartBox">
          <!-- <img src="chartImg" alt=""> -->
        </div>
        <div  class="right">
          <el-table
            :data="tableData1"
            height="280"
            v-if = "istab"
            border
           
            style="width: 610px;margin-top:20px">
            <el-table-column
              prop="id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="目标名称"
              width="350">
            </el-table-column>
            <el-table-column
              prop="rage"
              width="50"
              label="单位">
            </el-table-column>
             <el-table-column
              prop="address"
              width="100"
              label="目标值">
            </el-table-column>
             <el-table-column
              prop="codename"       
              label="需求编号">
            </el-table-column>
          </el-table>
        </div>
        
        <div class="intergoal">
          <el-button type="info" @click="sorHand('sor')">SOR</el-button>
           <el-button type="info" @click="sorHand('pro')">产品开发技术协议</el-button>
            <el-button type="info" @click="sorHand('dvr')">DVR</el-button>   
       </div>
       <div style="clear:both"></div>
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="ALL" name="first">ALL</el-tab-pane>
            <el-tab-pane label="仪表盘本体" name="second">仪表盘本体</el-tab-pane>
            <el-tab-pane label="CCB" name="third">CCB</el-tab-pane>
            <el-tab-pane label="手套箱" name="fourth">手套箱</el-tab-pane>
             <el-tab-pane label="出风口" name="five">出风口</el-tab-pane>
              <el-tab-pane label="外覆盖件" name="six">外覆盖件</el-tab-pane>
          </el-tabs>
         <el-table
            :data="tabName"
            height="350"
            v-if = "istab"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="目标名称"
              width="400">
            </el-table-column>
            <el-table-column
              prop="rage"
              width="50"
              label="单位">
            </el-table-column>
             <el-table-column
              prop="address"
              width="100"
              label="目标值">
            </el-table-column>
             <el-table-column
              prop="codename"            
              label="需求编号">
            </el-table-column>
          </el-table>
    </div>
</template>
<style lang="less">
  .interior{
    .intergoal{
       float: right;
       padding:15px;
       font-size: 14px;        
     }
     .chartBox{
        width:570px;
        height: 280px;
        float: left;
        background: url('~@/assets/img/car.jpeg') no-repeat;
        background-size:100% 100%; 
        margin-top: 20px;
      }
      .right{
        float: right;
      }
      .confine{
        width:450px;
        height: 220px;
         margin-top: 20px;
         display: inline-block;
        background: url('~@/assets/img/confine.jpeg') no-repeat;
        background-size:100% 100%; 
      }
  }
</style>
