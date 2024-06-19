<template>
    <section class="ml-12 transform ease-in-out duration-500 px-2 md:px-5 pb-4">
        <button @click="showCreateBoardModal = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <font-awesome-icon icon="plus" /> {{ $t('dashboard.createBoard') }}
        </button>

        <div class="grid mt-8 gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <BoardCard
                v-for="board in boards"
                :key="board.id"
                :board="board"
                @delete="handleDeleteBoard"
                @edit="openEditBoardModal"
            />
        </div>
    </section>

    <CreateBoardModal :isVisible="showCreateBoardModal" @close="showCreateBoardModal = false" />
    <EditBoardModal :isVisible="showEditBoardModal" :board="selectedBoard" @close="showEditBoardModal = false" />
    <ConfirmationDialog
        :isVisible="showConfirmationDialog"
        :title="$t('dashboard.deleteBoard.header')"
        :message="$t('dashboard.deleteBoard.message')"
        @confirm="confirmDeletion"
        @cancel="cancelDeletion"
    />
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    import { formatDate } from '@/utils/dateUtils';
    import { deleteBoard } from '@/services/boardService';

    import CreateBoardModal from '@/components/modals/CreateBoardModal.vue';
    import EditBoardModal from '@/components/modals/EditBoardModal.vue';
    import ConfirmationDialog from '@/components/dialogs/ConfirmDialog.vue';
    import Popup from '@/components/notifications/Popup.vue';
    import BoardCard from '@/components/dashboard/Card.vue';

    export default defineComponent({
        name: 'Dashboard',

        components: {
            CreateBoardModal,
            EditBoardModal,
            ConfirmationDialog,
            Popup,
            BoardCard
        },

        setup() {
            const store = useStore();

            const showCreateBoardModal = ref(false);
            const showEditBoardModal = ref(false);
            const showConfirmationDialog = ref(false);

            const showErrorPopup = ref(false);
            const errorMessage = ref('');

            const boards = ref([]);
            const selectedBoard = ref(null);
            const boardToDelete = ref<null | number>(null);

            onMounted(() => {
                fetchBoards();
            });

            const fetchBoards = async () => {
                try {
                    boards.value = await store.dispatch('getBoardsByUser');
                } catch (error) {
                    handleError(error);
                }
            };

            const handleDeleteBoard = (boardId: number) => {
                boardToDelete.value = boardId;
                showConfirmationDialog.value = true;
            };

            const confirmDeletion = async () => {
                try {
                    if (boardToDelete.value !== null) {
                        await deleteBoard(store.getters.getToken, boardToDelete.value);
                        await fetchBoards();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    showConfirmationDialog.value = false;
                    boardToDelete.value = null;
                }
            };

            const cancelDeletion = () => {
                showConfirmationDialog.value = false;
                boardToDelete.value = null;
            };

            const openEditBoardModal = (board: any) => {
                selectedBoard.value = { ...board };
                showEditBoardModal.value = true;
            };

            const handleError = (error: any) => {
                errorMessage.value = error.response.data.message;
                showErrorPopup.value = true;
                setTimeout(() => {
                    showErrorPopup.value = false;
                }, 2000);
            };

            return {
                showCreateBoardModal,
                showEditBoardModal,
                showConfirmationDialog,
                boards,
                selectedBoard,
                openEditBoardModal,
                formatDate,
                handleDeleteBoard,
                confirmDeletion,
                cancelDeletion,
                showErrorPopup,
                errorMessage
            };
        },
    });
</script>
