import Vue from 'vue';
import VueRouter from 'vue-router';

const NotFound = () => import( /* webpackChunkName: "common" */ '@/views/notFound');
const Login = () => import( /* webpackChunkName: "common" */ '@/views/login');

const ProjectList = () => import( /* webpackChunkName: "project" */ '@/views/project');
const ProjectAdd = () => import( /* webpackChunkName: "project" */ '@/views/project/add');

const Contract = () => import( /* webpackChunkName: "contract" */ '@/views/contract');
const ContractList = () => import( /* webpackChunkName: "contract" */ '@/views/contract/list');
const ContractAdd = () => import( /* webpackChunkName: "contract" */ '@/views/contract/add');
const ContractTopo = () => import( /* webpackChunkName: "contract" */ '@/views/contract/topo');
const ContractEdit = () => import( /* webpackChunkName: "contract" */ '@/views/contract/edit');
const ContractEditr = () => import( /* webpackChunkName: "contract" */ '@/views/contract/editr');

const issueManage = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue');
const IssueList = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/list');
const IssueAdd = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/add');
const Incheck = ()=> import( /* webpackChunkName: "issue" */ '@/views/issue/incheck');

const Interior = () => import( /* webpackChunkName: "interior" */ '@/views/interior');

let routes = [
  {
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
      path: 'add',
      component: ProjectAdd
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
      }, {
        path: 'edit',
        component: ContractEdit
      }, 
      {
        path: 'editr',
        component: ContractEditr
      },  
      {
        path: 'topo',
        component: ContractTopo
      }
    ]
  },
  // 问题管理
  {
    path: '/issue',
    component: issueManage,
    redirect: '/issue/list',
    children: [
      {
        path: 'list',
        component: IssueList
      },
      {
        path: 'add',
        component: IssueAdd
      },
      {
        path: 'incheck',
        component: Incheck
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
  mode: 'history',
  routes: routes
});
