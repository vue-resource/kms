import '@babel/polyfill';
import Vue from 'vue'
import ElementUI from 'element-ui' 

// 构造函数配置相关
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'

// 工具集合
import interceptors from '@/api/server'
// import filters from '@/utils/filters'
// import directives from '@/utils/directives'
// import comps from '@/utils/comp'
// import plugins from '@/utils/plugins'

// 扩充vue原型方法
Vue.prototype.$ajax = interceptors
// // 过滤器相关
// for(let key in filters) {
//     Vue.filter(key, filters[key])
// }
// // 指令相关
// for(let key in directives) {
//     Vue.directive(key, directives[key])
// }
// // 全局组件
// for(let key in comps) {
//     Vue.component(key, comps[key])
// }

// for(let key in plugins) {
//     Vue.use(key)
// }

Vue.use(ElementUI, {size: 'small'})

const app = new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
