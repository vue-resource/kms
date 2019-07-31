<script>
import moment from "moment";
// import Alert from '../components/alert'
// console.log(Alert)
let Atime = new moment();
export default {
    name: "project",
    props: {},
    data() {
        return {
            time: Atime.format("YYYY年MM月DD日"),
            Atarget: "5",
            Btarget: "12",
            Ctarget: "8",
            Dtarget: "20",
            idx: false,
            username: "罗伯特",
            gridData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ],
            dialogTableVisible: false,
            tableData: [
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
                }
            ],
            list: [
                { name: "K09项目" },
                { name: "K11项目" },
                { name: "K12项目" },
                { name: "K13项目" },
                { name: "K14项目" },
                { name: "K15项目" },
                { name: "K16项目" }
            ]
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {
        // this.creathand();
    },
    methods: {
        changeMask(index) {
            console.log(index);
            let vm = this;
            let mask = vm.$refs[index];
            if (mask == index) {
                this.idx = true;
            }
        },
        editHand() {
            console.log("editHand");
        },
        commenHand() {
            console.log("commenHand");
        },
        creathand() {
            console.log("查看项目");
           
        }
    }
};
</script>

<template>
  <div class="projctBox">
    <div class="proheadWrap">
      <div class="proHead">
        <div class="proleft">
          <div class="username"> {{username}} 上午好！</div>
          <div class="dataTime">{{time}}</div>
        </div>
        <!-- <div class="line"></div> -->
        <div class="proright">
          <div class="rightfit">
            <p>我发出的目标</p>
            <p class="targetTxt">{{Atarget}}</p>
          </div>
          <div class="rightfit">
            <p>我收到的目标</p>
            <p class="targetTxt">{{Btarget}}</p>
          </div>
          <div class="rightfit">
            <p>我发起的问题</p>
            <p class="targetTxt">{{Ctarget}}</p>
          </div>
          <div class="rightfit">
            <p>指派给我的问题</p>
            <p class="targetTxt">{{Dtarget}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="proContain">
      <div class="proText">项目列表</div>
      <div class="proMain">
        <ul class="ulist">
          <li
            v-for="(todo,index) in list"
            class="gether"
            v-bind:key="index"
            :ref="index"
          >
            <!-- {{todo.name}} -->

            <div
              class="markShy"
              v-if="index===0"
            >
              <div class="matip">
                <span
                  class="eyer"
                  @click="dialogTableVisible = true"
                ></span>
                <span
                  class="edition"
                  @click="editHand"
                ></span>
              </div>
              <el-button
                size="mini"
                class="detail"
                @click="dialogTableVisible = true"
                type="primary"
              >查看项目目标</el-button>
              <!-- <span class="detail">查看项目目标</span> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="K11项目"
      :visible.sync="dialogTableVisible"
    >
      <div class="tabhead">
        <div>
          <span>项目简介：</span>
          <span>K11</span>
        </div>
        <div>
          <span>创建日期：</span>
          <span>2019/7/29</span>
        </div>
        <div>
          <span>创建人：</span>
          <span>马总</span>
        </div>
        <div>
          <span>项目负责人：</span>
          <span>李总工</span>
        </div>
      </div>
       <div class="recent">项目周期</div>
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column
          property="address"
          label="地址"
        ></el-table-column>
      </el-table>
      <div class="tabfoot">项目成员</div>
      <div class="tabfootText">
        张三，李四，王五
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less">
.kms-content {
    margin: 0;
    padding: 0;
}
.proheadWrap {
    width: 100%;
    background-color: rgb(242, 242, 242);
}
.proHead {
    width: 760px;
    height: 140px;
    border-radius: 4px;
    margin: 0 auto;
    // background-color: rgb(242, 242, 242);
    // display: flex;
    .proleft {
        width: 150px;
        padding-top: 10px;
        .dataTime {
            margin-top: 10px;
            color: #999;
            font-size: 12px;
        }
        .username {
        }
    }

    .proright {
        width: 760px;
        font-size: 14px;
        display: flex;
        padding-top: 10px;
        .rightfit {
            flex: 1;
        }
        .targetTxt {
            font-size: 36px;
            color: blue;
        }
    }
}
.proContain {
    width: 760px;
    height: 860px;
    margin: 10px auto 0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    // background-color: rgb(242, 242, 242);
    .proText {
        // padding-left: 30px;
        padding-top: 15px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        //  width:100%;
    }
    .proMain {
        flex: 1;
    }
    .ulist {
        display: flex;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        .gether {
            width: 200px;
            height: 200px;
            margin-right: 50px;
            position: relative;
            border-radius: 6px;
            font-weight: bold;
            color: #fff;
            background: url("~@/assets/img/developImg.png") no-repeat;
            background-size: 100% 100%;
        }
        .markShy {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.2);
            color: #ddd;
            .matip {
                padding-top: 20px;
                padding-right: 20px;
                left: 25px;
                bottom: 15px;
                position: absolute;
                .eyer {
                    width: 20px;
                    height: 20px;
                    background: url("~@/assets/img/eye.png") no-repeat;
                    background-size: 100% 100%;
                    display: inline-block;
                    color: #fff;
                }
                .edition {
                    width: 20px;
                    height: 20px;
                    background: url("~@/assets/img/edition.png") no-repeat;
                    background-size: 100% 100%;
                    display: inline-block;
                }
            }
            .detail {
                position: absolute;
                left: 23%;
                bottom: 50px;
            }
        }
    }
}

.tabhead {
    display: flex;
    justify-content: space-around;
}
.recent {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabfoot {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabfootText {
    background: #ddd;
    height: 40px;
    border-radius: 4px;
    line-height: 40px;
    padding-left: 20px;
}

.el-message-box {
    width: 900px;
    height: 500px;
}
</style>
