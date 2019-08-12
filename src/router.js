import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

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
    component: Login,
    meta: {
      title: '登陆'
    }
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
      component: ProjectList,
      meta: {
        title: '项目列表',
        needLogin: true
      }
    }, {
      path: 'action',
      component: ProjectAction,
      meta: {
        title: '项目编辑',
        needLogin: true
      }
    }]
  }, 
  // 目标管理
  {
    path: '/contract',
    component: Contract,
    redirect: '/contract/list',
    children: [{
        path: 'list',
        component: ContractList,
        meta: {
          title: '目标列表',
          needLogin: true
        }
      }, {
        path: 'add',
        component: ContractAdd,
        meta: {
          title: '目标添加',
          needLogin: true
        }
      },{
        path: 'topo',
        component: ContractTopo,
        meta: {
          title: '目标需求关系图',
          needLogin: true
        }
      },{
        path: 'edit',
        component: ContractEdit,
        meta: {
          title: '目标编辑',
          needLogin: true
        }
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
        component: IssueList,
        meta: {
          title: '问题列表',
          needLogin: true
        }
      },
      {
        path: 'action',
        component: IssueAction,
        meta: {
          title: '问题添加/编辑',
          needLogin: true
        }
      },
      {
        path: 'detail',
        component: IssueDetail,
        meta: {
          title: '问题详情',
          needLogin: true
        }
      }
      
    ]
  },
  // 分块BOM
  {
    path: '/interior',
    component: Interior,
    meta: {
      needLogin: true
    }
  },
  {
    path: '*',
    component: NotFound
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
        x: 0, y: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  if (to.meta.needLogin && !store.state.common.token) {
      router.replace('/login');
  } else {
    next();
  }
});

export default router;
