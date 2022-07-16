<script>
    import { store } from '../../store/index.js'
    import { ref } from 'vue'
    import { Dialog, DialogTitle, DialogDescription } from '@headlessui/vue'
import { mapGetters } from 'vuex'
    export default {
        name:'ListCustomers',
        components: {
            Dialog,
            DialogTitle,
            DialogDescription,
        },

        methods: {
            deleteCustomer(customer_id){
                store.dispatch('customers/deleteCustomer', customer_id).then((response)  =>  {
                    return response.data
                })
            },

            getUrlCustomer(id_customer) {
                const base_url = 'customer-view-'
                return base_url + id_customer
            },

            setIsOpen(value) {
                this.isOpen = value
            }
        },
        async mounted(){
            store.dispatch('customers/customers')
        },

        data(){
            const isOpen = ref(false)
            return {
                isOpen
            }
        },
        computed: {
            ...mapGetters({getCustomers: 'customers/getCustomers'})
        }
    }
</script>

<template>
    <div class="card">
        <table>
            <thead>
                <th>#ID</th>
                <th>Name</th>
                <th class="table-action-head">Actions</th>
            </thead>
            <tbody>
                <tr v-for="customer in getCustomers" :key="customer.id">
                    <td>{{customer.id}}</td>
                    <td>{{ customer.name }}</td>
                    <td class="table-action">
                        <router-link :to="getUrlCustomer(customer.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="view-customer h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </router-link>
                        <button @click="setIsOpen(true)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="edit-customer h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button @click="deleteCustomer(customer.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="delete-customer h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-sm rounded bg-white">
                <DialogTitle>Complete your order</DialogTitle>

                <!-- ... -->
                <button @click="setIsOpen(false)">Cancel</button>
            </DialogPanel>
        </div>
    </Dialog>
</template>
