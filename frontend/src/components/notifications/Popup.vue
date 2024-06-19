<template>
    <div v-if="visible" id="bottom-success-right-modal" class="fixed top-0 left-0 right-[50%] z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-3xl max-h-full">
            <div v-if="typePopup === 'success'" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                <p class="text-lg font-semibold">Success</p>
                <p>{{ message }}</p>
            </div>

            <div v-else-if="typePopup === 'error'" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p class="text-lg font-semibold">Error</p>
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    

    export default defineComponent({
        name: "Popup",
        props: {
            message: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                required: true
            },
            typePopup: {
                type: String,
                default: 'success'
            }
        },
    });
</script>
