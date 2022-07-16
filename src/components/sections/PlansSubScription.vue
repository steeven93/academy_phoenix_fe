<script>
import { defineComponent, ref, onBeforeMount } from 'vue'
import { store } from '@/store/index.js'
import { mapActions } from 'vuex'

export default defineComponent({
    components:{

    },
    props:{
        settings_default_label:Object,
        section_plan:Boolean,
        section_subscribe:Boolean
    },
    async mounted() {
        const response = await store.dispatch('subcription/getPlans')
        console.log(response.data.data)
        this.plans_subscription = response.data.data

    },
    data(){
        return {
            plans_subscription: [],
        }
    },
    methods:{
        ...mapActions(['setSectionInvoice', 'setSectionPlan', 'setSectionSubscribe', 'setPlanSubScriptionId']),
        choose(plan_id){

            this.setSectionInvoice(false)
            this.setSectionPlan(false)
            this.setSectionSubscribe(true)

            this.setPlanSubScriptionId(plan_id)
        }
    }
})
</script>
<template>
    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
        <p class="text-center text-3xl">Tipo di Abbonamenti.</p>

        <!-- component -->
        <div class="antialiased w-full h-full text-gray-400 font-inter p-10">
            <div class="container px-4 mx-auto">
                <div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-evenly gap-10 p-10">
                        <div v-for="plan in plans_subscription" :key="plan.id" id="plan" class="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in">
                            <div id="title" class="w-full py-5 border-b">
                                <h2 class="font-bold text-3xl text-black">{{plan.name}}</h2>
                                <h3 class="font-normal text-gray-900 text-xl mt-2">
                                    € {{plan.price}}
                                </h3>
                            </div>
                            <div id="content" class="">
                                <div id="icon" class="my-5">
                                    <p class="text-gray-500 text-sm pt-2">
                                        {{  plan.description }}
                                    </p>
                                </div>
                                <div id="contain" class="leading-8 mb-10 text-lg font-light">
                                    <div id="choose" class="w-full mt-10 px-6">
                                        <button type="button" @click="choose(plan.id)" class="w-full block bg-black font-medium text-xl py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-gray-800 text-white">
                                            {{ settings_default_label.choose }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
