import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/topchannel',
    component: Layout,
    redirect: '/topchannel/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/topchannel/index'),
        name: 'Topchannel',
        meta: { title: '顶级栏目', icon: 'excel' }
      }
    ]
  },
  {
    path: '/doctor',
    component: Layout,
    redirect: '/doctor/create',
    name: 'Doctor',
    meta: {
      title: '专家团队',
      icon: 'peoples'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/doctor/list'),
        name: 'DoctorArticleList',
        meta: { title: '医生列表', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/doctor/create'),
        name: 'DoctorCreateArticle',
        meta: { title: '新建医生', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/doctor/edit'),
        name: 'DoctorEditArticle',
        meta: { title: '编辑医生', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/case',
    component: Layout,
    redirect: '/case/create',
    name: 'Case',
    meta: {
      title: '案例日记',
      icon: 'people'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/case/category'),
        name: 'CaseCategory',
        meta: { title: '案例分类', icon: 'nested' }
      },
      {
        path: 'list',
        component: () => import('@/views/case/list'),
        name: 'CaseArticleList',
        meta: { title: '案例列表', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/case/create'),
        name: 'CaseCreateArticle',
        meta: { title: '新建案例', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/case/edit'),
        name: 'CaseEditArticle',
        meta: { title: '编辑案例', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/create',
    name: 'Project',
    meta: {
      title: '项目中心',
      icon: 'star'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/project/category'),
        name: 'ProjectCategory',
        meta: { title: '项目分类', icon: 'nested' }
      },
      {
        path: 'list',
        component: () => import('@/views/project/list'),
        name: 'ProjectArticleList',
        meta: { title: '文章列表', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/project/create'),
        name: 'ProjectCreateArticle',
        meta: { title: '新建文章', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/project/edit'),
        name: 'ProjectEditArticle',
        meta: { title: '编辑文章', noCache: true },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
