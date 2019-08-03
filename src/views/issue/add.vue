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
     
      // this.createIssue()
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
    <div class="creat">新建问题</div>
    <div class="addMain">
      <el-form  ref="formInfo" :model="creatform" label-width="100px" :rules="rules">
        <el-form-item label="活动名称:"  prop="issueName">
          <el-input v-model.trim="creatform.issueName" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="项目简介:" prop="issueCase">
          <el-input v-model.trim="creatform.issueCause" style="width:400px" ></el-input>
        </el-form-item>
        <el-form-item label="项目周期:">
          <ul class="Astrict" >
            <li v-for='(list,index) in creatform.lists' v-bind:key='index' prop="issueTime">
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
        <el-form-item label="项目描述:" prop="issueCase">
          <el-input type="textarea"  :rows="5" class="desreption"
            v-model.trim="creatform.issueScope"
           
          ></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:"  prop="issueMembers">
          <el-select v-model="creatform.leader" placeholder="李工" >
             <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成员:" prop="issueMembers">
          <el-input type="textarea" :rows="4"  v-model.trim="creatform.fileName" class="members" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createIssue">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style lang="less">
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
                    padding-left: 25px;
                    .startDate{
                      margin-left:10px;
                    }
                }
                .blockTwo {
                    padding-left: 15px;
                    .endDate{
                      margin-left:10px;
                    }
                }
            }
        }
        .detips {
            padding-bottom: 15px;
            .userInp {
                width: 120px;
            }
        }
        .desreption
         {
            padding-bottom: 15px;
            width:600px;
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
            margin-top: 20px;
        }
        .members{
          width:600px;
        }
    }
}
</style>
