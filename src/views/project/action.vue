<script>
export default {
    name: "project-action",
    computed:{
      title () {
        return this.$route.query.id ? '编辑项目' : '新建项目'
      },
      members () {
        return this.param.projectResponsibleList.map(item => item.username)
          .join('、');
      }
    },
    data() {
        const checkTime = (rule, value, callback) => {
          const res = value.every(item => {
            return item.periodName && item.beginDate && item.endDate;
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
          projectId: this.$route.query.id,
          param: {
            name:'',
            projectRecommend: '',
            projectResponsible:'',
            projectPeriodList:[],
            projectResponsibleList: []
          },
          rules: {
            name: [
              { required: true, message: '请输入项目名称', trigger: 'change' }
            ],
            projectRecommend: [
              { required: true, message: '请输入项目简介', trigger: 'change' }
            ],
            projectResponsible: [
              { required: true, message: '请选择项目负责人', trigger: 'change' }
            ],
            projectPeriodList: [
              { required: true, validator: checkTime, trigger: 'change' }
            ]
          },
        };
    },
    created() {
      if(this.projectId){
        this.getDetail();
      }
    },
    methods: {
      // 详情
      getDetail () {
        this.$ajax({
          url: '/project/getProjectInfo',
          method: 'get',
          params: {
            id: this.projectId
          }
        }).then(res => {
          if(res.success){
            this.param = res.data;
          }
        })
      },
      // 提交
      handleSubmit () {
        const {id, name, projectRecommend, projectResponsible, projectPeriodList} = this.param;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$ajax({
              url: '/project/updateProjectInfo',
              // url: '/project/updateProjectInfo.json',
              method: 'post',
              data: {
                id, name, projectRecommend, projectResponsible, projectPeriodList
              },
              headers:{
                "Content-Type":"application/json"
              }
            }).then(res => {
              if(res.success){
                this.$router.push('/project');
              }
            })
          }
        })
      },
      addEvent(){     
        this.param.projectPeriodList.push({
            "beginDate":"",
            "endDate":"",
            "periodName":""
        })
      },
      delEvent(index){
        this.param.projectPeriodList.splice(index,1);
      }
    }
};
</script>

<template>

  <div class="proAddBox">
    <div class="creat">{{ title }}</div>
    <div class="addMain">
      <el-form ref="form" label-width="150px" :model="param" :rules="rules">
        <el-form-item label="活动名称:" prop="name">
          <el-input v-model.trim="param.name" class="proName"></el-input>
        </el-form-item>
        <el-form-item label="项目周期:" prop="projectPeriodList">
          <ul class="Astrict">
            <li v-for='(list,index) in param.projectPeriodList' :key='index'>
              <el-input v-model.trim="list.periodName" class="userInp" style="width:200px"></el-input>
              <span class="block">
                <span class="demonstration">请选择开始时间</span>
                <el-date-picker v-model="list.beginDate" type="date" placeholder="开始日期"
                  class="startDate" ></el-date-picker>
              </span>
              <span class="blockTwo">
                <span class="demonstration">请选择结束时间</span>
                <el-date-picker v-model="list.endDate" type="date" placeholder="开始日期"
                  class="endDate" ></el-date-picker>
              </span>
              <template v-if="param.projectPeriodList.length-1 === index">
                <i class="el-icon-circle-plus-outline"  @click="addEvent"></i>
              </template>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="项目简介:" prop="projectRecommend">
          <el-input v-model.trim="param.projectRecommend" type="textarea" 
          :rows="7" class="projectDes"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:" prop="projectResponsible">
          <el-select v-model="param.projectResponsible">
            <el-option v-for="(item, idx) in param.projectResponsibleList" :key="idx"
              :label="item.username" :value="item.userId+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成员:">
          <el-input v-model="members" disabled class="projectDes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style lang="less">
.proAddBox {
    border-top:none;
    width: 980px;
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
        .projectDes,.proName,.members{
          width:600px;
        }
        .Astrict {
            display: inline-block;
            li {
                padding-bottom: 10px;
                color: #797979;
                float: left;
                .block {
                    padding-left: 3px;
                    .startDate{
                      width:140px;
                    }
                }
                .startDate{
                  width:140px;
                }
                .blockTwo {
                    padding-left: 5px;
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
        .people {
            padding-bottom: 15px;
        }
        .submitTxt {
            margin-top: 20px;
        }
    }
}
</style>
