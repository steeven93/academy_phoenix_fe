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
import { mapGetters } from 'vuex';
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
        computed: {
            ...mapGetters({
                customer: 'customers/getSingleCustomer',
                has_download_matrix: 'customers/getHasDownloadMatrix',
                has_download_thesis: 'customers/getHasDownloadThesis'
            })
        },
        async mounted(){
            console.log(router)
            store.dispatch('customers/getCustomer', router.currentRoute.value.params.id)
        },
        methods: {
            setIsOpen(value) {
                this.isOpen = value
            },

            createNote() {
                this.form.customer_id = router.currentRoute.value.params.id
                store.dispatch('customers/createCustomerNote', this.form).then((result) =>  {
                    console.log(result)
                    this.setIsOpen(false)
                })
            },

            delete_note(note_id){
                const data = {
                    note_id: note_id
                }
                store.dispatch('customers/deleteCustomerNote', data)
            },

            downloadExcel(){
                store.dispatch('customers/createCustomerMatrix', router.currentRoute.value.params.id)
            },

            downloadWord(){
                store.dispatch('customers/createCustomerThesis', router.currentRoute.value.params.id)
            }
        },
        data(){
            const open = false
            return {
                open
            }
        },
        setup()
        {
            const isOpen = ref(false)
            const form = {
                title: '',
                content:''
            }
            return {
                isOpen,
                form
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
                <div class="flex flex-row mt-4">
                    <button type="button" @click="downloadExcel" class="btn-download-excel">
                        <svg v-if="has_download_matrix" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Scarica la Matrice
                    </button>
                    <button type="button" @click="downloadWord" class="btn-download-word">
                        <svg v-if="has_download_thesis" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Scarica la Tesi
                    </button>
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
                            <span>{{note.title}}</span>
                            <!-- Use the `open` slot prop to rotate the icon when the panel is open -->
                            <ChevronRightIcon :class='open ? "transform rotate-90" : ""' />
                        </DisclosureButton>
                        <DisclosurePanel class="description-notes">
                            <div class="controls-notes">
                                <button @click="edit_note">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fill-rule="evenodd"
                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button @click="delete_note(note.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            {{note.content}}
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </div>
        </div>
    </div>
    <Dialog :open="isOpen" @close="setIsOpen" class="modal">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="backdrop" aria-hidden="true"></div>

        <!-- Full-screen container to center the panel -->
        <div class="screen_container">
            <!-- The actual dialog panel -->
            <DialogPanel class="card_container">
                <DialogTitle class="modal_title">Create your note</DialogTitle>
                <div class="group-form-input">
                    <label for="">Title</label>
                    <input v-model="form.title" class="input-form-default" type="text"
                        placeholder="insert your title here">
                </div>
                <div class="group-form-input">
                    <label for="">Content</label>
                    <textarea v-model="form.content" class="input-form-default">
                    </textarea>
                </div>
                <div class="button_section">
                    <button class="btn-modal-cancel" @click="setIsOpen(false)">Cancel</button>
                    <button class="btn-modal-create" @click="createNote">Create</button>
                </div>
            </DialogPanel>
        </div>
    </Dialog>
</template>
