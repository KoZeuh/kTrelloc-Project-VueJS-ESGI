<template>
    <section class="content ml-12 transform ease-in-out duration-500 px-2 md:px-5 pb-4 dark:text-white">

      <div class="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div class="w-full lg:w-1/2">
                <img class="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
                <img class="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" />
                <img class="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" />
            </div>
            <div class="w-full lg:w-1/2">
                <h1 class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">{{ $t('errors.error_404.title') }}</h1>
                <p class="py-4 text-base text-gray-800 dark:text-white">{{ $t('errors.error_404.paragraph_1') }}</p>
                <p class="py-2 text-base text-gray-800 dark:text-white">{{ $t('errors.error_404.paragraph_2') }}</p>
                <router-link to="/"><button class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">{{ $t('errors.error_404.backToHome') }}</button></router-link>
            </div>
        </div>
    
    </section>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({name: 'Error_404'});
</script>
  
<style scoped>
</style>
  