import { createApp } from 'vue'
import { createStore } from 'vuex'

import { AuthService } from './modules/auth-service'
// Create a new store instance.
export const store = createStore({
    modules: {
        auth: AuthService
    }
})
