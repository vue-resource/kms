<script>
export default {
    name: "login",
    props: {},
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    person: '王小虎',
                    from: '上海'
                }, {
                    date: '2016-05-02',
                    name: '葛二蛋',
                    province: '北京',
                    person: '葛二蛋',
                    from: '北京'
                },{
                    date: '2016-05-03',
                    name: '薛仁贵',
                    province: '南京',
                    person: '薛仁贵',
                    from: '南京'
                }, {
                    date: '2016-05-02',
                    name: '秦琼',
                    province: '郑州',
                    person: '秦琼',
                    from: '郑州'
                },{
                    date: '2016-05-02',
                    name: '关羽',
                    province: '荆州',
                    person: '关羽',
                    from: '荆州'
                },{
                    date: '2016-05-03',
                    name: '刘备',
                    province: '西蜀',
                    person: '刘备',
                    from: '西蜀'
                }, {
                    date: '2016-05-02',
                    name: '张飞',
                    province: '南蛮子',
                    person: '张飞',
                    from: '南蛮子'
                },{
                    date: '2016-05-02',
                    name: '秦始皇',
                    province: '西安',
                    person: '秦始皇',
                    from: '西安'
                },{
                    date: '2016-05-03',
                    name: '老子',
                    province: '周口',
                    person: '老子',
                    from: '周口'
                }, {
                    date: '2016-05-02',
                    name: '曹操',
                    province: '许昌',
                    person: '曹操',
                    from: '许昌'
                },
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
        }
    },
    watch: {},
    // 生命周期
    created() {},
    methods: {
        renderTd (column, item) {
            return column.from === item.name ? '☑️' : ''
        },
        creathand(){
          this.$router.push('/contract/add');
        }
    }
};
</script>
<template>
  <div class="contract">
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
         <el-button size="mini" class="goalTarget" @click="creathand" type="primary">创建目标</el-button>
        <!-- <div >创建目标</div> -->
      </div>
    </div>
    <div style="width: 1000px;margin: 0 auto;">
      <el-table :data="tableData" max-height="300" border>
          <el-table-column label="日期" prop="date" width="200" fixed></el-table-column>
          <el-table-column label="姓名" prop="name" width="200" fixed></el-table-column>
          <el-table-column v-for="(col, idx) in heads" :key="idx" align="center">
              <template slot="header">
                  <ul class="mul-thead">
                      <li>{{ col.name }}</li>
                      <li>{{ col.position }}</li>
                      <li>{{ col.person }}</li>
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
            // background: blue;
            // color: #fff;
            // border-radius: 6px;
            // padding:5px 20px;
            // font-size:12px;
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
