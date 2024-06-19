<template>
    <div>
        <div class="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12">
            <div class="flex pl-4 items-center space-x-2">
                <div>
                    <div class="setDarkMode-btn moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" class="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </div>
                    <div class="setLightMode-btn sun hidden text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-1 rounded-full text-white">
                <div class="transform ease-in-out duration-300 mr-12">
                    kTrello
                </div>
            </div>
        </div>

        <div class="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
            <SidebarLink to="/" icon="home" label="navbar.home" />
            <SidebarLink v-if="isAuthenticated" to="/dashboard" icon="dashboard" label="navbar.dashboard" />
        </div>

        <div class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
            <SidebarLink to="/" icon="home" mini />
            <SidebarLink v-if="isAuthenticated" to="/dashboard" icon="dashboard" mini />
        </div>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import SidebarLink from '@/components/navbar/SidebarLink.vue';
    
    export default defineComponent({
        name: 'Sidebar',
        components: {
            SidebarLink
        },
        props: {
            isAuthenticated: {
                type: Boolean as PropType<boolean>,
                required: true
        }
        }
    });
</script>
  