
<script>
import { mapActions } from 'vuex';
export default {
    name: "login",
    props: {},
    data() {
        return {
            checked: false,
            formData: {
                account: "",
                password: "",
                captcha:'test'
            },
            rules: {
              account: [
                { required: true, message: '请输入用户名', trigger: 'change' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'change' },
              ],
            }
        };
    },
    methods: {
      ...mapActions('common', ['updateUsername', 'updateToken']),
      submit() {
          this.$refs['form'].validate(valid => {
            if(valid){
              this.$ajax({
                url: '/rms_api/login',
                method: 'post',
                data:this.formData,
                headers:{
                  "Content-Type":"application/json"
                }
              }).then(res => {
                if(res.success){
                  this.updateUsername(res.data.username);
                  this.updateToken(res.data.uid);
                  this.$router.push('/project');
                }
              })
            }
          });
      }
    }
};
</script>

<template>
<div class="loginWarp">
  <div class="loginBox">
    <div class="loginMain">
      <div class="loginImg"></div>
      <!-- login -->
      <div class="loginContain">
        <div class="loginTitle"> 项目开发系统 </div>
        <div class="loginForm">
          <el-form :model="formData" :rules="rules"
            ref="form" class="demo-dynamic" label-width="0">
            <el-form-item label="" prop="account"  class="inp">
              <el-input v-model.trim="formData.account"  
                placeholder="请输入用户名" class="inp">
                <div slot="prepend" class="user"></div>
              </el-input>
            </el-form-item> 
            <el-form-item label="" prop="password"  >
              <el-input v-model.trim="formData.password"  type="password"
                placeholder="请输入密码" class="wordText">
                <div slot="prepend" class="password"></div>
              </el-input>
            </el-form-item>
            <div class="restore">
              <el-checkbox v-model="checked">保持登录</el-checkbox>
              <span class="forgoton">忘记密码?</span>
            </div>
              <el-button type="primary" @click="submit"
                class="loginFoot">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style lang="less">
.loginWarp{
  width:100%;
  height: 100%;
  background-image: url('~@/assets/img/body.png');
  background-size: cover;
  background-position: center;
}
.loginBox {
    width: 31rem;
    height: 28rem;
    border: 1px solid #ccc;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    margin-left: -15.5rem;
    margin-top: -14rem;
    border-radius: 4px;
    .loginImg {
        width: 215px;
        height: 56px;
        text-align: center;
        line-height: 56px;
        margin: 30px auto 0;
        background: url("~@/assets/img/login.jpg") no-repeat;
        background-size: 100% 100%;
    }
    .loginTitle{
      text-align: center;
      padding-top:12px;
      font-size: 18px;   
      color: #565656;
      padding-bottom:15px;
    }
}

.loginContain {
    .loginForm {
        flex: 1;
        width:26.2rem;
        height: 15.6rem;
        margin:0 auto;
        font-size: 14px;
         color: #666;
        .restore {
            margin-top: 2.2rem;
            margin-bottom: 1.5rem;
        }
        
        .loginFoot {
            width:100%;
           
        }
        .forgoton {
            margin-right: 10px;
            float: right;
            border-bottom:1px solid #ccc;
            padding-bottom:2px;            
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

