<script setup>
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue'
  import { ChevronRightIcon } from '@heroicons/vue/solid'
  const open = true
</script>
<template>
    <div class="section">
        <div class="container">
            <div class="card">
                <div class="banner-profile">
                    <div class="immage-customer">
                        <img src="https://picsum.photos/600/600?random=2">
                        <div class="profile-details">
                            <p class="anagraphic">Example Name</p>
                            <p class="birthday">31/10/1993</p>
                        </div>
                    </div>
                </div>
                <div class="notes">
                    <h1>Your Notes</h1>
                        <Disclosure v-slot="{ open }">
                            <DisclosureButton class="fisarmonic-notes py-2">
                                <span>Is team pricing available?</span>
                                <!-- Use the `open` slot prop to rotate the icon when the panel is open -->
                                <ChevronRightIcon :class='open ? "transform rotate-90" : ""' />
                            </DisclosureButton>
                            <DisclosurePanel class="description-notes">
                                ciao
                            </DisclosurePanel>
                        </Disclosure>
                        <Disclosure v-slot="{ open }">
                            <DisclosureButton class="fisarmonic-notes py-2">
                                <span>Is team pricing available?</span>
                                <!-- Use the `open` slot prop to rotate the icon when the panel is open -->
                                <ChevronRightIcon :class='open ? "transform rotate-90" : ""' />
                            </DisclosureButton>
                            <DisclosurePanel class="description-notes">
                                ciao
                            </DisclosurePanel>
                        </Disclosure>
                        <Disclosure v-slot="{ open }">
                            <DisclosureButton class="fisarmonic-notes py-2">
                                <span>Is team pricing available?</span>
                                <!-- Use the `open` slot prop to rotate the icon when the panel is open -->
                                <ChevronRightIcon :class='open ? "transform rotate-90" : ""' />
                            </DisclosureButton>
                            <DisclosurePanel class="description-notes">
                                ciao
                            </DisclosurePanel>
                        </Disclosure>
                </div>
            </div>
        </div>
    </div>
</template>
