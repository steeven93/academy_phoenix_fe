import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { store } from './store/index.js'
import axios from 'axios'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

axios.interceptors.request.use((config) => {
    config.baseURL = import.meta.env.VITE_API_BASE_URL
    config.withCredentials = true
    config.headers = {
        ...config.headers,
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,X-Token-Auth,Authorization',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Methods': '*'
    }
    return config
})
const options = {
    // You can set your default options here
};

const app = createApp(App)

app.use(store)
app.use(router)

app.use(Toast, options);
app.mount('#app')
