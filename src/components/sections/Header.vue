<script setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  UserCircleIcon,
  DocumentTextIcon,
  CreditCardIcon
} from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { useRoute } from 'vue-router';
import { store } from '@/store/index.js'
import logo from '../../images/logo.png'

const logout = () =>  {
  store.dispatch('auth/logout')
}

const profile_menu = [
  {
    name: 'Profile',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: 'profile-page#profile',
    icon: UserCircleIcon,
  },
  {
    name: 'Invoice',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: 'profile-page#invoice',
    icon: DocumentTextIcon,
  },
  {
    name: 'Your Plans',
    description: "Connect with third-party tools that you're already using.",
    href: 'profile-page#subscription',
    icon: CreditCardIcon,
  }
]

const logout_menu = {
  name: 'Log out',
  description: "",
  href: '#',
  icon: CreditCardIcon,
  action: logout
}

const route = useRoute()

</script>

<template>

  <Popover class="nav">
    <div class="nav-bar">
      <div class="nav-bar-container">
        <div class="logo-container">
          <router-link to="/">
            <span class="sr-only">Phoenix</span>
            <img class="logo" :src="logo" alt="" />
          </router-link>
        </div>

        <div class="menu-mobile">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="nav-bar-menu">
          <router-link class="text-base font-medium text-gray-500 hover:text-gray-900" to="/dashboard">Dashboard
          </router-link>
        </PopoverGroup>
        <div class="nav-bar-profile-container">
          <div class="flex space-x-2">
            <PopoverGroup as="nav" class="nav-bar-menu">
              <Popover class="relative" v-slot="{ open }">
                <PopoverButton
                  :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                  <div class="relative w-12 h-12">
                    <img class="rounded-full border border-gray-100 shadow-sm"
                      src="https://randomuser.me/api/portraits/women/81.jpg" alt="user image" />
                    <div
                      class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2">
                    </div>
                  </div>
                  <ChevronDownIcon
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                    aria-hidden="true" />
                </PopoverButton>
                <transition enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel
                    class="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:-left-15 lg:-translate-x-full">
                    <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <router-link v-for="item in profile_menu" :key="item.name" :to="item.href"
                          class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                          <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">
                              {{ item.name }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                              {{ item.description }}
                            </p>
                          </div>
                        </router-link>
                        <button class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50" @click="logout_menu.action">
                          <component :is="logout_menu.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600"
                            aria-hidden="true" />
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">
                              {{ logout_menu.name }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                              {{ logout_menu.description }}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
            </PopoverGroup>
          </div>
        </div>
      </div>
    </div>

    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow" />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <a v-for="item in profile_menu" :key="item.name" :href="item.href"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ item.name }}
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
