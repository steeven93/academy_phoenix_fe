<script setup>
import { RouterLink, RouterView, useRouter, useRoute} from 'vue-router'
import HeaderMenu from '@/components/sections/Header.vue'


const router = useRouter()
const route = useRoute()
let canIViewMenu = (router.currentRoute.value.name == 'Login Page') ? false : ((router.currentRoute.value.name == 'Register Page') ? false : true)
console.log(canIViewMenu)
</script>

<template>
	<HeaderMenu  />
	<RouterView />
</template>

