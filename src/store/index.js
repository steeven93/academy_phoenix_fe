import { createApp } from 'vue';
import { createStore } from 'vuex';
import { AuthService } from './modules/auth-service';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie'

// Create a new store instance.
export const store = createStore({
    modules: {
        auth: AuthService
    },
    plugins: [
        createPersistedState({
            getState: (key) => {
                if (Cookies.get(key) != undefined) {
                    JSON.parse(Cookies.get(key))
                }
            },
            setState: (key, state) => {
                if (Cookies.get(key) != undefined) {
                    Cookies.remove(key)
                }
                Cookies.set(key, JSON.stringify(state), { expires: 3, secure: true })
            }
        })
    ]
})
