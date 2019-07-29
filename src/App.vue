<template>
    <Login v-if="checkLoginPath()"></Login>
    <layout v-else>
        <router-view></router-view>
    </layout>
</template>
<!-- 引入组件库 -->
<script>
import Layout from '@/components/layout'
import Login from '@/views/login'
export default {
    name: 'app',
    components: { Layout, Login },
    methods: {
        checkLoginPath () {
            return this.$route.path.startsWith('/login');
        }
    }
}
</script>
<style lang="less">
@import url('~@/assets/style/index.less');
@import url('~@/assets/style/reset.css');
</style>



