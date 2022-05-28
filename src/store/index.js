import { auth } from './auth.module';
import {
    createStore,
    Store as VuexStore,
    createLogger
} from 'vuex'

import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export const store = createStore({
    plugins: import.meta.env.VUE_APP_ENVIROMENT === 'dev' ? [createLogger()] : [],
    state,
    mutations,
    actions,
    getters
})

export function useStore() {
    return store;
}
