<script>
import { RouterLink } from "vue-router";
import User from '../models/user';
// import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import logo from '../images/logo.png'
import { store } from '../store/index.js'
import { defineComponent, ref, onBeforeMount } from 'vue'
import RegisterAddress from "../components/sections/RegisterAddress.vue";
import PlansSubScription from "../components/sections/PlansSubScription.vue";
import StripeCard from "../components/sections/StripeCard.vue";

export default defineComponent({
    components: {
        RouterLink,
        User,
        store,
        RegisterAddress,
        PlansSubScription,
        StripeCard
    },

    setup() {
        const registerForm = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        }

        const registerFormLabel = {
            title: 'Registrazione.',
            name: 'Nome',
            email: 'e-mail',
            password: 'password',
            confirm_password: 'conferma Password',
        }

        const settings_default_label = {
            already_account: 'hai già un account ?',
            login_here: 'Accedi qui',
            next_step: 'vai al prossimo passo',
            choose: 'Scegli'
        }
        return {
            registerForm,
            registerFormLabel,
            settings_default_label,
        }
    },
    methods: {
        register ()  {
            store.dispatch('auth/register', this.registerForm)
        }
    },
})
</script>
<template>
    <div class="w-full flex flex-wrap">
        <!-- Register Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                <img src="../images/logo.png" class="p-4" width="150">
            </div>
            <!-- sign Up -->
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">{{ registerFormLabel.title }}</p>
                <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault()">
                    <div class="flex flex-col pt-4">
                        <label for="name" class="text-lg">{{ registerFormLabel.name }}</label>
                        <input type="text" id="name" v-model="registerForm.name" placeholder="John Smith"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">{{ registerFormLabel.email }}</label>
                        <input type="email" id="email" v-model="registerForm.email" placeholder="your@email.com"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">{{ registerFormLabel.password }}</label>
                        <input type="password" id="password" v-model="registerForm.password" placeholder="Password"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="confirm-password" class="text-lg">{{ registerFormLabel.confirm_password }}</label>
                        <input type="password" id="confirm-password" v-model="registerForm.confirm_password"
                            placeholder="Password"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <button class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" @click="register">
                        {{ settings_default_label .next_step}} </button>
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>{{ settings_default_label .already_account}} <router-link to="/" class="underline font-semibold">
                            {{settings_default_label.login_here}}
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"
                alt="Background" />
        </div>
    </div>
</template>
