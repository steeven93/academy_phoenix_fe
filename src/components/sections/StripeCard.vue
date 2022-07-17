<script>
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { store } from '@/store/index.js'
import router  from '../../router/index.js'
import { mapGetters } from 'vuex'

export default defineComponent({
    name: 'CardOnly',
    props:{
        section_subscribe:Boolean
    },
    components: {
        StripeElements,
        StripeElement,
    },
    async mounted() {
        const response = await store.dispatch('subcription/getPaymentMethodIntent')
        console.log(response)
        this.elementsOptions.clientSecret = response.data.data.client_secret
        // this.elementsOptions.clientSecret = 'seti_1LLwvOKKfq5wF2ToxTWQ4nCm_secret_M455iMfBSYjl6IH6TLFs4v5iYqdQYBr'
    },
    setup() {
        const stripeKey = ref(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
        const instanceOptions = ref({
            // https://stripe.com/docs/js/initializing#init_stripe_js-options
        })
        const elementsOptions = ref({
            // https://stripe.com/docs/js/elements_object/create#stripe_elements-options

        })
        const cardOptions = ref({
            // https://stripe.com/docs/stripe.js#element-options
            value: {
                name:''
            },
        })
        const stripeLoaded = ref(false)
        const card = ref()
        const elms = ref()

        onBeforeMount(() => {
            const stripePromise = loadStripe(stripeKey.value)
            stripePromise.then((response) => {
                stripeLoaded.value = true
            })
        })

        return {
            stripeKey,
            stripeLoaded,
            instanceOptions,
            elementsOptions,
            cardOptions,
            card,
            elms
        }
    },
    computed:{
        ...mapGetters(['getPlanId'])
    },
    methods: {
        addPayment() {
            // Get stripe element
            const cardElement = this.card.stripeElement
            const stripe = this.elms.instance
            const plan_id = this.getPlanId

            stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement
                })
                .then(function (result) {
                    // Handle result.error or result.paymentMethod
                    const payment_method_id = result.paymentMethod.id
                    store.dispatch('subcription/setPaymentMethod', payment_method_id).then((response)   =>  {
                        const payload = {
                            plan_subscription_id: plan_id,
                            payment_method_id: payment_method_id
                        }
                        store.dispatch('subcription/subscribe', payload).then((result)  =>  {
                            router.go("/dashboard")
                        })
                    })
                });
        },
    },
})
</script>

<template>
    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
        <p class="text-center text-3xl">Inserisci i dati della carta.</p>
        <!-- component -->
        <div class="antialiased w-full h-full text-gray-400 font-inter p-10">
            <div class="container px-4 mx-auto bg-slate-100 rounded-lg shadow-md">
                <div class="mx-14 my-20">
                    <StripeElements v-if="stripeLoaded" v-slot="{ elements , instance }" ref="elms"
                        :stripe-key="stripeKey" :instance-options="instanceOptions" :elements-options="elementsOptions">
                        <StripeElement ref="card" :elements="elements" :options="cardOptions" />
                    </StripeElements>
                </div>
            </div>
            <div class="container px-4 mx-auto text-center">
                <button type="button" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                    @click="addPayment">Iscriviti</button>
            </div>
        </div>
    </div>
</template>
