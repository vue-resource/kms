import Vue from 'vue';
import VueRouter from 'vue-router';

const NotFound = () => import( /* webpackChunkName: "common" */ '@/views/notFound');
const Login = () => import( /* webpackChunkName: "common" */ '@/views/login');

const ProjectList = () => import( /* webpackChunkName: "project" */ '@/views/project');
const ProjectAction = () => import( /* webpackChunkName: "project" */ '@/views/project/action');

const Contract = () => import( /* webpackChunkName: "contract" */ '@/views/contract');
const ContractList = () => import( /* webpackChunkName: "contract" */ '@/views/contract/list');
const ContractAdd = () => import( /* webpackChunkName: "contract" */ '@/views/contract/add');
const ContractTopo = () => import( /* webpackChunkName: "contract" */ '@/views/contract/topo');
const ContractEdit = () => import( /* webpackChunkName: "contract" */ '@/views/contract/edit');

const IssueManage = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue');
const IssueList = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/list');
const IssueAction = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/action');
const IssueDetail = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/detail');

const Interior = () => import( /* webpackChunkName: "interior" */ '@/views/interior');

let routes = [
  {
    path: '/',
    redirect: '/project/list'
  },{
    path: '/login',
    component: Login
  }, 
  // 项目管理
  {
    path: '/project/',
    component: {
      render: h => h('router-view', '')
    },
    redirect: '/project/list',
    children: [{
      path: 'list',
      component: ProjectList
    }, {
      path: 'action',
      component: ProjectAction
    }]
  }, 
  // 目标管理
  {
    path: '/contract',
    component: Contract,
    redirect: '/contract/list',
    children: [{
        path: 'list',
        component: ContractList
      }, {
        path: 'add',
        component: ContractAdd
      },{
        path: 'topo',
        component: ContractTopo
      },{
        path: ':id',
        component: ContractEdit
      }
    ]
  },
  // 问题管理
  {
    path: '/issue',
    component: IssueManage,
    redirect: '/issue/list',
    children: [
      {
        path: 'list',
        component: IssueList
      },
      {
        path: 'action',
        component: IssueAction
      },
      {
        path: 'detail',
        component: IssueDetail
      }
      
    ]
  },
  // 分块BOM
  {
    path: '/interior',
    component: Interior
  },
  {
    path: '*',
    component: NotFound
  }
];

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: routes
});
