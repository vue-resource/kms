<template>
    <layout>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </layout>
</template>
<script>
import Layout from '@/components/layout'
export default {
    name: 'app',
    components: { Layout }
}
</script>
<style lang="less">
@import url('~@/assets/style/index.less');
</style>



