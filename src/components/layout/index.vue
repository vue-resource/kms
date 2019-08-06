
<template>
  <el-container class="kms-container">
    <el-header class="kms-header">
      <div class="headImg"></div>
      <div class="headright">
        <span class="backText">后台管理</span>        
        <el-dropdown class="gray">
            <span class="el-dropdown-link">
                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        class="kms-side-bar"
        v-if="!checkIsProject()"
      >
        <Menu />
      </el-aside>
      <el-main class="kms-content">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState ,mapActions} from 'vuex';
import Menu from "./menu";
export default {
    name: "layout",
    components: { Menu },
    computed: {
      ...mapState('common',['username'])
    },
    methods: {
       ...mapActions('common', ['updateUsername', 'cleanToken']),
      checkIsProject() {
          return this.$route.path.startsWith("/project");
      },
      logout () {
        this.$ajax({
          url: '/logout',
          // url: '/logout.json',
          method: 'get',
        }).then(res => {
          if(res.success){
            this.updateUsername('');
            this.cleanToken();
            this.$router.push('/login');
          }
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
        line-height: 60px;
        border-bottom: 1px solid #ddd;
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
            }
        }
    }
    .kms-side-bar {
        border-right: 1px solid #ddd;
    }
}
</style>

