
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
      <div class="loginTitle">长城华冠开发系统</div>
      <!-- login -->
      <div class="loginContain">
        <div class="loginImg">
          img
        </div>
        <div class="loginForm">
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            :label-position="labelPosition"
            class="demo-dynamic"
          >
            <el-form-item
              prop="user"
              label="用户名"
              :rules="[{ required: false, message: '用户名不能为空'},
                                        { type: 'string', message: '用户名必须为数字值'}
                                        ]"
            >
              <el-input
                v-model.trim="dynamicValidateForm.user"
                style="width:200px"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              label="密 码"
              :rules="[]"
            >
              <el-input
                v-model.trim="dynamicValidateForm.password"
                style="width:200px"
              ></el-input>
            </el-form-item>
            <el-checkbox
              v-model="checked"
              class="restore"
            >保持登录</el-checkbox>
            <div class="loginFoot">
              <el-button
                type="primary"
                @click="submit('dynamicValidateForm')"
              >确认</el-button>
              <span class="forgoton">忘记密码</span>
            </div>
          </el-form>

        </div>
      </div>
    </div>

  </div>
</template>
<style lang="less">
.body,
html {
    width: 100%;
    height: 100%;
}
.loginBox {
    width: 500px;
    height: 300px;
    border: 1px solid #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -150px;
}
.loginTitle {
    text-align: center;
    margin-top: 25px;
    font-family: "思源黑體 Bold";
    color: rgb(0, 0, 0);
    &:after {
        content: "";
        width: 400px;
        margin: 30px auto;
        display: block;
        border: 1px solid #ddd;
    }
}
.loginContain {
    margin-left: 50px;
    margin-right: 50px;
    display: flex;
    .loginImg {
        width: 110px;
        height: 60px;
        margin-top: 30px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 60px;
        float: left;
    }
    .loginForm {
        flex: 1;
        .restore {
            margin-left: 50px;
        }
        .loginFoot {
            margin-left: 50px;
            margin-top: 10px;
        }
        .forgoton {
            padding-left: 10px;
        }
    }
}
</style>

