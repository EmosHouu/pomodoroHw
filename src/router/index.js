// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', // 首頁
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '漢堡鐘 | 首頁'
    }
  },
  {
    path: '/list', // /分頁
    component: () => import('@/views/ListView.vue'),
    meta: {
      title: '漢堡鐘 | 事項'
    }
  },
  {
    path: '/settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      title: '漢堡鐘 | 鈴聲'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
