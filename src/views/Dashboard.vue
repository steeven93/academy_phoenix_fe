<script async setup>
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'
    import { Dialog, DialogTitle, DialogDescription } from '@headlessui/vue'
    import HeaderMenu from '@/components/sections/Header.vue'
    import { store } from '../store/index.js'
    import Cookies from 'js-cookie'
    import ListCustomers from '@/components/sections/ListCustomers.vue'

    const isOpen = ref(false)
    const customerForm = {
        name: '',
        surname: '',
        email: '',
        birthday: '',
    }

    const  createCustomer = () =>
    {
        store.dispatch('customers/createCustomer', customerForm)
    }



</script>
<template>
    <header-menu></header-menu>
    <div class="section">
        <div class="container dashboard">
            <div class="w-1/2 text-center">
                <h2>Create new Customer</h2>
                <div class="card">
                    <div class="group-form-input">
                        <label>Name</label>
                        <input type="text" v-model="customerForm.name" class="input-form-default" placeholder="insert here your name">
                    </div>
                    <div class="group-form-input">
                        <label>Surname</label>
                        <input type="text" v-model="customerForm.surname" class="input-form-default" placeholder="insert here your surname">
                    </div>
                    <div class="group-form-input">
                        <label>Email</label>
                        <input type="email" v-model="customerForm.email" class="input-form-default" placeholder="insert here your email">
                    </div>
                    <div class="group-form-input">
                        <label>Birthday</label>
                        <input type="date" v-model="customerForm.birthday" class="input-form-date" placeholder="insert here your birthday">
                    </div>
                    <button class="btn-create" @click="createCustomer"> Create </button>
                </div>
            </div>
            <div class="w-1/2 text-center">
                <h2>List of customers</h2>
                <suspense>
                    <list-customers></list-customers>
                </suspense>
            </div>
        </div>
        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
            <!-- The backdrop, rendered as a fixed sibling to the panel container -->
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" ></div>

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
    </div>
</template>
