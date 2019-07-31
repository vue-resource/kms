
<template>
  <el-container class="kms-container">
    <el-header class="kms-header">
      <div class="headImg"></div>
      <div class="headright">
        <span class="backText">后台管理</span>        
        <el-dropdown>
            <span class="el-dropdown-link">
                {{"罗伯特"}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="handle">退出登录</el-dropdown-item>
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
import Menu from "./menu";
export default {
    name: "layout",
    components: { Menu },
    methods: {
        checkIsProject() {
            return this.$route.path.startsWith("/project");
        },
         handle(a) {
         console.log('click on item ' + a);
       }
    }
};
</script>

<style lang="less">
.kms-container {
    height: 100%;
    box-sizing: border-box;
    .kms-header {
        line-height: 60px;
        // display: table-cell;
        border-bottom: 1px solid #ddd;
        .headImg {
            width: 140px;
            height: 38px;
            // line-height: 38px;
            vertical-align: middle;
            display: inline-block;
            background: url("~@/assets/img/login.jpg") no-repeat;
            background-size: 100% 100%;
        }
        .headright {
            float: right;
            font-size: 12px;
            color: #999;
            .backText {
                padding-right: 50px;
            }
        }
    }
    .kms-side-bar {
        border-right: 1px solid #ddd;
    }
}
</style>

