import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'
import { store } from '../../store/index.js'

const API_VERSION = import.meta.env.VITE_API_VERSION
const CUSTOMER = API_VERSION + 'customer'
const EDIT_OR_DELETE_CUSTOMER = API_VERSION + 'customer/{customer}'
const CREATE_CUSTOMER = CUSTOMER + '/create'
const CREATE_CUSTOMER_NOTE = API_VERSION + 'note'
const EDIT_OR_DELETE_CUSTOMER_NOTE = API_VERSION + 'note/{note}'
const CREATE_CUSTOMER_MATRIX = CUSTOMER + '/create_matrix'
const CREATE_CUSTOMER_THESIS = CUSTOMER + '/create_thesis'
const token = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).token : ''

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
    },
}

const actions = {
    async customers({ commit }) {
        const response = await axios.get(CUSTOMER)
        commit('setCustomers', response.data.data)
        return response
    },

    async getCustomer({ commit }, id_customer) {
        const response = await axios.get(CUSTOMER + '/' + id_customer)
        return response
    },

    createCustomer({ commit }, data) {
        axios.post(CREATE_CUSTOMER, data).then((response) => {
            commit('setCustomer', response.data.data)
        })
    },

    createCustomerMatrix({ commit }, data) {
        axios.post(CREATE_CUSTOMER_MATRIX, data).then((response) => {
            return response.data
        })
    },
    createCustomerNote({ commit }, data) {
        const url = CREATE_CUSTOMER_NOTE.replace('{customer}', data.customer_id)
        axios.post(url, data).then((response) => {
            return response.data
        })
    },

    createCustomerThesis({ commit }, data) {
        axios.post(CREATE_CUSTOMER_THESIS, data, config).then((response) => {
            return response.data
        })
    },

    deleteCustomer({ commit }, customer_id) {
        const url = EDIT_OR_DELETE_CUSTOMER.replace('{customer}', customer_id)
        axios.delete(url).then((response) => {
            return response.data
        })
    },

    deleteCustomerNote({ commit }, data) {
        const url = EDIT_OR_DELETE_CUSTOMER_NOTE.replace('{note}', data.note_id)
        axios.delete(url, data).then((response) => {
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
    },
}

export const Customers = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
