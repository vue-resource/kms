<template>
    <layout>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </layout>
    <!-- <login></login> -->
</template>
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
import Layout from '@/components/layout'
import Login from '@/views/login'
export default {
    name: 'app',
    components: { Layout,Login }
}
</script>
<style lang="less">
@import url('~@/assets/style/index.less');
@import url('~@/assets/style/reset.css');
</style>



