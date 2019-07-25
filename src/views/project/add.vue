<script>
import moment from "moment";
let Atime = new moment();
export default {
    name: "login",
    props: {},
    data() {
        return {
            value1: Atime.format("YYYY/MM/DD"),
            value2: Atime.format("YYYY/MM/DD"),
            hold: "1",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                lists: [{ id: 1, startTime: "选择开始时间", endTime: "选择结束时间" }]
            },
            options: [
                {
                    value: "选项1",
                    label: "张三"
                },
                {
                    value: "选项2",
                    label: "李四"
                },
                {
                    value: "选项3",
                    label: "王五"
                }
            ],
            value: ""
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        addNewList: function(e) {
            console.log(this, this.index);
            this.hold = this.index;
            this.form.lists.unshift({
                id: this.index++,
                startTime: "选择开始时间",
                endTime: "选择结束时间"
            });
            console.log(this.lists);
            //  this.newAddText=''
        }
    }
};
</script>

<template>

  <div class="proAddBox">
    <div class="creat">
      创建项目
    </div>

    <div class="addMain">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        
      >
     
        <el-form-item label="活动名称:">
          <el-input
            v-model.trim="form.name"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input
            v-model.trim="form.region"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目周期:">

          <ul class="Astrict">
            <li
              v-for='(list,index) in form.lists'
              v-bind:key='index'
            >
              <el-input
                v-model.trim="form.date1"
                class="userInp"
                style="width:200px"
                placeholder="Q1"
              ></el-input>
              <span class="block">
                <span class="demonstration">{{list.startTime}}</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  class="startDate"
                  style="width: 140px;"
                  placeholder="start日期"
                >
                </el-date-picker>
              </span>
              <span class="blockTwo">
                <span class="demonstration">{{list.endTime}}</span>
                <el-date-picker
                  v-model="value2"
                  type="date"
                  class="endDate"
                  style="width: 140px;"
                  placeholder="end日期"
                >
                </el-date-picker>
              </span>
            </li>
          </ul>
          <el-button
            plain
            @click='addNewList'
          >继续添加周期</el-button>
        </el-form-item>
        <el-form-item label="项目描述:">
          <el-input
            type="textarea"
            v-model.trim="form.desc"
            style="width:800px;"
            :rows="5"
            placeholder="K11项目是我司战略上最重要的一款车型。"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:">
          <el-select
            v-model="form.region"
            placeholder="李工"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成员:">
          <el-input
            type="textarea"
            v-model.trim="form.desc"
            style="width:600px;"
            :rows="4"
            placeholder="K1222项目成员。  "
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
          >提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style lang="less">
.proAddBox {
    border: 1px solid #ccc;
    width: 980px;
    height: 724px;
    border-radius: 5px;
    margin: 0 auto;
    .creat {
        padding-top: 20px;
        padding-left: 20px;
        font-weight: bold;
    }
    .addMain {
        padding-top: 25px;
        padding-left: 30px;
        .Addweek {
            padding-bottom: 15px;
            .Addlist {
                display: inline-block;
            }
        }

        .Astrict {
            display: inline-block;
            li {
                padding-bottom: 10px;

                .block {
                    padding-left: 35px;
                }
                .blockTwo {
                    padding-left: 15px;
                }
            }
        }
        .detips {
            padding-bottom: 15px;
            .userInp {
                width: 120px;
                // width:400px;
                // display: inline-block;
                // margin-left: 20px;
            }
        }
        .description {
            padding-bottom: 15px;
            .textAre {
                width: 830px;
                height: 110px;
                margin-left: 20px;
                vertical-align: text-top;
            }
        }
        .people {
            padding-bottom: 15px;
        }
        .submitTxt {
            marigin-top: 20px;
        }
    }
}
</style>
