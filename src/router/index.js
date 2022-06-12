import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CustomerPage from '../views/CustomerPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import { store } from '../store/index.js'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customer-view-:id',
      name: 'Customer View',
      component: CustomerPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile-page',
      name: 'Profile Page',
      component: ProfilePage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})


router.beforeEach((to, from, next) => {

  const isLogged = store.getters['auth/isLogged']
  console.log(isLogged)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLogged) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else if (to.matched.some(record => (record.name === 'Login') || (record.name === 'Register'))) {
    if (isLogged) {
      next({ name: 'Dashboard' })
    } else {
      next() // go to wherever I'm going
    }
  }
  else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
