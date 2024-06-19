<template>
  <div v-if="isVisible" class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.header') }}</h3>
        <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <form @submit.prevent="handleEditBoardSubmit" class="p-4 md:p-5">
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.title') }}</label>
            <input v-model="editedBoard.title" type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Board Title" required>
          </div>
          <div class="col-span-2">
            <label for="visibility" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.visibility') }}</label>
            <select v-model="editedBoard.visibility" id="visibility" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="PUBLIC">{{ $t('dashboard.editBoard.visibilityOptions.public') }}</option>
              <option value="PRIVATE">{{ $t('dashboard.editBoard.visibilityOptions.private') }}</option>
              <option value="PRIVATE_INVITATION_ONLY">{{ $t('dashboard.editBoard.visibilityOptions.privateInvite') }}</option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.description') }}</label>
            <textarea v-model="editedBoard.description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <font-awesome-icon class="mr-2" icon="check" /> {{ $t('global.save') }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
  <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useStore } from "vuex";
  import { updateBoard } from "@/services/boardService";

  import Popup from '@/components/notifications/Popup.vue';

  export default defineComponent({
    name: 'EditBoardModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      board: {
        type: Object,
        default: null,
      },
    },
    components: {
      Popup,
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
      const store = useStore();
      const editedBoard = ref({ ...props.board });

      const showSuccessPopup = ref(false);
      const showErrorPopup = ref(false);
      const successMessage = ref('');
      const errorMessage = ref('');

      watch(() => props.board, (newBoard) => {
        editedBoard.value = { ...newBoard };
      });

      const closeModal = () => {
        emit('close');

        document.location.reload();
      };

      const handleEditBoardSubmit = async () => {
        try {
          const response = await updateBoard(store.getters.getToken, editedBoard.value);

          editedBoard.value = { ...response.board };

          handleError('success', response);
        } catch (error) {
          handleError('error', error);
        }
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

      return {
        editedBoard,
        closeModal,
        handleEditBoardSubmit,
        errorMessage,
        showErrorPopup,
        successMessage,
        showSuccessPopup,
      };
    },
  });
</script>

<style scoped>
</style>
