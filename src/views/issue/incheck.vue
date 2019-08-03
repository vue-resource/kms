<script>
export default {
    name: "issue-add",
    props: {},
    data() {
      const issuecheckTime = (rule, value, callback) => {
          const res = value.every(item => {
            return item.issueName && item.createTime && item.finishTime;
          })
          if(value.length === 0){
            callback(new Error('请填写项目周期'));
          }else if(!res){
            callback(new Error('每一项必须完整'))
          }else {
            callback();
          }
        }
        return {
            creatform: {                
                "nodeId":'',
                "nodeId":"",
                "targetId":"",
                "issueName":"",
                "issueScope":"",
                "issueCause":"",
                "solution":"",
                "remedialAction":"",
                "fileName":"",
                "leader":"",
                "status":"",
                "issueRank":"",
                "finishTime":"",
                "createTime":"", 
                "a":"",//              
                "lists": [
                { id: 1, startTime: "选择开始时间", endTime: "选择结束时间" },
                { id: 2, startTime: "选择开始时间", endTime: "选择结束时间" },
                { id: 3, startTime: "选择开始时间", endTime: "选择结束时间" }]
            },
            //表单验证
            rules: {
              issueName: [
                { required: true, message: '请输入问题姓名', trigger: 'change' }
              ],
              issueCase: [
                { required: true, message: '请输入问题原因', trigger: 'change' }
              ],
              issueMembers: [
                { required: true, message: '请输入项目成员', trigger: 'change' }
              ],
              issueResponsible: [
                { required: true, message: '请选择问题负责人', trigger: 'change' }
              ],
              issueTime: [
                { validator: issuecheckTime, trigger: 'change' }
              ]
            },
            options: [{
                    value: "1",
                    label: "张三"
                },
                {
                    value: "2",
                    label: "李四"
                }],
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {
     
      this.createIssue()
    },
    methods: {
        //创建问题
        createIssue(){
          console.log(this)
           this.$refs['formInfo'].validate((valid) => {
             console.log(valid)
                // if (valid) {
                  //  this.$ajax({
                  //   // url: 'issue/createIssue',//创建问题
                  //     url: '/issue/createIssue.json',
                  //     method: 'get',
                  //     params: this.creatform
                  //   }).then(res => {                         
                  //     if(res.success){             
                  //     }
                  // })
                // }
             })         
        }
    }
};
</script>
<template>
  <div class="proAddBox">
    <div class="creat">问题详情</div>
    <div class="addMain">
      <el-form   :model="creatform" label-width="100px" :>
        <el-form-item label="问题描述：">
           
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input v-model.trim="creatform.issueCause" style="width:400px" props="issueCase"></el-input>
        </el-form-item>
        <el-form-item label="项目周期:">
          <ul class="Astrict">
            <li v-for='(list,index) in creatform.lists' v-bind:key='index' props="issueTime">
              <el-input v-model.trim="creatform.a" class="userInp" style="width:200px" placeholder="Q1" ></el-input>
              <span class="block">
                <span class="demonstration">{{list.startTime}}</span>
                <el-date-picker v-model="creatform.createTime" type="date" class="startDate" style="width: 140px;" placeholder="start日期">
                </el-date-picker>
              </span>
              <span class="blockTwo">
                <span class="demonstration">{{list.endTime}}</span>
                <el-date-picker v-model="creatform.finishTime" type="date" class="endDate" style="width: 140px;" placeholder="end日期">
                </el-date-picker>
              </span>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="项目描述:">
          <el-input type="textarea"  :rows="5" class="desreption"
            v-model.trim="creatform.issueScope"
            props="issueCase"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:">
          <el-select v-model="creatform.leader" placeholder="李工"  props="issueMembers">
             <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成员:">
          <el-input type="textarea" :rows="4"  v-model.trim="creatform.fileName"  ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style lang="less">
.kms-content{margin:0;padding:0;}
.proAddBox {
    border: 1px solid #ccc;
    border-top:none;
    width: 980px;
    height: 724px;
    border-radius:0;
    margin: 0 auto;
    .creat {
        width: 880px;
        margin: 0px auto 20px;
        padding-top: 15px;
        padding-bottom: 10px;
        font-weight: bold;
        border-bottom:1px solid #ddd;
    }
    .addMain {
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
