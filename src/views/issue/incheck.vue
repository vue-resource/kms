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
            formInfo:{
               "issueName":"张三",
                "issueScope":"",
                "issueCause":"",
                "solution":"",
                "remedialAction":"",
                "fileName":"",
                "leader":"李工",
                "status":"",
                "issueRank":"项目描述",
                "finishTime":"",
                "createTime":"", 
                a:'11'
            },
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
                "a":"111",//              
                "lists": [
                { id: 1, startTime: "选择开始时间", endTime: "选择结束时间" }]
            },
            //表单验证
           
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
            
        }
    }
};
</script>
<template>
  <div class="proAddBox">
    <div class="creat">查看列表</div>
    <div class="addMain">
      <el-form  ref="formInfo" :model="creatform" label-width="100px" >
        <el-form-item label="问题名称:" >
           {{formInfo.issueName}}
        </el-form-item>
        <el-form-item label="问题简介:" >
          {{formInfo.issueName}}
        </el-form-item>
        <el-form-item label="问题周期:">
          <ul class="Astrict" >
            <li v-for='(list,index) in creatform.lists' v-bind:key='index' >
               {{formInfo.a}}
              
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="问题描述:" >
        {{formInfo.issueRank}}
        </el-form-item>
        <el-form-item label="负责人:" >
         
             {{formInfo.leader}}
         
        </el-form-item>
        <el-form-item label="成员:" >
          {{formInfo.fileName}}
         
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
    height: 604px;
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
