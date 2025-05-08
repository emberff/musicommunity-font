import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/playlists',
      name: 'PlaylistList',
      component: () => import('../views/PlaylistList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/playlist/:id',
      name: 'PlaylistDetail',
      component: () => import('../views/PlaylistDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/discover',
      name: 'DiscoverMusic',
      component: () => import('../views/DiscoverMusic.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/song/:id',
      name: 'SongDetail',
      component: () => import('../views/SongDetail.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router