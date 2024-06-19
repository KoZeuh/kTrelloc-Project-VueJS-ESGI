<template>
    <router-link :to="to" class="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
        <svg :class="iconClass" xmlns="http://www.w3.org/2000/svg" fill="none" :viewBox="viewBox" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4">
            <path :d="path" />
        </svg>
        
        <div v-if="!mini">
            {{ $t(label) }}
        </div>
    </router-link>
</template>
  
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    
    export default defineComponent({
        name: 'SidebarLink',
        props: {
            to: {
                type: String as PropType<string>,
                required: true
            },
            icon: {
                type: String as PropType<string>,
                required: true
            },
            label: {
                type: String as PropType<string>,
                required: true
            },
            mini: {
                type: Boolean as PropType<boolean>,
                default: false
            }
        },
        computed: {
            iconClass() {
                return this.mini ? 'justify-end pr-5' : '';
            },
            viewBox() {
                return this.icon === 'home' ? '0 0 24 24' : '0 0 24 24';
            },
            path() {
                return this.icon === 'home' 
                ? 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' 
                : 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25';
            }
        }
    });
</script>
  