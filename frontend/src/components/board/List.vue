<template>
  <div class="p-4 bg-gray-900 rounded-md shadow-lg mx-3 my-3">
      <input
        v-if="isEditingTitle && boardRole === 'owner' || boardRole === 'admin'"
        
        v-model="editableTitle"
        @blur="saveTitle"
        @keyup.enter="saveTitle"
        class="text-xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-600"
        ref="titleInput"
      />
      <h1
        v-else
        class="flex justify-between items-center font-bold mb-2 cursor-pointer"
        @click="enableTitleEditing"
      >
          <span>#{{list.id}} {{ list.title }}</span>
          <span class="flex space-x-2">
              <font-awesome-icon @click.stop="createNewCard" class="cursor-pointer text-white-800" icon="plus" />
              <font-awesome-icon v-if="boardRole === 'owner' || boardRole === 'admin'" @click.stop="promptDeleteList" class="cursor-pointer text-red-800" icon="trash" />
              <font-awesome-icon @click="handleDuplicateList" icon="clone"/>
          </span>
      </h1>

      <CardComponent v-for="card in cards" :key="card.id" :card="card" :boardRole="boardRole" :boardMembers="board.members" />
  </div>

  <ConfirmationDialog
      :isVisible="isConfirmationDialogVisible"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('board.confirmMessageRemoveList')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion"
  />

  <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
  <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { initFlowbite } from 'flowbite';

import CardComponent from '@/components/board/Card.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { updateTitle, deleteList, createCardToListId, duplicateListById } from '@/services/boardListService';

import ConfirmationDialog from '@/components/dialogs/ConfirmDialog.vue';
import Popup from '@/components/notifications/Popup.vue';

export default defineComponent({
  name: 'List',
  components: {
    ConfirmationDialog,
    CardComponent,
    FontAwesomeIcon,
    Popup
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
    board: {
      type: Object as PropType<{ members: string[] }>,
      required: true,
    },
    boardRole: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const isEditingTitle = ref(false);
    const editableTitle = ref(props.list.title);
    const isConfirmationDialogVisible = ref(false);
    const listToDelete = ref<null | number>(null);

    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const list = ref(props.list);
    const cards = ref([...props.list.cards]);
    const titleInput = ref<HTMLInputElement | null>(null);

    onMounted(() => {
      initFlowbite();
    });

    const enableTitleEditing = () => {
      isEditingTitle.value = true;
      nextTick(() => {
        if (titleInput.value) {
          titleInput.value.focus();
        }
      });
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

    const handleDuplicateList= async () => {
      try {
        await duplicateListById(store.getters.getToken, props.list.id);

        document.location.reload();
      } catch (error) {
        handleError('error', error);
      }
    };


    const createNewCard = async () => {
      try {
        const response = await createCardToListId(store.getters.getToken, props.list.id);
        cards.value.push(response);
      } catch (error) {
        handleError('error', error);
      }
    };

    const saveTitle = async () => {
      if (editableTitle.value === props.list.title) {
        isEditingTitle.value = false;
        return;
      }

      try {
        await updateTitle(store.getters.getToken, props.list.id, editableTitle.value);
        props.list.title = editableTitle.value;

        isEditingTitle.value = false;
        handleError('success', { message: 'Title updated successfully!' });
      } catch (error) {
        handleError('error', error);
      }
    };

    const promptDeleteList = (event: Event) => {
      event.stopPropagation();
      listToDelete.value = props.list.id;
      isConfirmationDialogVisible.value = true;
    };

    const confirmDeletion = async () => {
      try {
        if (listToDelete.value !== null) {
          await deleteList(store.getters.getToken, listToDelete.value);

          document.location.reload();
        }
      } catch {
      } finally {
        isConfirmationDialogVisible.value = false;
        listToDelete.value = null;
      }
    };

    const cancelDeletion = () => {
      isConfirmationDialogVisible.value = false;
      listToDelete.value = null;
    };

    return {
      isEditingTitle,
      editableTitle,
      enableTitleEditing,
      createNewCard,
      saveTitle,
      promptDeleteList,
      confirmDeletion,
      cancelDeletion,
      isConfirmationDialogVisible,
      showSuccessPopup,
      showErrorPopup,
      successMessage,
      errorMessage,
      cards,
      list,
      titleInput,
      handleDuplicateList
    };
  },
});
</script>

<style scoped>
</style>
