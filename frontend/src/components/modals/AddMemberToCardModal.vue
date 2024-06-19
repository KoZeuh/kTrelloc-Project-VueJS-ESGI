<template>
    <div v-if="showModal" class="fixed inset-0 text-gray-900">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <button @click="toggleModal" class="absolute top-0 right-0 p-2">
            <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
            <div class="sm:flex sm:items-start">
              <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <font-awesome-icon icon="arrow-right" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6">{{ $t('modals.addMember.title') }}</h3>
                <div class="mt-5">
                  <button class="mx-2" v-for="member in boardMembers" :key="member.user.id" @click="handleAddMemberToCard(member.user.id)">
                    <img class="w-8 h-8 rounded-full" :src="'https://i.pravatar.cc/500?img=' + member.user.id" />
                    <span class="text-sm font-semibold">{{ member.user.username }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';

  import { addMemberToCardId } from '@/services/cardService';

  import Popup from '@/components/notifications/Popup.vue';
  
  export default defineComponent({
    name: 'AddMemberModal',
    props: {
      cardId: {
        type: Number,
        required: true,
      },
      showModal: {
        type: Boolean,
        required: true,
      },
      boardMembers: {
        type: Array as () => string[],
        required: true,
      },
    },
    components: {
      Popup,
    },
    emits: ['update:showModal'],
    setup(props, { emit }) {
      const store = useStore();
      const showSuccessPopup = ref(false);
      const showErrorPopup = ref(false);
      const successMessage = ref('');
      const errorMessage = ref('');
  
      const toggleModal = () => {
        emit('update:showModal', false);
      };
  
      const handleAddMemberToCard = async (memberId: number) => {
        try {
          const response = await addMemberToCardId(store.getters.getToken, props.cardId, memberId);

          successMessage.value = response.message;
          showSuccessPopup.value = true;

          setTimeout(() => {
            showSuccessPopup.value = false;
          }, 2000);
        } catch (error) {
          errorMessage.value = error.response.data.message;
          showErrorPopup.value = true;
  
          setTimeout(() => {
            showErrorPopup.value = false;
          }, 2000);
        }
      };
  
      return {
        toggleModal,
        handleAddMemberToCard,
        showSuccessPopup,
        showErrorPopup,
        successMessage,
        errorMessage,
      };
    },
  });
  </script>
  
  <style scoped></style>
  