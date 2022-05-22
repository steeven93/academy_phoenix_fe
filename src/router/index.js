import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CustomerPage from '../views/CustomerPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login Page',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register Page',
      component: RegisterPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/customer-view-:id',
      name: 'Customer View',
      component: CustomerPage
    },
    {
      path: '/profile-page',
      name: 'Profile Page',
      component: ProfilePage
    }
  ]
})

export default router
