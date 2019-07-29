import Vue from 'vue';
import VueRouter from 'vue-router';

const NotFound = () => import( /* webpackChunkName: "common" */ '@/views/notFound');
const Home = () => import( /* webpackChunkName: "common" */ '@/views/home');
const Login = () => import( /* webpackChunkName: "common" */ '@/views/login');

const ProjectList = () => import( /* webpackChunkName: "project" */ '@/views/project');
const ProjectAdd = () => import( /* webpackChunkName: "project" */ '@/views/project/add');

const Contract = () => import( /* webpackChunkName: "contract" */ '@/views/contract');
const Interior = () => import( /* webpackChunkName: "interior" */ '@/views/interior');
const Weight = ()=> import( /* webpackChunkName: "weight" */ '@/views/weight');
const Test = ()=> import( /* webpackChunkName: "weight" */ '@/views/test');
const Alert = ()=> import( /* webpackChunkName: "weight" */ '@/components/alert');

let routes = [{
    path: '/',
    alias: '/home/',
    component: Home
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/project/',
    component: {
      render: h => h('router-view', '')
    },
    redirect: '/project/list',
    children: [{
      path: 'list',
      component: ProjectList
    }, {
      path: 'add',
      component: ProjectAdd
    }]
  }, {
    path: '/contract',
    component: Contract
  },
  {
    path: '/interior',
    component: Interior
  }, {
    path: '/weight',
    component: Weight
  }, {
    path: '/test',
    component: Test
  }, {
  },
  {
    path: '/alert',
    component: Alert
  },
  {
    path: '*',
    component: NotFound
  }
];

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: routes
});
