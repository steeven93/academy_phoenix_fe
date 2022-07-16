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
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
    components: {
        RouterLink,
        User,
        logo,
        store,
        RegisterAddress,
        PlansSubScription,
        StripeCard
    },
    setup() {
        const settings_default_label = {
            already_account: 'hai già un account ?',
            login_here: 'Accedi qui',
            next_step: 'vai al prossimo passo',
            choose: 'Scegli'
        }

        return {
            settings_default_label,
        }
    },
    computed: {
        ...mapGetters(['getSectionInvoice', 'getSectionPlan', 'getSectionSubscribe']),
    },
})
</script>
<template>
    <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
            <!-- Invoice address -->
            <register-address v-show="getSectionInvoice" :settings_default_label="settings_default_label">
            </register-address>


            <!-- Plan Subscription -->
            <plans-sub-scription v-show="getSectionPlan" :settings_default_label="settings_default_label">

            </plans-sub-scription>

            <!-- Stripe Card -->
            <stripe-card v-if="getSectionSubscribe">

            </stripe-card>
        </div>
        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"
                alt="Background" />
        </div>
    </div>
</template>
