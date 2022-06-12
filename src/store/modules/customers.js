import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'
import { store } from '../../store/index.js'

const API_VERSION = import.meta.env.VITE_API_VERSION
const CUSTOMER = API_VERSION + 'customer/'
const CREATE_CUSTOMER = CUSTOMER + 'create/'
const CREATE_CUSTOMER_MATRIX = CUSTOMER + 'create_matrix/'
const CREATE_CUSTOMER_THESIS = CUSTOMER + 'create_thesis/'
const token = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).token : ''


// axios.interceptors.request.use((config) => {
//     config.headers = {
//         Authorization: `Bearer ${token}`
//     }
// })
axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

const state = () => ({
    customers: []
})

const getters = {
    getCustomers: (state) => {
        return state.customers;
    },

    getCustomer: (state, customer_id) => {
        return state.customers.find(customer => customer.id === customer_id)
    }
}

const actions = {
    async customers({ commit }) {
        const response = await axios.get(CUSTOMER)
        commit('setCustomers', response.data.data)
        return response
    },

    createCustomer({ commit }, data) {
        axios.post(CREATE_CUSTOMER, data).then((response) => {
            commit('setCustomers', response.data.data)
        })
    },

    createCustomerMatrix({ commit }, data) {
        axios.post(CREATE_CUSTOMER_MATRIX, data).then((response) => {
            return response.data
        })
    },

    createCustomerThesis({ commit }, data) {
        axios.post(CREATE_CUSTOMER_THESIS, data, config).then((response) => {
            return response.data
        })
    },

    deleteCustomer({ commit }, id_customer) {
        axios.delete(CUSTOMER + id_customer).then((response) => {
            return response.data
        })
    }
}

const mutations = {
    setCustomers: (state, customers) => {
        state.customers = customers
    },

    setCustomer: (state, customer) => {
        state.customers.push(customer)
    }
}

export const Customers = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
