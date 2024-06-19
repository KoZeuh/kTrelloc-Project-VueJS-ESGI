<template>
    <div class="flex flex-col">
        <div class="bg-white shadow-md rounded-3xl p-4 w-full max-w-sm relative">
            <div class="lg:mb-0 mb-3">
                <router-link :to="`/board/${board.id}`">
                    <img :src="'https://i.pravatar.cc/500?img=' + board.id" class="w-full object-scale-down lg:object-cover lg:h-48 rounded-2xl">
                </router-link>
            </div>
            <div class="absolute mt-3 left-10 right-10 flex justify-between items-center">
                <font-awesome-icon v-if="board.role === 'owner'" icon="trash" class="text-red-500 cursor-pointer h-6 w-6" @click="$emit('delete', board.id)" />
                <font-awesome-icon v-if="board.role === 'owner' || board.role === 'admin'" icon="edit" class="text-gray-500 cursor-pointer h-6 w-6" @click="$emit('edit', board)" />
            </div>
            <div class="flex-auto ml-3 justify-evenly py-2">
                <h2 class="text-center text-lg font-medium">
                    <router-link :to="`/board/${board.id}`">{{ board.title }}</router-link>
                </h2>
                <p class="mt-3 text-center">{{ board.description }}</p>
                <div class="flex py-4 text-sm text-gray-500">
                    <div class="flex-1 inline-flex items-center justify-center">
                        <font-awesome-icon class="h-5 w-5 mr-2 text-gray-400" icon="calendar-day" />
                        <p>{{ formatDate(board.createdAt) }}</p>
                    </div>
                    <div class="flex-1 inline-flex items-center">
                        <font-awesome-icon class="h-5 w-5 mr-2 text-gray-400" icon="clock" />
                        <p>{{ formatDate(board.updatedAt) }}</p>
                    </div>
                </div>
                <div class="flex p-4 pb-2 border-t border-gray-200"></div>
                <div class="flex justify-center space-x-3 text-sm font-medium">
                    <div class="space-x-3">
                        <button class="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2">
                            <font-awesome-icon icon="users" />
                            <span>{{ board.members.length }} {{ $t('dashboard.members') }}</span>
                        </button>
                    </div>
                    <div class="space-x-3">
                        <button class="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2">
                            <font-awesome-icon icon="list-alt" />
                            <span>{{ board.lists.reduce((sum, list) => sum + list.cards.length, 0) }} {{ $t('dashboard.cards') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { formatDate } from '@/utils/dateUtils';

    export default defineComponent({
        name: 'Card',
        props: {
            board: {
                type: Object as PropType<any>,
                required: true
            }
        },
        emits: ['delete', 'edit'],
        methods: {
            formatDate
        }
    });
</script>
