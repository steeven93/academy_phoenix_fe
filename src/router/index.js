import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CustomerPage from '../views/CustomerPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import PhasesSubscription from '../views/PhasesSubscription.vue'
import { store } from '../store/index.js'
import Cookies from 'js-cookie'

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
      path: '/phase-subscription',
      name: 'Phase Subscription',
      component: PhasesSubscription,
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


router.beforeEach(async (to, from, next) => {

  let is_logged = store.getters['auth/isLogged']
  const auth_require = to.matched.some(record => record.meta.requiresAuth)
  let has_subscription = false
  const trySwitch = (auth_require, has_subscription, is_logged, to) => {
    switch (to.name) {
      case 'Phase Subscription':
        if (is_logged && has_subscription) {
          return { name: 'Dashboard' }
        }
        break;
      case 'Login':
      case 'Register':
        if (is_logged) {
          return { name: 'Dashboard' }
        }
        break;
      default:
        if (!is_logged && auth_require) {
          return { name: 'Login' }
        }
        else if (is_logged && !has_subscription && auth_require) {
          return { name: 'Phase Subscription' }
        }
        else if (is_logged && auth_require && has_subscription) {
          return
        }
        else if (!auth_require) {
          return
        }
        break;
    }
  }

  try {
    if (is_logged) {
      const response = await store.dispatch('auth/getUserInfo')
      has_subscription = response.data.has_subscription
    }
    next(trySwitch(auth_require, has_subscription, is_logged, to))
  } catch (error) {
    console.log(error)
    if ((error.response.status == 401) && err.response.data.message == 'Unauthenticated.') {
      is_logged = false
      Cookies.remove('auth')
      next(trySwitch(auth_require, has_subscription, is_logged, to))
    }
  }
})

export default router
