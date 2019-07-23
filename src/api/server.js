import Vue from 'vue'
import axios from 'axios';
import store from '@/store/index';
// import md5 from 'blueimp-md5';

// axios.defaults.baseURL = window['ApiPrefix'] || '';

const stringify = o => {
    try {
        if (!_.isEmpty(o)) {
            return JSON.stringify(o);
        }
        return '';
    } catch (e) {
        return '';
    }
};

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */

const instance = axios.create({
    timeout: 20000, // 请求超时时间
    withCredentials: true // 跨域
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        let params = Object.assign(config.params || {}, {
            _: Date.now()
        });
        // 防止重复提交token
        config.headers.common['X-Anti-Request-Token'] = md5(
            stringify(config.body || config.params)
        );
        config.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        if (store.state.token) {
            config.headers.common['token'] = store.state.token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);
// 响应拦截
instance.interceptors.response.use(
    response => {
        let { status, data } = response;        
        if (status !== 200) {
            Vue.prototype.$toast({
                content: data,
                type: 'error'
            });
            return Promise.reject(data);
        } else {
            if(data.code !== 1 && !data.success){
                Vue.prototype.$toast({
                    type:'error',
                    content:data.message
                });
            }
            return data;
        }
    },
    error =>  {
        Vue.prototype.$toast({
            content: error,
            type: 'error'
        });
        return Promise.reject(error);
    }
);

export default instance;
