import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/VHome.vue'),
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/views/VNotes.vue'),
    },
  ],
})

export default router
