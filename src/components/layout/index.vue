<template>
    <el-container class="kms-container">
        <el-header class="kms-header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="kms-side-bar">
                <Menu/>
            </el-aside>
            <el-main class="kms-content"><slot></slot></el-main>
        </el-container>
    </el-container>
</template>
<script>
import Menu from './menu'
export default {
    name: 'layout',
    components: { Menu }
}
</script>

<style lang="less">
.kms-container {
    height: 100%;
    box-sizing: border-box;
    .kms-header {
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
    }
    .kms-side-bar {
        border-right: 1px solid #ddd;
    }
}
</style>

