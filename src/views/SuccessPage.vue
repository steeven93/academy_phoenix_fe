<template>
    <div>
        you will be redirect
    </div>
</template>
<script>
import { store } from '../store/index.js'
import { router } from '../router/index.js'
export default {
    async mounted() {
        store.dispatch('auth/create_invoice')
        const form = {
            plan_subscription_id: '',

        }
        const response = await store.dispatch('auth/register_subscription')
        if(response.data.success)
        {
            router.go('/')
        }
    },
    data() {

    }
}
</script>
