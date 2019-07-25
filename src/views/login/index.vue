
<script>
export default {
    name: 'login',
    props: {

    },
    data () {
        return {
          checked: false
        }
      
    },
    computed: {

    },
    watch: {

    },
    // 生命周期
    created () {

    },
    methods: {

    }
}
</script>

<template>
    <div class="loginBox">
        <div class="loginMain">
            <div class="loginTitle">长城华冠开发系统</div>
            <!-- login -->
            <div class="loginContain">
                
                <div class="loginImg">
                   <!-- <img src="" alt=""> -->
                    img
                </div>
                <div class="loginForm">
                    <div class="putOne">
                       <span>用户名</span>
                        <input type="text" class="user"/> 
                    </div>
                    <div class="putTwo">
                       <span>密 码</span>
                        <input type="text" class="password"/> 
                    </div>             
                    <el-checkbox v-model="checked" class="restore">保持登录</el-checkbox>
                    <div class="loginFoot">
                       <el-button type="primary">确认</el-button>                   
                       <span class="forgoton">忘记密码</span>
                    </div>
                    
                </div>
            </div>
        </div>
       
    </div>
</template>
<style lang="less">
  .body,html{
      width: 100%;
      height: 100%;
  }
  .loginBox{
    width:500px;
    height:275px;
    border:1px solid #ccc;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -250px;
    margin-top: -168px;
   
  }
  .loginTitle{
      text-align: center;
      margin-top: 25px;
      font-family: "思源黑體 Bold"; 
      color: rgb(0, 0, 0);
      &:after {
        content: "";
         width: 400px;
         margin:30px auto;
         display: block;
         border: 1px solid #ddd;
    }
  }
  .loginContain{
     margin-left:50px;
     margin-right:50px;
    .loginImg{
        width:110px;
        height: 60px;
        margin-top:30px;
        border:1px solid #ccc;
        text-align: center;
        line-height: 60px;
        float: left;
    }
    .loginForm{
        display: inline-block;
        margin-left:26px; 
        .putOne{
            padding-bottom: 15px;
        }
        .user{
            margin-left:13px;
        }
        .password{
            margin-left: 26px;
            margin-bottom: 10px;
        }
       .loginFoot{
           padding-top: 10px;
           .forgoton{
               padding-left:10px; 
           }
       }
    }
  }
  
</style>

