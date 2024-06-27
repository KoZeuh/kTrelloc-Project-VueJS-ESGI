<template>
    <div class ="content ml-12 transform ease-in-out duration-500 px-2 md:px-5 pb-4 ">
        <div class="mx-auto mt-20 px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div class="flex flex-col items-center justify-between lg:flex-row">
                <div class="lg:max-w-lg lg:pr-5">
                    <div class="max-w-xl">
                        <h2 class="mb-6 max-w-lg text-3xl leading-snug tracking-tight sm:text-5xl sm:leading-snug light:text-blue-600 dark:text-white">
                            <span class="my-1 inline-block font-serif font-bold">{{ $t('home.title') }}</span>
                        </h2>

                        <p class="text-base light:text-blue-600 dark:text-white">{{ $t('home.subtitle') }}</p>
                        <div class="mt-8 sm:flex space-y-3 sm:space-y-0 sm:space-x-3">
                            <div class="relative overflow-hidden rounded-xl border-4 border-blue-600 bg-white shadow">
                                <div class="py-10 px-6">
                                    <div class="flex items-center">
                                        <h3 class="relative ml-2 inline-block text-4xl font-bold leading-none">328</h3>
                                        <span class="ml-3 text-base font-medium capitalize">{{ $t('home.firstCard.title') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="relative overflow-hidden rounded-xl border-4 border-blue-600 bg-white shadow">
                                <div class="py-10 px-6">
                                    <div class="flex items-center">
                                        <h3 class="relative ml-2 inline-block text-4xl font-bold leading-none">16</h3>
                                        <span class="ml-3 text-base font-medium capitalize">{{ $t('home.secondCard.title') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative text-blue-600 lg:ml-32 lg:w-1/2 hidden lg:block">
                    <div class="border-b-8 border-b-blue-600 max-w-lg mx-auto mb-10">
                        <img class="w-full h-full object-contain" src="https://github.com/KoZeuh/kTrelloc-Project-VueJS-ESGI/raw/main/logo.gif" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "Home",
    });
</script>