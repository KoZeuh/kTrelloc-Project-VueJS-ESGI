<template>
    <div class="flex h-screen text-white">
        <Sidebar :board="board" :boardRole="board?.role" :myOtherBoards="myOtherBoards" @createNewList="handleCreateNewList" @toggleMemberListModal="toggleMemberListModal"/>
        
        <div class="flex-1 bg-cover bg-center overflow-auto" :style="{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900?mountain)' }">
            <div class="grid grid-rows-4 grid-flow-col gap-2">
                <ListComponent :boardRole="board?.role" v-for="list in board?.lists" :key="list.id" :list="list" :board="board" />
            </div>
        </div>
    </div>

    <BoardMemberListModal :boardRole="board?.role" :boardId="board?.id" :boardMembers="board?.members" :showModal="showMemberListModal" @update:showModal="showMemberListModal = $event" />
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>

    
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    import { getBoardContentById, createListToBoardId } from '@/services/boardService';

    import ListComponent from '@/components/board/List.vue';
    import Sidebar from '@/components/board/sidebar/Sidebar.vue';
    import BoardMemberListModal from '@/components/modals/BoardMemberListModal.vue';
    import Popup from '@/components/notifications/Popup.vue';

    export default defineComponent({
        name: 'Board',

        components: {
            ListComponent,
            Sidebar,
            BoardMemberListModal,
            Popup
        },

        setup() {
            const store = useStore();
            const route = useRoute();

            const myOtherBoards = ref([]);
            const board = ref(null);
            const showMemberListModal = ref(false);

            const showErrorPopup = ref(false);
            const errorMessage = ref('');

            onMounted(() => {
                const boardId = parseInt(<string>route.params.id, 10);
                if (!isNaN(boardId)) {
                    fetchBoardContent(boardId);
                }
                fetchBoards();
            });

            watch(route, (newRoute) => {
                const boardId = parseInt(<string>newRoute.params.id, 10);
                if (!isNaN(boardId)) {
                    fetchBoardContent(boardId);
                }
            });

            const toggleMemberListModal = () => {
                showMemberListModal.value = !showMemberListModal.value;
            };

            const fetchBoards = async () => {
                try {
                    myOtherBoards.value = await store.dispatch('getBoardsByUser');
                } catch (error) {
                    handleError(error);
                }
            };

            const fetchBoardContent = async (boardId: number) => {
                try {
                    board.value = await getBoardContentById(store.getters.getToken, boardId);
                } catch (error) {
                    document.location.href = '/dashboard';
                }
            };

            const handleCreateNewList = async () => {
                try {
                    if (board.value) {
                        await createListToBoardId(store.getters.getToken, board.value.id);
                        await fetchBoardContent(board.value.id);
                    }
                } catch (error) {
                    handleError(error);
                }
            };

            const handleError = (error: any) => {
                errorMessage.value = error.response.data.message;
                showErrorPopup.value = true;
                setTimeout(() => {
                    showErrorPopup.value = false;
                }, 2000);
            };

            return {
                board,
                myOtherBoards,
                handleCreateNewList,
                toggleMemberListModal,
                showMemberListModal,
                showErrorPopup,
                errorMessage
            };
        }
    });
</script>
