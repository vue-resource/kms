import Vue from 'vue';
import VueRouter from 'vue-router';

const Home =  () => import(/* webpackChunkName: "home" */  '@/views/home');

const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/notFound' );



let routes = [
    {
        path: '/',
        alias: '/home/',
        component: Home
    }, {
        path: '*',
        component: NotFound
    }
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: routes
});

