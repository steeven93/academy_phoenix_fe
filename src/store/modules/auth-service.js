import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'
// import { get } from 'http';

const LOGIN = 'api/login'
const REGISTER = 'api/register'
const ADDRESS_CREATE = 'api/v1/address/create'
const INVOICE_CREATE = 'api/v1/invoice_create'
const LOGOUT = 'api/logout'
const CSRF_TOKEN = 'sanctum/csrf-cookie'
const USER_INFO = 'api/user'
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
        axios.get(CSRF_TOKEN).then(() => {
            axios.post(REGISTER, data).then((response) => {
                commit('setSession', response.data)
                if (response.data.success) {
                    Cookies.set('auth', JSON.stringify({ token: response.data.data.token }))
                    router.go("/phase-subscription")
                }
            })
        })
    },

    create_address({ commit }, data) {
        axios.get(CSRF_TOKEN).then((response) => {
            axios.post(ADDRESS_CREATE, data)
        })
    },

    create_invoice({ commit }, data) {
        axios.get(CSRF_TOKEN).then((response) => {
            axios.post(INVOICE_CREATE, data)
        })
    },

    async register_subscription({ commit }, data) {

        const response = await axios.post(INVOICE_CREATE, data)
        return response

    },

    setCookie({ commit }, data) {
        if (Cookies.get('vuex') != undefined) {
            const state = JSON.parse(Cookies.get('vuex'))
            commit('setState', state.auth)
        }
    },
    async getUserInfo({ commit }) {
        const response = await axios.get(USER_INFO)
        return response
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
