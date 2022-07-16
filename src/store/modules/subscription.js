import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'
import { store } from '../../store/index.js'

const API_VERSION = import.meta.env.VITE_API_VERSION
const SUBSCRIPTION = API_VERSION + 'subscription/'
const GET_PLANS = API_VERSION + 'plan_subscription'
const GET_METHOD_PAYMENT_INTENT = API_VERSION + 'payment_method/intent'
const SET_PAYMENT = API_VERSION + 'payment_method/set'
const SUBSCRIBE = API_VERSION + 'user/signup/plan_subscription'
const token = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).token : ''
axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

const state = () => ({
    subscription: [],
    client_secret: [],
    payment_method_id: '',
    plans: []
})

const getters = {}

const actions = {
    async getPlans({ commit }) {
        const response = await axios.get(GET_PLANS)
        commit('setPlans', response.data.data)
        return response
    },

    async getPaymentMethodIntent({ commit }) {
        const response = await axios.get(GET_METHOD_PAYMENT_INTENT)
        commit('setClientSecret', response.data.data.client_secret)
        return response
    },
    async setPaymentMethod({ commit }, paymentMethod) {
        const payment_method = { payment_method_id: paymentMethod }
        const response = await axios.post(SET_PAYMENT, payment_method)
        return response
    },
    async subscribe({ commit }, data) {
        const response = await axios.post(SUBSCRIBE, data)
        return response
    }
}

const mutations = {
    setPlans: (state, plans) => {
        state.plans = plans
    },
    setClientSecret: (state, client) => {
        state.client_secret = client
    }
}

export const Subscription = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
