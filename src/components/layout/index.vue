
<template>
  <el-container class="kms-container">
    <el-header class="kms-header">
      <div class="headImg"></div>
      <div class="headright">
         
        <router-link to="/">
          <el-button type="text">返回首页</el-button>
        </router-link>
        <el-dropdown class="gray">
            <span class="el-dropdown-link">
                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      
  
    </el-header>
    <el-container class="kms-body">
      <el-aside
        width="200px"
        class="kms-side-bar"
        v-if="!checkIsProject()"
      >
        <Menu />
      </el-aside>
      <el-main class="kms-content">
        <el-breadcrumb separator-class="el-icon-arrow-right" 
          v-if="$route.path !== '/project/list'" class="breadcrumb-demo">
          <el-breadcrumb-item :to="{ path: '/' }">项目主页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ nodeName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <slot></slot>
      </el-main>
    </el-container>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="form" :rules="rules"  ref="form">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="form.password"   auto-complete="off"></el-input> 
              <div slot="prepend" class="password"></div>         
            </el-form-item>
              <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
               <el-input v-model="form.newPassword"  auto-complete="off"></el-input>
               <div slot="prepend" class="password"></div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="passwordHandel">确 定</el-button>
          </div>
        </el-dialog>
  </el-container>
  
</template>
<script>
import {mapActions, mapState} from 'vuex';
import Menu from "./menu";
import localStorage from '@/utils/tools/localstorage';
export default {
    name: "layout",
    data(){
      return {
         form: {password:'',newPassword:''},
         dialogFormVisible: false,
         formLabelWidth: '100px',
         rules: {
            password: [
              { required: true, message: '请输入密码', trigger: 'change' },
            ],
          }
      }
    },
    components: { Menu },
    computed: {
      ...mapState('common', ['username', 'nodeName', 'projectName'])
    },
    methods: {
      ...mapActions('common', ['updateUsername', 'cleanToken']),
      checkIsProject() {
          return this.$route.path.startsWith("/project");
      },
      passwordHandel(){
         this.$refs['form'].validate(valid => {
            if(valid){
              this.$ajax({
                url: '/rms_api/password',
                method: 'get',
                params: this.form
              }).then(res => {
                this.dialogFormVisible = false;
                if(res.success==1){
                   this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                }
              })
            }
          });
      },
      logout () {
        this.$ajax({
          url: '/rms_api/logout',
          method: 'post'
        }).then(res => {
            this.updateUsername('');
            this.cleanToken();
            this.$router.push('/login');
        })
      }
    }
};
</script>

<style lang="less">
.el-main{
  padding:0!important;
}
.kms-container {
    height: 100%;
    box-sizing: border-box;
    .kms-header {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        box-shadow: 0 0 15px #aaa;
        .headImg {
            width: 140px;
            height: 38px;
            vertical-align: middle;
            display: inline-block;
            background: url("~@/assets/img/login.jpg") no-repeat;
            background-size: 100% 100%;
        }
        .headright {
            float: right;
            font-size: 14px;
            color: #999;
            .backText {
                padding-right: 30px;
            }
            .gray{
               color: #999;
               margin-left: 20px;
            }
        }
    }
    .kms-body{
      padding-top:70px;
      overflow: hidden;
      .kms-side-bar {
        border-right: 1px solid #ddd;
        background-color: #343747;
        .el-tree {
          background-color: #343747;
         color: #fff;
          .el-tree-node__content:hover{
            color: #606266;
          }
          .el-tree-node>.el-tree-node__children { color: #fff;background-color: #343747;}
          .el-tree-node.is-current,.el-tree-node.is-checked { color:#343747; background-color: #fff;}
        }
      }
      .kms-content {
        position: relative;
      }
    }
    .breadcrumb-demo {
      padding-left: 20px;
      line-height: 30px;
    }
}
</style>

