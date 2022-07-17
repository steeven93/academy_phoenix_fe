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


router.beforeEach((to, from, next) => {

  const isLogged = store.getters['auth/isLogged']
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!isLogged) {
      next({ name: 'Login' })
    } else {
      store.dispatch('auth/getUserInfo').then((result) => {
        console.log(result.data)
        if (!result.data.has_subscription) {
          next({ path: '/phase-subscription' })
        }
        else if (result.data.has_subscription && (to.matched.some(record => (record.name === 'Phase Subscription')))) {
          console.log('dovrei andare a dashborad')
          next({ name: 'Dashboard' }) // go to wherever I'm going
        }
        else if (result.data.has_subscription) {
          console.log('dovrei andare dovuneque')
          next()
        }
      }).catch((err) => {
        console.log(err)
        if ((err.response.status == 401) && err.response.data.message == 'Unauthenticated.') {
          Cookies.remove('auth')
          next()
        }
      })
    }
  } else if (to.matched.some(record => (record.name === 'Login') || (record.name === 'Register'))) {
    if (isLogged) {
      next({ name: 'Dashboard' })
    } else {
      next() // go to wherever I'm going
    }
  }
  else if (to.matched.some(record => (record.name === 'Phase Subscription'))) {
    if (isLogged) {
      next({ name: 'Dashboard' })
    } else {
      next() // go to wherever I'm going
    }
  }
  else {
    next()
  }
})

export default router
