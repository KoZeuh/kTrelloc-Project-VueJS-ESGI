<template>
    <button v-if="board.id !== currentBoardId" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
        <router-link :to="`/board/${board.id}`" role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" :src="`https://i.pravatar.cc/500?img=${board.id}`" alt="">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-sm font-medium">
                        {{ board.title }}
                    </p>
                </div>
            </div>
        </router-link>
    </button>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';

    export default defineComponent({
        name: 'SidebarBoardItem',
        props: {
            board: {
                type: Object as PropType<any>,
                required: true
            },
            currentBoardId: {
                type: Number as PropType<number | null>,
                default: null
            }
        }
    });
</script>
