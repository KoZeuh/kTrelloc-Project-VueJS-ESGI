<template>
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 relative">
            <button @click="toggleModal" class="absolute top-0 right-0 p-2">
              <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t('modals.boardMembersList.title') }}</h3>
            <div class="mt-5">
              <ul>
                <li v-for="member in boardMembers" :key="member.id" class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <img :src="'https://i.pravatar.cc/500?img=' + member.user.id" class="w-8 h-8 rounded-full" />
                    <span class="text-sm font-semibold ml-2">{{ member.user.username }} - <span v-if="member.role === 'admin'" class="text-red-600">{{ $t('board.rolesOptions.admin') }}</span><span v-else class="text-yellow-600">{{ $t('board.rolesOptions.member') }}</span></span>
                  </div>
                  <button @click="handleRemoveMember(member.user.id)" class="text-red-600 hover:underline">{{ $t('modals.boardMembersList.removeMember') }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ConfirmationDialog
      :isVisible="isConfirmationDialogVisible"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('modals.boardMembersList.confirmMessageRemoveMember')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion"
    />

    <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';

  import ConfirmationDialog from '@/components/dialogs/ConfirmDialog.vue';
  import { removeMemberFromBoard } from '@/services/boardService';
  import Popup from '@/components/notifications/Popup.vue';
  
  export default defineComponent({
    name: 'BoardMemberListModal',
    props: {
      showModal: {
        type: Boolean,
        required: true,
      },
      boardMembers: {
        type: Array,
        required: true,
      },
      boardId: {
        type: Number,
        required: true,
      },
    },
    components: {
      ConfirmationDialog,
      Popup,
    },
    emits: ['update:showModal'],
    setup(props, { emit }) {
      const store = useStore();

      const memberIdToDelete = ref(0);
      const isConfirmationDialogVisible = ref(false);

      const showSuccessPopup = ref(false);
      const showErrorPopup = ref(false);
      const successMessage = ref('');
      const errorMessage = ref('');
  
      const toggleModal = () => {
        emit('update:showModal', false);
      };
  
      const handleRemoveMember = async (memberId: number) => {
        memberIdToDelete.value = memberId;
        isConfirmationDialogVisible.value = true;
      };

      const handleError = (type: string, error: any) => {
        if (type === 'error') {
            errorMessage.value = error.response.data.message;
            showErrorPopup.value = true;
            setTimeout(() => {
              showErrorPopup.value = false;
            }, 2000);
        } else {
          successMessage.value = error.message;
          showSuccessPopup.value = true;
          setTimeout(() => {
            showSuccessPopup.value = false;
          }, 2000);
        }
      };

      const confirmDeletion = async () => {
        try {
          const response = await removeMemberFromBoard(store.getters.getToken, props.boardId, memberIdToDelete.value);

          handleError('success', response);
        } catch (error) {
          handleError('error', error);
        } finally {
            isConfirmationDialogVisible.value = false;
            memberIdToDelete.value = 0;
        }
      };

      const cancelDeletion = () => {
          isConfirmationDialogVisible.value = false;
          memberIdToDelete.value = 0;
      };
  
      return {
        toggleModal,
        handleRemoveMember,
        isConfirmationDialogVisible,
        confirmDeletion,
        cancelDeletion,
        showSuccessPopup,
        showErrorPopup,
        successMessage,
        errorMessage
      };
    },
  });
  </script>
  
  <style scoped></style>
  