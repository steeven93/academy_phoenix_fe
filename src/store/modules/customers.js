import Cookies from 'js-cookie'
import axios from 'axios';
import router from '../../router/index.js'
import { store } from '../../store/index.js'
import { saveAs } from 'file-saver';

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
    customers: [],
    customer: {},
    has_download_matrix: false,
    has_download_thesis: false,
})

const getters = {
    getCustomers: (state) => {
        return state.customers;
    },

    getCustomer: (state, customer_id) => {
        return state.customers.find(customer => customer.id === customer_id)
    },

    getSingleCustomer: (state) => {
        return state.customer
    },

    getHasDownloadMatrix: (state) => {
        return state.has_download_matrix
    },

    getHasDownloadThesis: (state) => {
        return state.has_download_thesis
    }
}

const actions = {
    async customers({ commit }) {
        const response = await axios.get(CUSTOMER)
        commit('setCustomers', response.data.data)
        return response
    },

    async getCustomer({ commit }, id_customer) {
        const response = await axios.get(CUSTOMER + '/' + id_customer)
        commit('setSingleCustomer', response.data.data)
        return response
    },

    createCustomer({ commit }, data) {
        axios.post(CREATE_CUSTOMER, data).then((response) => {
            commit('setCustomer', response.data.data)
        })
    },

    createCustomerMatrix({ commit }, customer_id) {
        commit('setDownloadMatrix', true)
        axios.get(CREATE_CUSTOMER_MATRIX + '/' + customer_id).then((response) => {
            const s2ab = (s) => {
                let buf = new ArrayBuffer(s.length);
                let view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            const file_name = response.data.data.file_name
            const file_stream = response.data.data.file_stream
            const type = { type: '' }
            const blob = new Blob([s2ab(atob(file_stream))], type)
            saveAs(blob, file_name)
            commit('setDownloadMatrix', false)
        })
    },
    createCustomerNote({ commit }, data) {
        const url = CREATE_CUSTOMER_NOTE.replace('{customer}', data.customer_id)
        axios.post(url, data).then((response) => {
            commit('SetSingleCustomerNote', response.data.data)
        })
    },

    createCustomerThesis({ commit }, customer_id) {
        commit('setDownloadThesis', true)
        axios.get(CREATE_CUSTOMER_THESIS + '/' + customer_id).then((response) => {
            const s2ab = (s) => {
                let buf = new ArrayBuffer(s.length);
                let view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            const file_name = response.data.data.file_name
            const file_stream = response.data.data.file_stream
            const type = { type: '' }
            const blob = new Blob([s2ab(atob(file_stream))], type)
            saveAs(blob, file_name)
            commit('setDownloadThesis', false)
        })
    },

    deleteCustomer({ commit }, customer_id) {
        const url = EDIT_OR_DELETE_CUSTOMER.replace('{customer}', customer_id)
        axios.delete(url).then((response) => {
            commit('removeCustomerDeleted', customer_id)
        })
    },

    deleteCustomerNote({ commit }, data) {
        const url = EDIT_OR_DELETE_CUSTOMER_NOTE.replace('{note}', data.note_id)
        axios.delete(url, data).then((response) => {
            commit('removeSingleCustomerNote', data.note_id)
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

    setSingleCustomer: (state, customer) => {
        state.customer = customer
    },

    SetSingleCustomerNote: (state, note) => {
        state.customer.notes.push(note)
    },

    setDownloadMatrix: (state, value) => {
        state.has_download_matrix = value
    },

    setDownloadThesis: (state, value) => {
        state.has_download_thesis = value
    },

    removeSingleCustomerNote: (state, id) => {
        state.customer.notes = state.customer.notes.filter((note) => {
            return note.id != id
        })
    },

    removeCustomerDeleted: (state, id) => {
        state.customers = state.customers.filter((customer) => {
            return customer.id != id
        })
    }
}

export const Customers = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
