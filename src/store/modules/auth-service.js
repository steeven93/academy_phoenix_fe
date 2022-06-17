import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'

const LOGIN = 'api/login'
const REGISTER = 'api/register'
const LOGOUT = 'api/logout'
const CSRF_TOKEN = 'sanctum/csrf-cookie'

// axios.defaults.withCredentials = true


const state = () => ({
    user: {},
    isLoggedIn: false
    // token: ''
})

const getters = {
    getSession: (state) => {
        return state;
    },

    isLogged: (state) => {
        const cookie = (Cookies.get('auth') != undefined) ? JSON.parse(Cookies.get('auth')) : null

        if (cookie != undefined) {
            return cookie.token != undefined
        }

        return false
    },

    getToken: (state) => {
        const cookie = (Cookies.get('auth') != undefined) ? JSON.parse(Cookies.get('auth')) : null
        console.log(cookie)
        if (cookie != undefined) {
            return cookie.token
        }

        return state.token
    },

}

const actions = {
    login({ commit }, data) {
        axios.get(CSRF_TOKEN).then((response) => {
            axios.post(LOGIN, data).then((response) => {
                commit('setSession', response.data)

                Cookies.set('auth', JSON.stringify({ token: response.data.data.token }))

                if (response.data.success) {
                    router.go("/dashboard")
                }
            })
        })
    },

    logout({ commit }) {
        axios.post(LOGOUT).then((response) => {
            commit('revokeSession', response.data)
            Cookies.remove('auth')
            if (response.data.success) {
                router.go("/dashboard")
            }
        })
    },

    register({ commit }, data) {
        axios.get(CSRF_TOKEN).then((response) => {
            axios.post(REGISTER, data)
        })
        commit('setSession', response.data)
        if (response.data.success) {
            router.go("/dashboard")
        }
    },

    setCookie({ commit }, data) {
        if (Cookies.get('vuex') != undefined) {
            const state = JSON.parse(Cookies.get('vuex'))
            commit('setState', state.auth)
        }
    }
}

const mutations = {

    setSession(state, payload) {
        state.isLoggedIn = true
        state.user = payload.data
        state.token = payload.data.token
    },

    setState(state, payload) {
        state.user = payload.user
        state.isLoggedIn = payload.isLoggedIn
        state.token = payload.token
    },

    revokeSession(state, payload) {
        state.logged = false
        state.user = {}
        state.token = ''
    }
}

export const AuthService = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
