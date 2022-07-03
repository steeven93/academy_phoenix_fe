<script>
import { RouterLink } from "vue-router";
import User from '../models/user';
// import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import {loadStripe} from "@stripe/stripe-js"
import logo from '../images/logo.png'
import { store } from '../store/index.js'
import { StripeCheckout } from '@vue-stripe/vue-stripe';


export default {
    components: {
        RouterLink,
        User,
        logo,
        store,
        StripeCheckout,
        loadStripe
    },
    data() {
        this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        let section_signup = true;
        let section_invoice = false;
        let section_plan = false;
        return {
            loading: false,
            lineItems: [
                {
                    price: 'price_1LEfurKKfq5wF2ToAHjyTpmu', // The id of the recurring price you created in your Stripe dashboard
                    quantity: 1,
                }
            ],
            successURL: 'http://localhost:300/success   ',
            cancelURL: 'http://localhost:300/',
            section_signup,
            section_invoice,
            section_plan,
        };
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
            next_step: 'vai al prossimo passo'
        }

        const addressForm = {
            address: '',
            cap: '',
            phone: '',
            state: '',
            province: '',
            user_id: '',
        }

        return {
            registerForm,
            registerFormLabel,
            settings_default_label,
            addressForm
        }
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
        register ()  {
            store.dispatch('auth/register', this.registerForm)
            this.section_signup = false;
            this.section_invoice = true;
        },
        create_address ()  {
            store.dispatch('auth/create_address', this.addressForm)
            this.section_invoice = false;
            this.section_plan = true;
        }
    },
}
</script>
<template>
    <div class="w-full flex flex-wrap">
        <!-- Register Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                <img :src="logo" class="p-4" width="150">
            </div>
            <!-- sign Up -->
            <div v-if="section_signup"
                class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
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

            <!-- Invoice address -->
            <div v-if="section_invoice"
                class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Insirisci il tuo indirizzo</p>
                <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault()">
                    <div class="flex flex-col pt-4">
                        <label for="address" class="text-lg">Via</label>
                        <input type="text" id="address" v-model="addressForm.address" placeholder="via ..."
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="cap" class="text-lg">Cap</label>
                        <input type="number" id="number" v-model="addressForm.cap"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="flex flex-col pt-4">
                        <label for="state" class="text-lg">Città</label>
                        <input type="text" id="confirm-password" v-model="addressForm.state"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="pronvince" class="text-lg">Provincia</label>
                        <input type="text" id="province" v-model="addressForm.province"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="phone" class="text-lg">Phone</label>
                        <input type="number" id="phone" v-model="addressForm.phone"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>


                    <button class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                        @click="create_address">
                        {{ settings_default_label.next_step}} </button>
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Already have an account? <router-link to="/" class="underline font-semibold">Log in here.
                        </router-link>
                    </p>
                </div>
            </div>

            <!-- Plan Subscription -->
            <div v-if="section_plan"
                class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Abbonamenti.</p>

                <div class="text-center pt-12 pb-12">
                    <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems"
                        :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v">
                    </stripe-checkout>
                    <button @click="submit">Subscribe!</button>
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
