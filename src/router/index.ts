import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/VHome.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/VProfile.vue'),
    },
  ],
})

export default router
