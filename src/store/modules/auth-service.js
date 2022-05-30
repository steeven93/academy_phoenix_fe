import axios from 'axios';

//127.0.0.1:5000
const API_URL = 'https://api.accademiaphoenixy.com/api/';
const LOGIN = API_URL + 'login'
const REGISTER = API_URL + 'register'
const LOGOUT = API_URL + 'logout'

const state = () => ({
    user: {},
    isLoggedIn: true,
    token: ''
})

const getters = {
    getSession: (state) => {
        return state;
    }
}

const actions = {
    login({ commit }) {
        axios.post(LOGIN).then((response) => {
            commit('setSession', response.data)
        })
    },

    logout({ commit }) {
        axios.post(LOGIN).then((response) => {
            commit('revokeSession', response.data)
        })
    },

    register({ commit }, data) {
        axios.post(LOGIN, data)
    }


}

const mutations = {
    setSession(state, payload) {
        state.logged = true
        state.token = payload.token
    },

    revokeSession(state, payload) {
        state.logged = false,
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
