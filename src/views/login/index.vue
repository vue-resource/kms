
<script>
export default {
    name: "login",
    props: {},
    data() {
        return {
            checked: false,
            labelPosition: "right",
            dynamicValidateForm: {
                user: "",
                password: ""
            }
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        submit(form) {
            this.$refs[form].validate(valid => {
                console.log(valid);
            });
        }
    }
};
</script>

<template>
  <div class="loginBox">
    <div class="loginMain">
      <div class="loginImg"></div>
      <!-- login -->
      <div class="loginContain">
        <div class="loginTitle">
          项目开发系统
        </div>
        <div class="loginForm">
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            :label-position="labelPosition"
            class="demo-dynamic"
          >
          <el-input
                v-model.trim="dynamicValidateForm.user"  
                style="margin:10px auto ;width:300px;"  
                placeholder="请输入用户名"
                class="inp"
              >
              <div slot="prepend" class="user"></div>
              </el-input>
               <el-input
                v-model.trim="dynamicValidateForm.password"
               style="margin:10px auto;width:300px"  
                placeholder="请输入密码"
              >
               <div slot="prepend" class="password"></div>
              </el-input>
           <div class="restore">
              <el-checkbox
              v-model="checked"
             
            >保持登录</el-checkbox>
            <span class="forgoton">忘记密码</span>
           </div>
           
            <div class="loginFoot">
              <el-button
                type="primary"
                @click="submit('dynamicValidateForm')"
                style="width:300px"
              >登录</el-button>
              
            </div>
          </el-form>

        </div>
      </div>
    </div>

  </div>
</template>
<style lang="less">
.loginBox {
    width: 500px;
    height: 442px;
    border: 1px solid #ccc;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -221px;
    border-radius: 4px;
    .loginImg {
        width: 215px;
        height: 56px;
        // border: 1px solid #ccc;
        text-align: center;
        line-height: 56px;
        margin: 30px auto 0;
        background: url("~@/assets/img/login.jpg") no-repeat;
        background-size: 100% 100%;
    }
    .loginTitle{
      text-align: center;
      padding-top:12px;
      padding-bottom: 15px;
      color: #666;
    }
}

.loginContain {
    margin-left: 50px;
    margin-right: 50px;
   
    .loginForm {
        flex: 1;
        margin-left: 50px;
        margin-right: 50px;
        font-size: 14px;
         color: #666;
        .restore {
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .loginFoot {
           
            margin-top: 10px;
        }
        .forgoton {
            marign-right: 10px;
            float: right;
           
            
        }
        .user{
          width:20px;
          height: 20px;
          background: url("~@/assets/img/people.png") no-repeat;
          background-size: 100% 100%;
        }
        .password{
           width:20px;
          height: 20px;
          background: url("~@/assets/img/password.png") no-repeat;
          background-size: 100% 100%;
        }
    }
}
</style>

