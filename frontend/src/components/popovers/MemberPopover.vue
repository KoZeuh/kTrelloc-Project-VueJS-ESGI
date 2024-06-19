<template>
  <div class="relative">
    <button @click="togglePopover" type="button" class="user-detail-popover">
      <img class="w-8 h-8 rounded-full" :src="'https://i.pravatar.cc/500?img=' + member.user.id" />
    </button>
    <div v-if="showPopover" class="absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
      <div class="p-3">
        <div class="flex items-center justify-between mb-2">
          <a href="#">
            <img class="w-10 h-10 rounded-full" :src="'https://i.pravatar.cc/500?img=' + member.user.id">
          </a>
          <div>
            <button v-if="boardRole === 'owner' || boardRole === 'admin'" @click="removeMember(member.id)" type="button" class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{{ $t('modals.cardDetails.removeMemberFromCard') }}</button>
            {{ member.role }}
          </div>
        </div>
        <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
          <a href="#">{{ member.user.username }}</a>
        </p>
        <p class="mb-3 text-sm font-normal">
          <a href="#" class="hover:underline">{{ member.user.email }}</a>
        </p>
        <ul class="flex text-sm">
            <li class="me-2">
                <a href="#" class="hover:underline">
                    <span>{{ $t('user.joinAt') }}</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ formatDate(member.createdAt) }}</span>
                </a>
            </li>
        </ul>
      </div>
      <div data-popper-arrow></div>
    </div>
  </div>

  <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
  <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import { removeCardMemberById } from '@/services/cardService';
import { formatDate } from '@/utils/dateUtils';

import Popup from '@/components/notifications/Popup.vue';

export default defineComponent({
  name: 'MemberPopover',
  props: {
    member: {
      type: Object,
      required: true,
    },
    boardRole: {
      type: String,
      required: true,
    },
  },
  components: {
    Popup,
  },
  setup(props) {
    const store = useStore();
    const showPopover = ref(false);

    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const togglePopover = () => {
      showPopover.value = !showPopover.value;
    };

    document.addEventListener('click', (event) => {
      if (!showPopover.value) return;

      if (!(event.target as HTMLElement).closest('.user-detail-popover')) {
        showPopover.value = false;
      }
    });

    const removeMember = async (memberId: bigint) => {
      try {
        const response = await removeCardMemberById(store.getters.getToken, memberId);

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
      showPopover,
      togglePopover,
      removeMember,
      formatDate,
      successMessage,
      errorMessage,
      showSuccessPopup,
      showErrorPopup,
    };
  },
});
</script>

<style scoped></style>
