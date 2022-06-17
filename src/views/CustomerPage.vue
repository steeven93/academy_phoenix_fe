<script>
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from '@headlessui/vue'
    import { ChevronRightIcon } from '@heroicons/vue/solid'
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue'
    import {
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
    } from '@headlessui/vue'
    import HeaderMenu from '@/components/sections/Header.vue'
    import { store } from '@/store/index.js'
    import router  from '@/router/index.js'
    export default{
        name:'CustomerPage',
        components:{
            HeaderMenu,
            Dialog,
            DialogTitle,
            DialogPanel,
            DialogDescription,
            ChevronRightIcon,
            Disclosure,
            DisclosureButton,
            DisclosurePanel,
            RouterLink
        },
        async mounted(){
            console.log(router)
            const response = await store.dispatch('customers/getCustomer', router.currentRoute.value.params.id)
            this.customer = response.data.data
        },
        methods: {
            setIsOpen(value) {
                this.isOpen = value
            },

            createNote() {

            }
        },
        data(){
            const open = false
            return {
                customer: [],
                open
            }
        },
        setup()
        {
            const isOpen = ref(false)
            return {
                isOpen
            }
        }
    }
</script>
<template>
    <header-menu></header-menu>
    <div class="section">
        <div class="container">
            <div class="card">
                <div class="banner-profile">
                    <div class="immage-customer">
                        <img src="https://picsum.photos/600/600?random=2">
                        <div class="profile-details">
                            <p class="anagraphic">{{ customer.name }} {{ customer.surname }}</p>
                            <p class="birthday">{{ customer.birthday }}</p>
                        </div>
                    </div>
                </div>
                <div class="notes">
                    <div class="notes-header">
                        <h1>Your Notes</h1>
                        <button class="add-note" @click="setIsOpen(true)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <Disclosure v-for="note in customer.notes" v-bind:key="note.id" v-slot="open">
                        <DisclosureButton class="fisarmonic-notes py-2">
                            <span>Is team pricing available?</span>
                            <!-- Use the `open` slot prop to rotate the icon when the panel is open -->
                            <ChevronRightIcon :class='open ? "transform rotate-90" : ""' />
                        </DisclosureButton>
                        <DisclosurePanel class="description-notes">
                            <div class="controls-notes">
                                <router-link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fill-rule="evenodd"
                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </router-link>
                                <router-link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </router-link>
                            </div>
                            ciao
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </div>
        </div>
    </div>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-sm rounded bg-white p-2">
                <DialogTitle class="modal_title">Create your note</DialogTitle>
                <input class="input-form-default" type="text" name="title" id="title" />
                <textarea class="input-form-default">

                </textarea>
                <button class="btn-create" @click="createNote">Create</button>
                <button @click="setIsOpen(false)">Cancel</button>
            </DialogPanel>
        </div>
    </Dialog>
</template>
