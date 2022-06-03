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
        const cookieState = (Cookies.get('vuex') != undefined) ? JSON.parse(Cookies.get('vuex')) : null

        if (cookieState != undefined) {
            return cookieState.auth.isLoggedIn
        }
        return state.isLoggedIn
    },

    getToken: (state) => {
        const cookie = (Cookies.get('vuex') != undefined) ? JSON.parse(Cookies.get('vuex')) : null

        if (cookie != undefined) {
            return cookie.auth.token
        }
        return state.token
    },

}

const actions = {
    login({ commit }, data) {
        axios.get(CSRF_TOKEN).then((response) => {
            axios.post(LOGIN, data).then((response) => {
                commit('setSession', response.data)
                if (response.data.success) {
                    router.go("/dashboard")
                }
            })
        })
    },

    logout({ commit }) {
        axios.post(LOGIN).then((response) => {
            commit('revokeSession', response.data)
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
