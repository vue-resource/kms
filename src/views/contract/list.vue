<script>
export default {
    name: "login",
    props: {},
    data() {
        return {
          activeName: '1',
          dataTab:[
            {name: '发出的目标', value: '1'},
            {name: '收到的目标', value: '2'},
            
          ],
          tableData: [
              {
                  id: '1',
                  name: '王小虎',
                  province: '上海',
                  person: '王小虎',
                  from: '上海'
              }, {
                  id: '2',
                  name: '葛二蛋',
                  province: '北京',
                  person: '葛二蛋',
                  from: '北京'
              },{
                  id: '3',
                  name: '薛仁贵',
                  province: '南京',
                  person: '薛仁贵',
                  from: '南京'
              }, {
                  id: '4',
                  name: '秦琼',
                  province: '郑州',
                  person: '秦琼',
                  from: '郑州'
              },{
                  id: '5',
                  name: '关羽',
                  province: '荆州',
                  person: '关羽',
                  from: '荆州'
              },{
                  id: '6',
                  name: '刘备',
                  province: '西蜀',
                  person: '刘备',
                  from: '西蜀'
              }, {
                  id: '7',
                  name: '张飞',
                  province: '南蛮子',
                  person: '张飞',
                  from: '南蛮子'
              },{
                  id: '8',
                  name: '秦始皇',
                  province: '西安',
                  person: '秦始皇',
                  from: '西安'
              },{
                  id: '9',
                  name: '老子',
                  province: '周口',
                  person: '老子',
                  from: '周口'
              }
          ]
        };
    },
    computed: {
        heads () {
            return this.tableData.map(item => {
                return {
                    name: item.province,
                    person: item.person,
                    position: '负责人'
                }
            });
        },
        
    },
    watch: {},
    // 生命周期
    created() {
      this.getTarget();
    },
    methods: {
        renderTd (column, item) {
            return column.from === item.name ? '☑️' : ''
        },
        creathand(){
          this.$router.push('/contract/add');
        },
        getTarget(){
          this.$ajax({
            // url: 'target/getTargetDirectoryInfoList',
            url: '/contract/getTargetDirectoryInfoList.json',
            method: 'get',
            params: {
              nodeId:"1",
              queryType:0
            }
          }).then(res => {
            if(res.success){
              console.log(res)
              this.info = res.data;
            }
          })
        }
    }
};
</script>
<template>
  <div class="contract">
    <div class="congoal">
      <el-tabs v-model="activeName">
           <el-tab-pane v-for="(tab, idx) in dataTab" :key="idx"
           :label="tab.name" :name="tab.value"></el-tab-pane>
      </el-tabs>
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
         <el-button size="mini" class="goalTargetTex" @click="creathand" type="primary">创建目标</el-button>
        <!-- <div >创建目标</div> -->
      </div>
    </div>
    <div class="contraceTab">
      <el-table :data="tableData" max-height="300" border>
          <el-table-column label="序号" prop="id" width="50" fixed></el-table-column>
          <el-table-column label="目标名称" prop="name" width="80" fixed></el-table-column>
          <el-table-column label="目标分类" prop="name" width="80" fixed></el-table-column>
          <el-table-column label="单位" prop="name" width="50" fixed></el-table-column>
          <el-table-column label="目标值" prop="name" width="100" fixed></el-table-column>
          <el-table-column label="需求编号" prop="name" width="80" fixed></el-table-column>
          <el-table-column label="能量管理" prop="name" width="80" fixed></el-table-column>       
          <el-table-column v-for="(col, idx) in heads" :key="idx" align="center">
              <template slot="header">
                  <ul class="mul-thead">
                      <li>{{ col.name }}</li>
                  </ul>
              </template>
              <template slot-scope="scope">
                <router-link v-if="renderTd(scope.row, col)" to='/contract/edit'>
                  {{ renderTd(scope.row, col) }}
                </router-link>
              </template>
          </el-table-column>
      </el-table>
    </div>
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
    .contraceTab{
      width:1100px;
    }
    .chartBox {
        width: 642px;
        height: 220px;
        clear:both;
        display: flex;
         background: #ccc;
        // background:rgba(0, 0, 0, 0.065);
        border-radius: 6px;
         position: relative;
        margin: 0px 10px 10px 0;
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
            color:#666 ;
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
          .goalTargetTex{
            position: absolute;
            right:20px;
            top:20px;
    
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
