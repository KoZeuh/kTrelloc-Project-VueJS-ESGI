<template>
    <button @click="$emit('click')" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <router-link v-if="link" :to="link">
            <font-awesome-icon :icon="icon" class="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" /> 
            <span class="ms-3">{{ text }}</span>
        </router-link>
        <template v-else>
            <font-awesome-icon :icon="icon" class="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" /> 
            <span class="ms-3">{{ text }}</span>
        </template>
    </button>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';

    export default defineComponent({
        name: 'SidebarButton',
        props: {
            icon: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            link: {
                type: String as PropType<string | null>,
                default: null
            }
        },
        emits: ['click']
    });
</script>
