<script>
// import moment from "moment";
// let Atime = new moment();
export default {
    name: "project-action",
    computed:{
      title () {
        return this.$route.query.id ? '编辑项目' : '新建项目'
      }
    },
    data() {
        const checkTime = (rule, value, callback) => {
          const res = value.every(item => {
            return item.name && item.dateStart && item.dateEnd;
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
          responsibles:[
            {value: "11", label: "张三1"},
            {value: "22", label: "张三2"}
          ],
          param: {
            projectName:'',
            projectRecommend: '',
            projectResponsible:'',
            members:'',
            projectTime:[{
              "dateStart":"",
              "dateEnd":"",
              "name":""
            }]
          },
          rules: {
            projectName: [
              { required: true, message: '请输入项目名称', trigger: 'change' }
            ],
            projectRecommend: [
              { required: true, message: '请输入项目描述', trigger: 'change' }
            ],
            members: [
              { required: true, message: '请输入项目成员', trigger: 'change' }
            ],
            projectResponsible: [
              { required: true, message: '请选择项目负责人', trigger: 'change' }
            ],
            projectTime: [
              { validator: checkTime, trigger: 'change' }
            ]
          },
        };
    },
    created() {
      if(this.$route.query.id){
        this.getDetail(this.$route.query.id);
      }
    },
    methods: {
      // 详情
      getDetail (id) {
        this.$ajax({
          // url: '/project/getProjectInfo',
          url: '/project/getProjectInfo.json',
          method: 'get',
          params: {
            id: id
          }
        }).then(res => {
          if(res.success){
            this.param = res.data;
          }
        })
      },
      // 提交
      handleSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$ajax({
              // url: '/project/updateProjectInfo',
              url: '/project/updateProjectInfo.json',
              method: 'get',
              params: this.param
            }).then(res => {
              if(res.success){
                this.$router.push('/project');
              }
            })
          }
        })
      },
    }
};
</script>

<template>

  <div class="proAddBox">
    <div class="creat">{{ title }}</div>
    <div class="addMain">
      <el-form ref="form" label-width="100px" :model="param" :rules="rules">
        <el-form-item label="活动名称:" prop="projectName">
          <el-input v-model.trim="param.projectName" style="width:400px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="项目简介:">
          <el-input v-model.trim="param.projectRecommend" style="width:400px" ></el-input>
        </el-form-item> -->
        <el-form-item label="项目周期:" prop="projectTime">
          <ul class="Astrict">
            <li v-for='(list,index) in param.projectTime' :key='index'>
              <el-input v-model.trim="list.name" class="userInp" style="width:200px"></el-input>
              <span class="block">
                <span class="demonstration">请选择开始时间</span>
                <el-date-picker v-model="list.dateStart" type="date" placeholder="开始日期"
                  class="startDate" ></el-date-picker>
              </span>
              <span class="blockTwo">
                <span class="demonstration">请选择结束时间</span>
                <el-date-picker v-model="list.dateEnd" type="date" placeholder="开始日期"
                  class="endDate" ></el-date-picker>
              </span>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="项目描述:" prop="projectRecommend">
          <el-input v-model.trim="param.projectRecommend" type="textarea" 
          :rows="5" class="projectDes"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:" prop="projectResponsible">
          <el-select v-model="param.projectResponsible">
            <el-option v-for="item in responsibles" :key="item.value"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成员:" prop="members">
          <el-input v-model.trim="param.members" class="members"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style lang="less">
.kms-content{
 
}
.proAddBox {
    border: 1px solid #ccc;
    border-top:none;
    width: 980px;
    height: 600px;
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
        .projectDes{
          width:600px;
        }
        .Astrict {
            display: inline-block;
            li {
                padding-bottom: 10px;

                .block {
                    padding-left: 16px;
                    .startDate{
                      width:140px;
                      padding-left:5px;
                    }
                }
                .startDate{
                  width:140px;
                  padding-left:5px;
                }
                .blockTwo {
                    padding-left: 15px;
                    .endDate{
                      width:140px;
                      padding-left:5px;
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
        .description {
            padding-bottom: 15px;
            .textAre {
                width: 830px;
                height: 110px;
                margin-left: 20px;
                vertical-align: text-top;
            }
        }
        .members{
          width:600px;
        }
        .people {
            padding-bottom: 15px;
        }
        .submitTxt {
            margin-top: 20px;
        }
    }
}
</style>
