import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { store } from './store/index.js'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    config.baseURL = import.meta.env.VITE_API_BASE_URL
    config.withCredentials = true
    config.headers = {
        ...config.headers,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    return config
})

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
