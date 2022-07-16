<script>
import { defineComponent, ref, onBeforeMount } from 'vue'
import { store } from '@/store/index.js'
import { mapActions } from 'vuex'
export default defineComponent({
    props:{
        settings_default_label : Object,
    },
    setup(){
        const addressForm = {
            address: '',
            cap: '',
            phone: '',
            state: '',
            province: '',
            user_id: '',
        }
        return {
            addressForm
        }
    },


    methods:{
        ...mapActions(['setSectionInvoice', 'setSectionPlan', 'setSectionSubscribe']),
        create_address(){
            store.dispatch('auth/create_address', this.addressForm)
            this.setSectionInvoice(false)
            this.setSectionPlan(true)
            this.setSectionSubscribe(false)
        }
    }
})
</script>
<template>
    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
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


            <button class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" @click="create_address">
                {{ settings_default_label.next_step }} </button>
        </form>
        <div class="text-center pt-12 pb-12">
            <p>{{ settings_default_label.already_account }} <router-link to="/" class="underline font-semibold">{{
            settings_default_label.login_here }}</router-link>
            </p>
        </div>
    </div>
</template>
