import { createApp } from 'vue';
import { createStore } from 'vuex';
import { AuthService } from './modules/auth-service';
import { Customers } from './modules/customers';
import { Subscription } from './modules/subscription';
import { ref } from 'vue'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie'

// Create a new store instance.
export const store = createStore({
    state: {
        section_invoice: true,
        section_plan: false,
        section_subscribe: false,
        plan_id: null
    },
    getters: {
        getSectionInvoice(state) {
            return state.section_invoice
        },
        getSectionPlan(state) {
            return state.section_plan
        },
        getSectionSubscribe(state) {
            return state.section_subscribe
        },
        getPlanId(state) {
            return state.plan_id
        }
    },
    mutations: {
        setSectionInvoice(state, value) {
            state.section_invoice = value
        },
        setSectionPlan(state, value) {
            state.section_plan = value
        },
        setSectionSubscribe(state, value) {
            state.section_subscribe = value
        },
        setPlanSubScriptionId(state, value) {
            state.plan_id = value
        }
    },
    actions: {
        setSectionInvoice({ commit }, value) {
            commit('setSectionInvoice', value)
        },
        setSectionPlan({ commit }, value) {
            commit('setSectionPlan', value)
        },
        setSectionSubscribe({ commit }, value) {
            commit('setSectionSubscribe', value)
        },
        setPlanSubScriptionId({ commit }, value) {
            commit('setPlanSubScriptionId', value)
        }
    },
    modules: {
        auth: AuthService,
        customers: Customers,
        subcription: Subscription,
    },
    plugins: [
        // createPersistedState({
        //     getState: (key) => {
        //         if (Cookies.get(key) != undefined) {
        //             JSON.parse(Cookies.get(key))
        //         }
        //     },
        //     setState: (key, state) => {
        //         if (Cookies.get(key) != undefined) {
        //             Cookies.remove(key)
        //         }
        //         Cookies.set(key, JSON.stringify(state), { secure: true })
        //     }
        // })
    ]
})
