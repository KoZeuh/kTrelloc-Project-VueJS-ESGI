<template>
    <div class="sidebar w-64 p-4 ml-12">
        <div class="text-xl font-bold mb-4">{{ board?.title }}</div>

        <nav>
            <SidebarButton icon="arrow-left-long" :text="$t('board.backToDashboard')" :link="`/dashboard`" />
            <SidebarButton icon="plus" :text="$t('board.addNewList')" @click="createNewList" />
            <SidebarButton icon="users" :text="$t('board.membersList')" @click="toggleMemberListModal" />

            <AddMemberToBoardPopover v-if="boardRole === 'owner' || boardRole === 'admin'" :boardId="board?.id" />

            <div class="mt-6">
                <span class="py-2 font-bold mb-2">{{ $t('board.myOtherBoards') }}</span>
                <div v-for="otherBoard in myOtherBoards" :key="otherBoard.id">
                    <SidebarBoardItem :board="otherBoard" :currentBoardId="board?.id" />
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import SidebarButton from '@/components/board/sidebar/SidebarButton.vue';
    import SidebarBoardItem from '@/components/board/sidebar/SidebarBoardItem.vue';
    import AddMemberToBoardPopover from '@/components/popovers/AddMemberToBoardPopover.vue';

    export default defineComponent({
        name: 'Sidebar',
        components: {
            SidebarButton,
            SidebarBoardItem,
            AddMemberToBoardPopover
        },
        props: {
            board: {
                type: Object as PropType<any>,
                required: true
            },
            myOtherBoards: {
                type: Array as PropType<any[]>,
                required: true
            },
            boardRole: {
                type: String as PropType<string>,
                required: true
            }
        },
        emits: ['createNewList', 'toggleMemberListModal'],
        methods: {
            createNewList() {
                this.$emit('createNewList');
            },
            toggleMemberListModal() {
                this.$emit('toggleMemberListModal');
            }
        }
    });
</script>
