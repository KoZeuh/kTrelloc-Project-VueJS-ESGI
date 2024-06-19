<template>
  <div v-if="isVisible" class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('dashboard.createBoard') }}</h3>
        <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <form @submit.prevent="handleCreateBoardSubmit" class="p-4 md:p-5">
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.header') }}</label>
            <input v-model="title" type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Suivi Marketing - kTrello" required>
          </div>
          <div class="col-span-2">
            <label for="visibility" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.visibility') }}</label>
            <select v-model="visibility" id="visibility" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="PUBLIC">{{ $t('dashboard.editBoard.visibilityOptions.public') }}</option>
              <option value="PRIVATE">{{ $t('dashboard.editBoard.visibilityOptions.private') }}</option>
              <option value="PRIVATE_INVITATION_ONLY">{{ $t('dashboard.editBoard.visibilityOptions.privateInvite') }}</option>
            </select>
          </div>
          <div class="col-span-2">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('dashboard.editBoard.description') }}</label>
            <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
            </svg>
            {{ $t('global.add') }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useStore } from 'vuex';
import { createBoard } from "@/services/boardService";

import Popup from '@/components/notifications/Popup.vue';

export default defineComponent({
  name: 'CreateBoardModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Popup,
  },
  emits: ['close', 'boardCreated'],
  setup(props, { emit }) {
    const store = useStore();
    const title = ref('');
    const visibility = ref('PB');
    const description = ref('');

    const showErrorPopup = ref(false);
    const errorMessage = ref('');

    const closeModal = () => {
      emit('close');
    };

    const handleCreateBoardSubmit = async () => {
      try {
        await createBoard(store.getters.getToken, {
          title: title.value,
          visibility: visibility.value,
          description: description.value,
        });

        closeModal();
        document.location.reload();
      } catch (error) {
        errorMessage.value = error.response.data.message;
        showErrorPopup.value = true;

        setTimeout(() => {
          showErrorPopup.value = false;
        }, 2000);
      }
    };

    return {
      title,
      visibility,
      description,
      closeModal,
      handleCreateBoardSubmit,
      showErrorPopup,
      errorMessage,
    };
  },
});
</script>

<style scoped>
</style>
