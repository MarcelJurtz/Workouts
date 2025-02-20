import { createRouter, createWebHistory } from 'vue-router';

// Define your routes
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/WodComponent.vue')
  },
  {
    path: '/wod/:permalink',
    name: 'Permalink',
    component: () => import('@/components/WodComponent.vue')
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;