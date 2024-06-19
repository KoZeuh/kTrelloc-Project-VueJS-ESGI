<template>
  <button class="card p-4 mb-2 rounded-md w-full" @click="openCardDetailsModal(card)" v-if="!card.archived">
    <h6>{{ card.title }}</h6>

    <div class="relative inline-block mt-2">
      <div class="flex items-center space-x-2 flex-wrap">
        <MemberPopover v-for="member in card.members" :key="member.id" :member="member" :boardRole="member" />
      </div>

      <span v-if="card.tags.length > 0" class="rounded bg-gray-400 px-2 py-1 text-xs">{{ card.tags.length }} <font-awesome-icon icon="tags" /></span>
      <span v-if="card.attachments.length > 0" class="rounded bg-gray-400 px-2 py-1 text-xs ms-2">{{ card.attachments.length }} <font-awesome-icon icon="paperclip" /></span>
      <span v-if="card.checklists.length > 0" class="rounded bg-gray-400 px-2 py-1 text-xs ms-2"><font-awesome-icon icon="check-square" /> {{ completedItemsCount }} / {{ totalItemsCount }}</span>
    </div>
  </button>

  <CardDetailsModal
      :card="selectedCard"
      :boardMembers="boardMembers"
      :boardRole="boardRole"
      :isVisible="isCardDetailsModalVisible"
      @close="isCardDetailsModalVisible = false"
  />
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from "vuex";
import { initFlowbite } from 'flowbite';

import { updateTitle } from "@/services/cardService";

import CardDetailsModal from "@/components/modals/CardDetailsModal.vue";
import MemberPopover from '@/components/popovers/MemberPopover.vue';

export default defineComponent({
  name: 'Card',
  components: {
    CardDetailsModal,
    MemberPopover,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    boardMembers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    boardRole: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    completedItemsCount() {
      return this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.items.filter(item => item.completed).length;
      }, 0);
    },
    totalItemsCount() {
      return this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.items.length;
      }, 0);
    }
  },
  setup(props) {
    const store = useStore();
    const isEditingTitle = ref(false);
    const editableCardTitle = ref(props.card.title);
    const isCardDetailsModalVisible = ref(false);
    const selectedCard = ref<Object | null>(null);

    const getTagClass = (color: string) => {
      switch (color) {
        case 'red': return 'bg-red-400';
        case 'orange': return 'bg-orange-400';
        case 'yellow': return 'bg-yellow-400';
        case 'green': return 'bg-green-400';
        default: return 'bg-gray-400';
      }
    };

    const saveCardTitle = async () => {
      if (editableCardTitle.value === props.card.title) {
        isEditingTitle.value = false;
        return;
      }

      try {
        await updateTitle(store.getters.getToken, props.card.id, editableCardTitle.value);
        isEditingTitle.value = false;
      } catch (error) {
        console.error('Failed to update the card title', error);
      }
    };

    const openCardDetailsModal = (card: Object) => {
      selectedCard.value = { ...card };
      isCardDetailsModalVisible.value = true;
    };

    return {
      isEditingTitle,
      editableCardTitle,
      isCardDetailsModalVisible,
      selectedCard,
      saveCardTitle,
      openCardDetailsModal,
      getTagClass,
    };
  },
  mounted() {
    initFlowbite();
  },
});
</script>

<style scoped>

        /* Card custom style */
        .card {
            background-color: #1f2937;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-header {
            font-weight: bold;
            margin-bottom: 8px;
        }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            background-color: #374151;
        }
</style>