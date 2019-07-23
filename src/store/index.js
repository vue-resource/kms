import Vue from 'vue';
import Vuex from 'vuex';

// 引入各个模块
import common from './modules/common';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'product',
    modules: {
        common
    },
    plugins: []
});

Vue.prototype.$store = store;

export default store;