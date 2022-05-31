import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'

//127.0.0.1:5000
const URL = 'http://127.0.0.1:8000/'
const API_URL = 'http://127.0.0.1:8000/api/';
const LOGIN = API_URL + 'login'
const REGISTER = API_URL + 'register'
const LOGOUT = API_URL + 'logout'
const CSRF_TOKEN = URL + 'sanctum/csrf-cookie'

axios.defaults.withCredentials = true

// axios.interceptors.request.use((config) => {
//     config.baseURL = 'http://127.0.0.1:8000'
//     config.withCredentials = true

//     return config
// })
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
    }
}

const actions = {
    login({ commit }, data) {
        axios.post(LOGIN, data).then((response) => {
            commit('setSession', response.data)
            if (response.data.success) {
                router.go("/dashboard")
            }
        })
    },

    logout({ commit }) {
        axios.post(LOGIN).then((response) => {
            commit('revokeSession', response.data)
        })
    },

    register({ commit }, data) {
        axios.post(LOGIN, data)
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
    },

    setState(state, payload) {
        state.auth.user = payload.user
        state.auth.isLoggedIn = payload.isLoggedIn
    },

    revokeSession(state, payload) {
        state.logged = false,
            state.user = {}
    }
}

export const AuthService = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
