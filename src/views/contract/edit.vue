<script>
export default {
    name: "s",
    props: {},
    data() {
        return {
            value1: "",
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                }
            ],
            time1:'2019/7/21',
            time2:'2019/7/23',
            value8: "",
            value4: "",
            value5: "",
            value3: "",
            value2: "",
            activeName: "",
            activeName1: "",
            gridData: [
                {
                    date: "1",
                    name: "王小虎",
                    address: "上海市普陀区金"
                },
                {
                    date: "2",
                    name: "王小虎",
                    address: "上海市普陀区金沙"
                },
                {
                    date: "3",
                    name: "王小虎",
                    address: "上海市普陀区"
                },
                {
                    date: "4",
                    name: "王小虎",
                    address: "上海市普陀区"
                }
            ]
        };
    },

    watch: {},
    // 生命周期
    created() {
      this.getNodeList();
    },
    methods: {
        renderTd(column, item) {
            // return column.from === item.name ? "☑️" : "";
        },
        creathand() {
            this.$router.push("/contract/add");
        },
        getNodeList(){
            this.$ajax({
                // url: '/getNodeList',
                url: '/getNodeList.json',
                method: 'get',
                params: {
                 projectId:"0"
                }
              }).then(res => {
               
                if(res.success){
                 
                }
              })
        }
    }
};
</script>
<template>
  <div class="tipbox">
    <div class="headtip">
      <div class="strip">
        <el-input placeholder="请输入内容" v-model="value1">
          <template slot="prepend">目标名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="value2" class="simble">
          <template slot="prepend">边界系统</template>
        </el-input>
      </div>
      <div class="stripTwoBox">
        <div class="stripTwo">
          <el-input placeholder="请输入内容">
            <template slot="append">
            </template>
            <template slot="prepend">项目阶段</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="value5" class="simble" >
            <template slot="prepend">时间计划</template>
          </el-input>
        </div>
        <div class="reletionship">
          <router-link to="/contract/topo">
            <el-button size="mini" class="reletionshipBtn2" @click="creathand" type="primary">需求关系图</el-button>
          </router-link>
          <el-button size="mini" class="reletionshipBtn1" @click="creathand" type="plain">目标拆解</el-button>
        </div>
      </div>
    </div>
    <div class="tip-contain">
      <div class="contain-left">
        <div class="contain-head">
          <el-tabs v-model="activeName" class="contain-lab">
            <el-tab-pane label="目标定义" name="first"></el-tab-pane>
            <el-tab-pane>
            </el-tab-pane>
          </el-tabs>
          <div class="contain-leftTime">
            {{time1}}
          </div>
        </div>
        <el-table :data="gridData" class="gridtableft">
          <el-table-column property="date" label="日期" width="100" ></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        <div class="reviewTxt">
          <div class="laborTxt">相关附件</div>
          <div class="carborad">整车重量计算报告.ppt</div>
          <div class="carboradTxt">GBT-12432 汽车质量参数检测方法</div>
        </div>
      </div>
      <div class="contain-right">
        <div class="contain-head">
          <el-tabs v-model="activeName1" class="contain-lab">
            <el-tab-pane label="目标定义" name="first"></el-tab-pane>
          </el-tabs>
          <div class="contain-rightTime">
            {{time2}}
          </div>
        </div>

        <el-table :data="gridData" class="gridtabright">
          <el-table-column property="date" label="日期" width="100"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        <div class="reviewTxt">
          <div class="laborTxt">相关附件</div>
          <div class="carborad">整车重量计算报告.ppt</div>
          <div class="carboradTxt">GBT-12432 汽车质量参数检测方法</div>
        </div>
        <div class="reviewFoot">
          <el-button
            size="mini" class="submitBtn" @click="creathand" type="primary" round>发布</el-button>
            <span class="btnBox">
              <el-button size="mini" class="submitBtn" @click="creathand" type="plain" round>提交</el-button>
              <el-button size="mini" class="submitBtn" @click="creathand" type="plain" round>保存</el-button>
              <el-button size="mini" class="submitBtn" @click="creathand" type="plain" round>取消</el-button>
            </span>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="less">
.tipbox {
    .headtip {
        width: 100%;
        .strip {
            display: flex;
            width: 600px;
            .simble {
                margin-left: 20px;
            }
        }
        .stripTwoBox {
            display: flex;
            margin-top: 20px;
            width: 100%;
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            .stripTwo {
                display: flex;
                width: 600px;
                .simble {
                    margin-left: 20px;
                }
            }
            .reletionship {
                flex: 1;
                .reletionshipBtn1 {
                    float: right;
                    margin-right:20px;
                }
                 .reletionshipBtn2 {
                    float: right;
                }
            }
        }
    }
    .tip-contain {
        height: 480px;
        margin-top: 20px;
        display: flex;
        .contain-left {
            width: 510px;
            height: 480px;
            border: 1px solid #ccc;
            box-shadow: inset #ddd;
            margin-right: 20px;
            border-radius: 4px;
            font-size: 14px;
            .contain-head {
                position: relative;
            }
            .contain-lab {
                width: 450px;
                margin: 0 auto;
            }
            .gridtableft{
              width:450px;
              margin:10px auto;
            }
            .contain-leftTime {
                position: absolute;
                top: 10px;
                right: 30px;
                border-radius: 4px;
            }
             .reviewFoot {
                width: 450px;
                margin: 20px auto;
                .btnBox{
                  float: right;
                }
            }
        }
        .reviewTxt {
            width: 450px;
            margin: 0 auto;
            font-size: 12px;
            .laborTxt {
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
            }
            .carborad {
                padding: 10px 0;
            }
        }
        .contain-right {
            width: 510px;
            height: 480px;
            border: 1px solid #ccc;
            box-shadow: inset #ddd;
            border-radius: 4px;
            .contain-lab {
                width: 450px;
                margin: 0 auto;
            }
            .gridtabright{
              width:450px;
              margin:10px auto;
            }
            .contain-head {
                position: relative;
                padding: 15px;
            }
            .contain-rightTime {
                position: absolute;
                top: 10px;
                right: 0px;
                border-radius: 4px;
            }
            .reviewFoot {
                width: 450px;
                margin: 20px auto;
                .btnBox{
                  float: right;
                }
            }
        }
    }
}
</style>
