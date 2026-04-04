import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('@/views/TestPage.vue'),
    meta: { title: '测试页面' }
  },
  {
    path: '/icon-test',
    name: 'IconTest',
    component: () => import('@/views/IconTest.vue'),
    meta: { title: '图标测试' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/mock-login',
    name: 'MockLogin',
    component: () => import('@/views/auth/MockLogin.vue'),
    meta: { title: '模拟登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { title: '注册', guest: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'pets',
        name: 'PetList',
        component: () => import('@/views/pet/PetList.vue'),
        meta: { title: '我的宠物', requiresAuth: true }
      },
      {
        path: 'pets/create',
        name: 'PetCreate',
        component: () => import('@/views/pet/PetCreate.vue'),
        meta: { title: '添加宠物', requiresAuth: true }
      },
      {
        path: 'pets/:id',
        name: 'PetDetail',
        component: () => import('@/views/pet/PetDetail.vue'),
        meta: { title: '宠物详情' }
      },
      {
        path: 'pets/:id/edit',
        name: 'PetEdit',
        component: () => import('@/views/pet/PetEdit.vue'),
        meta: { title: '编辑宠物', requiresAuth: true }
      },
      {
        path: 'health/:petId',
        name: 'HealthOverview',
        component: () => import('@/views/health/HealthOverview.vue'),
        meta: { title: '健康管理', requiresAuth: true }
      },
      {
        path: 'reminders',
        name: 'ReminderList',
        component: () => import('@/views/reminder/ReminderList.vue'),
        meta: { title: '提醒', requiresAuth: true }
      },
      {
        path: 'social',
        name: 'SocialFeed',
        component: () => import('@/views/social/Feed.vue'),
        meta: { title: '广场' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/social/Profile.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || '宠物管理系统'} - 宠物管理系统`

  // 检查认证
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户不能访问登录/注册页
  if (to.meta.guest && token) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
