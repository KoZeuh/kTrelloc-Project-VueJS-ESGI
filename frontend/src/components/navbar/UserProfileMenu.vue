<template>
    <div>
        <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" :src="'https://i.pravatar.cc/500?img=' + user?.id" alt="User profile image" />
        </button>
        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">{{ user?.username || 'Guest' }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                    <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{ $t('navbar.settings') }}</router-link>
                </li>
                <li>
                    <a href="javascript:void(0)" @click="$emit('logout')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{{ $t('navbar.logout') }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    
    export default defineComponent({
        name: 'UserProfileMenu',
        props: {
            user: {
                type: Object as PropType<any>,
                required: true
            }
        },
        emits: ['logout']
    });
</script>
  