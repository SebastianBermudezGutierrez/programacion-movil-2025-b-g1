import { createRouter, createWebHistory } from '@ionic/vue-router'
import WelcomePage from '@/views/WelcomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import TabsPage from '@/views/TabsPage.vue'
import WeeklyHistoryPage from '@/views/WeeklyHistoryPage.vue'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

// Add this function before the routes
const authGuard = (to: any, from: any, next: any) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    next(); // Allow access if user is authenticated
  } else {
    next('/login'); // Redirect to login if not authenticated
  }
};

const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', component: WelcomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/training' },
      { path: 'training', component: () => import('@/views/TrainingPage.vue'), beforeEnter: authGuard },
      { path: 'daily-log', component: () => import('@/views/DailyLogPage.vue'), beforeEnter: authGuard },
      {
        path: 'exercise/:workoutId',
        component: () => import('@/views/ExercisePage.vue'), beforeEnter: authGuard
      },
      { path: 'weekly-history', component: () => import('@/views/WeeklyHistoryPage.vue'), beforeEnter: authGuard },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
