<template>
  <div v-if="isVisible" class="overflow-auto fixed z-50 justify-center items-center w-full h-full md:inset-0 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5">
    <div class="bg-gray-800 p-6 rounded-lg flex">
      <div class="flex-1 space-y-4 mr-4">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center space-x-2">
            <input v-if="isEditingTitle && boardRole === 'owner' || boardRole === 'admin'" v-model="editedCard.title" @blur="handleSaveCardTitle" class="bg-gray-700 text-white p-2 rounded-lg focus:outline-none" />
            <h2 v-else class="text-xl font-bold" @click="isEditingTitle = true">
              {{ editedCard.title }}
            </h2>
          </div>

          
          <button class="text-gray-400 hover:text-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <div class="flex flex-row space-x-2">
          <div v-for="tag in editedCard.tags" :key="tag.id" class="relative inline-block">
            <button class="px-4 py-2 rounded flex items-center space-x-1" :class="getTagClass(tag.tag.color)">
              <span>{{ tag.tag.name }}</span>
              <span class="ml-2 text-white-500 hover:text-gray-700" v-if="boardRole === 'owner' || boardRole === 'admin'" @click="handleDeleteTagFromCard(tag.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div class="description bg-gray-700 p-4 rounded-lg mt-4">
          <h3 class="font-bold text-lg">Description</h3>
          <textarea v-model="editedCard.description" @blur="handleSaveCardDescription" class="w-full bg-gray-900 p-2 rounded-lg mt-2" :placeholder="$t('modals.cardDetails.addDescription')"></textarea>
        </div>

        <div v-for="checklist in editedCard.checklists" :key="checklist.id" class="checklist bg-gray-700 p-4 rounded-lg mt-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <input v-if="checklist.isEditingTitle" v-model="checklist.title" @blur="handleSaveChecklistTitle(checklist)" class="bg-gray-700 text-white p-2 rounded-lg focus:outline-none" @click.stop />
              <h3 v-else class="font-bold text-lg" @click="startEditingChecklistTitle(checklist)">{{ checklist.title }}</h3>
            </div>
            <div class="flex space-x-2">
              <button class="px-4 py-2 bg-blue-600 rounded" @click="toggleHideCompleted(checklist.id)">
                {{ checklist.hideCompleted ? $t('global.display') : $t('global.hide') }} {{ $t('modals.cardDetails.checkedTasks') }}
              </button>
              <button class="px-4 py-2 bg-red-600 rounded" v-if="boardRole === 'owner' || boardRole === 'admin'" @click="handleDeleteChecklist(checklist.id)">{{ $t('global.delete') }}</button>
            </div>
          </div>
          <div class="progress mt-2">
            <div class="w-full bg-gray-600 rounded-lg h-2">
              <div class="bg-blue-600 h-2 rounded-lg" :style="{ width: `${calculateProgress(checklist)}%` }"></div>
            </div>
          </div>
          <ul class="mt-4 space-y-2">
            <li v-for="item in checklist.items" :key="item.id" v-show="!item.completed || !checklist.hideCompleted" class="flex items-center space-x-2">
              <input type="checkbox" class="form-checkbox h-4 w-4" v-model="item.completed" @change="handleToggleChecklistItemCompletion(item)" />
              <button class="text-red-400 hover:text-gray-200" v-if="boardRole === 'owner' || boardRole === 'admin'" @click="handleDeleteChecklistItem(checklist.id, item.id)">
                <font-awesome-icon icon="trash" />
              </button>
              <span>{{ item.title }}</span>
            </li>
          </ul>
          <button class="mt-4 px-4 py-2 bg-blue-600 rounded" @click="handleAddChecklistItem(checklist.id)">{{ $t('modals.cardDetails.addNewItem') }}</button>        
          </div>

        <div class="attachments bg-gray-700 p-4 rounded-lg mt-4">
          <h3 class="font-bold text-lg">Pièces jointes</h3>
          <ul class="mt-2 space-y-2 flex flex-wrap justify-center">
            <li v-for="attachment in editedCard.attachments" :key="attachment.id" class="cursor-pointer mx-2 relative flex max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <img v-if="attachment.type.includes('image')" :src="getAttachmentUrl(attachment.url)" class="rounded-t-lg  h-48 w-96 mx-auto" />

                <video class="rounded-t-lg object-full h-48 w-96 mx-auto" controls v-if="attachment.type.includes('video')">
                  <source :src="getAttachmentUrl(attachment.url)" type="video/mp4">
                </video>

                <iframe v-if="!attachment.type.includes('image') && !attachment.type.includes('video')" class="w-full aspect-video" :src="getAttachmentUrl(attachment.url)" frameborder="0"></iframe>
              
                <div class="flex justify-between items-center p-2">
                  <button class="text-red-400 hover:text-gray-200 mt-3 text-center" v-if="boardRole === 'owner' || boardRole === 'admin'" @click="confirmDeleteAttachment(attachment.id)">
                    <font-awesome-icon icon="times" /> {{ $t('global.delete') }}
                  </button>

                  <button class="text-blue-400 hover:text-gray-200 mt-3 text-center" @click="downloadAttachment(attachment)">
                    <font-awesome-icon icon="download" /> {{ $t('global.download') }}
                  </button>

                  <button class="text-green-400 hover:text-gray-200 mt-3 text-center" @click="viewAttachment(attachment)">
                    <font-awesome-icon icon="eye" /> {{ $t('global.view') }}
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="actionsHistory bg-gray-700 p-4 rounded-lg mt-4 overflow-auto ">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center space-x-2">
              <h3 class="font-bold text-lg">History</h3>
            </div>
            <div class="flex space-x-2">
              <button class="px-4 py-2 bg-blue-600 rounded" @click="toggleHistory">
                {{ showHistory ? $t('global.hide') : $t('global.display') }} {{ $t('modals.cardDetails.history') }}
              </button>
            </div>
          </div>

          
          <div v-if="showHistory" v-for="date in sortedActionDates" :key="date" class="overflow-y-auto h-96 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <time class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDate(date) }}</time>
              <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li v-for="action in groupedActions[date]" :key="action.id">
                    <div class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img class="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0" :src="'https://i.pravatar.cc/500?img=' + action.user.id"/>
                        <div class="text-gray-600 dark:text-gray-400">
                            <div class="text-base font-normal">
                              <span class="font-medium text-gray-900 dark:text-white">{{ action.user.username }} - {{ formatDateTime(action.createdAt) }}</span>
                            </div>
                            <span v-html="formatAction(action)"></span>
                        </div>
                      </div>
                  </li>
              </ol>
          </div>
        </div>
      </div>

      <div class="w-72 space-y-4">
        <div class="suggested bg-gray-700 p-4 rounded-lg">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">{{ $t('dashboard.members') }}</h3>
            <button v-if="boardRole === 'owner' || boardRole === 'admin'">
              <font-awesome-icon icon="plus" @click="toggleAddMemberModal" />
              <AddMemberToCardModal :cardId="editedCard.id" :boardMembers="boardMembers" :showModal="showAddMemberModal" @update:showModal="showAddMemberModal = $event" />
            </button>
          </div>

          <div class="flex items-center space-x-2 mt-4">
            <MemberPopover v-for="member in editedCard.members" :key="member.id" :member="member" :boardRole="boardRole"/>
          </div>
        </div>

        <div class="suggested bg-gray-700 p-4 rounded-lg">
          <h3 class="font-bold text-lg">{{ $t('modals.cardDetails.tags') }}</h3>
          <ul class="space-y-2 mt-2">
            <li v-for="tag in availableTags" :key="tag.id">
              <button class="px-4 py-2 rounded w-full" :class="getTagClass(tag.color)" @click="handleAddTagToCard(tag.id)">{{ tag.name }}</button>
            </li>
          </ul>
        </div>

        <div class="add-to-card bg-gray-700 p-4 rounded-lg">
          <h3 class="font-bold text-lg">{{ $t('modals.cardDetails.addToCard') }}</h3>
          <ul class="space-y-2 mt-2">
            <li><button class="px-4 py-2 bg-blue-600 rounded w-full" @click="handleAddChecklist"><font-awesome-icon icon="plus"/> Checklist</button></li>
            <li class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">{{ $t('modals.cardDetails.uploadDescription') }}</span></p>
                    </div>
                    <input id="dropzone-file" @change="handleFileUpload" type="file" class="hidden" />
                    <button class="px-4 py-2 mb-2 bg-blue-600 rounded" @click="handleAddAttachment">{{ $t('modals.cardDetails.uploadTitle') }}</button>
                </label>
              </li> 
          </ul>
        </div>

        <div class="actions bg-gray-700 p-4 rounded-lg" v-if="boardRole === 'owner' || boardRole === 'admin'">
          <h3 class="font-bold text-lg">Actions</h3>
          <ul class="space-y-2 mt-2">
            <li><button class="px-4 py-2 bg-orange-400 rounded w-full" @click="handleArchiveCard"><font-awesome-icon icon="trash"/> {{ $t('global.archive') }}</button></li>
            <li><button class="px-4 py-2 bg-red-900 rounded w-full" @click="handleDeleteCard"><font-awesome-icon icon="trash"/> {{ $t('global.delete') }}</button></li>
            <li><button class="px-4 py-2 bg-blue-600 rounded w-full" @click="handleDuplicateCard"><font-awesome-icon icon="clone"/> {{ $t('global.duplicate') }}</button></li>
          </ul>
        </div>

      </div>
    </div>
  </div>

    <ConfirmationDialog
      :isVisible="showDeleteCardDialog"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('modals.cardDetails.confirmMessageRemoveCard')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion('card')"
    />

    <ConfirmationDialog
      :isVisible="showDeleteChecklistDialog"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('modals.cardDetails.confirmMessageRemoveChecklist')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion('checklist')"
    />

    <ConfirmationDialog
      :isVisible="showDeleteChecklistItemDialog"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('modals.cardDetails.confirmMessageRemoveChecklistItem')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion('checklistItem')"
    />

    <ConfirmationDialog
      :isVisible="showDeleteAttachmentDialog"
      :title="$t('global.confirmDeletionTitle')"
      :message="$t('modals.cardDetails.confirmMessageRemoveAttachment')"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion('attachment')"
    />

    <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { initFlowbite } from 'flowbite';
import {
  updateTitle,
  updateDescription,
  deleteCard,
  addChecklistToCardId,
  addAttachmentToCardId,
  getAttachmentsByCardId,
  deleteAttachmentById,
  downloadAttachmentByUrl,
  archiveCardById,
  duplicateCardById
} from '@/services/cardService';
import { getTags, addTagToCardId, deleteTagById } from '@/services/tagService';
import {
  addChecklistItem,
  deleteChecklist,
  deleteChecklistItem,
  updateTitle as updateChecklistTitle,
  updateStateCheckListItemById
} from '@/services/checklistService';

import ConfirmationDialog from "@/components/dialogs/ConfirmDialog.vue";
import MemberPopover from '@/components/popovers/MemberPopover.vue';
import AddMemberToCardModal from '@/components/modals/AddMemberToCardModal.vue';
import Popup from '@/components/notifications/Popup.vue';

export default defineComponent({
  name: 'CardDetailsModal',
  components: { ConfirmationDialog, MemberPopover, AddMemberToCardModal, Popup},
  props: {
    card: {
      type: Object,
      default: null,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    boardMembers: {
      type: Array,
      required: true,
    },
    boardRole: {
      type: String,
      required: true,
    },
  },
  computed: {
    groupedActions() {
      if (!this.card || !this.card.actions) return {};
      return this.card.actions.reduce((acc, action) => {
        const date = new Date(action.createdAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(action);
        return acc;
      }, {});
    },
    sortedActionDates() {
      return Object.keys(this.groupedActions).sort((a, b) => new Date(b) - new Date(a));
    }
  },
  methods: {
    formatAction(action: any) {
      let description = action.actionType.description;
      for (const [key, value] of Object.entries(action.parameters)) {
        description = description.replace(`{${key}}`, value);
      }
      return description;
    },
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    formatDateTime(dateTimeString: string) {
      const date = new Date(dateTimeString);
      return date.toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    daysLeftForDeadline() {
      const today = new Date();
      const deadline = new Date(this.editedCard.endDate);
      const diffTime = deadline.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const store = useStore();

    const showAttachmentForm = ref(false);
    const selectedFile = ref<File | null>(null);
    const attachments = ref([]);

    const editedCard = ref({
      ...props.card,
      tags: props.card?.tags || [],
      checklists: props.card?.checklists?.map((checklist: any) => ({ ...checklist, hideCompleted: false, isEditingTitle: false })) || [],
      members: props.card?.members || [],
      attachments: props.card?.attachments || [],
      endDate: props.card?.endDate || null,
    });

    const isEditingTitle = ref(false);
    const showDeleteCardDialog = ref(false);
    const showDeleteChecklistDialog = ref(false);
    const showDeleteChecklistItemDialog = ref(false);
    const showDeleteAttachmentDialog = ref(false);
    const itemToDelete = ref({ type: '', id: 0, parentId: 0 });
    const availableTags = ref([]);
    const titleInput = ref<HTMLInputElement | null>(null);
    const showAddMemberModal = ref(false);

    const showHistory = ref(true);
    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const toggleHistory = () => {
      showHistory.value = !showHistory.value;
    };

    const viewAttachment = (attachment: any) => {
      const url = getAttachmentUrl(attachment.url);
      window.open(url, '_blank');
    };

    const downloadAttachment = async (attachment: any) => {
      try {
        const response = await downloadAttachmentByUrl(store.getters.getToken, getAttachmentUrl(attachment.url));

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

    const toggleAddMemberModal = () => {
      showAddMemberModal.value = !showAddMemberModal.value;
    };

    const handleGetAllTags = async () => {
      availableTags.value = await getTags(store.getters.getToken);
    };

    handleGetAllTags();

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        selectedFile.value = target.files[0];
      }
    };

    const handleAddAttachment = async () => {
      if (!selectedFile.value) return;

      const formData = new FormData();
      formData.append('file', selectedFile.value);

      try {
        const newAttachment = await addAttachmentToCardId(store.getters.getToken, props.card.id, formData);
        editedCard.value.attachments.push(newAttachment);
        selectedFile.value = null;
        showAttachmentForm.value = false;

        handleError('success', { message: 'Attachment added successfully' });
      } catch (error) {
        handleError('error', error);
      }
    };


    const fetchAttachments = async () => {
      try {
        const response = await getAttachmentsByCardId(store.getters.getToken, props.card.id);
        attachments.value = response.data;
      } catch (error) {
        handleError('error', error);
      }
    };

    watch(() => props.card, (newCard) => {
      editedCard.value = {
        ...newCard,
        tags: newCard?.tags || [],
        checklists: newCard?.checklists?.map((checklist: any) => ({ ...checklist, hideCompleted: false, isEditingTitle: false })) || [],
        members: newCard?.members || [],
      };

      fetchAttachments();
    });

    const getTagClass = (color: string) => {
      switch (color) {
        case 'red': return 'bg-red-400';
        case 'orange': return 'bg-orange-400';
        case 'yellow': return 'bg-yellow-400';
        case 'green': return 'bg-green-400';
        default: return 'bg-gray-400';
      }
    };

    const closeModal = () => {
      emit('close');
    };

    const handleAddTagToCard = async (tagId: bigint) => {
      try {
        const newTag = await addTagToCardId(store.getters.getToken, editedCard.value.id, tagId);
        editedCard.value.tags.push({ ...newTag });
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleDeleteTagFromCard = async (tagId: bigint) => {
      try {
        await deleteTagById(store.getters.getToken, tagId);
        editedCard.value.tags = editedCard.value.tags.filter((tag: any) => tag.id !== tagId);
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleSaveCardTitle = async () => {
      isEditingTitle.value = false;
      try {
        const response = await updateTitle(store.getters.getToken, editedCard.value.id, editedCard.value.title);

        handleError('success', response);
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleSaveChecklistTitle = async (checklist: any) => {
      checklist.isEditingTitle = false;
      try {
        const response = await updateChecklistTitle(store.getters.getToken, checklist.id, checklist.title);

        handleError('success', response);
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleSaveCardDescription = async () => {
      try {
        const response = await updateDescription(store.getters.getToken, editedCard.value.id, editedCard.value.description);

        handleError('success', response);
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleArchiveCard = async () => {
      try {
        await archiveCardById(store.getters.getToken, editedCard.value.id);
        document.location.reload();
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleDuplicateCard = async () => {
      try {
        await duplicateCardById(store.getters.getToken, editedCard.value.id);
        document.location.reload();
      } catch (error) {
        handleError('error', error);
      }
    };

    const handleDeleteCard = () => {
      showDeleteCardDialog.value = true;
      itemToDelete.value = { type: 'card', id: editedCard.value.id, parentId: 0 };
    };

    const handleDeleteChecklist = (checklistId: number) => {
      showDeleteChecklistDialog.value = true;
      itemToDelete.value = { type: 'checklist', id: checklistId, parentId: 0 };
    };

    const confirmDeleteAttachment = (attachmentId: number) => {
      itemToDelete.value = { type: 'attachment', id: attachmentId, parentId: 0 };
      showDeleteAttachmentDialog.value = true;
    };

    const handleDeleteChecklistItem = (checklistId: number, itemId: number) => {
      showDeleteChecklistItemDialog.value = true;
      itemToDelete.value = { type: 'checklistItem', id: itemId, parentId: checklistId };
    };

    const handleDeleteAttachment = (attachmentId: number) => {
      showDeleteAttachmentDialog.value = true;
      itemToDelete.value = { type: 'attachment', id: attachmentId, parentId: 0 };
    };

    const confirmDeletion = async () => {
      try {
        switch (itemToDelete.value.type) {
          case 'card':
            await deleteCard(store.getters.getToken, itemToDelete.value.id);
            closeModal();
            break;
          case 'checklist':
            await deleteChecklist(store.getters.getToken, itemToDelete.value.id);
            editedCard.value.checklists = editedCard.value.checklists.filter((cl: any) => cl.id !== itemToDelete.value.id);
            break;
          case 'checklistItem':
            await deleteChecklistItem(store.getters.getToken, itemToDelete.value.id, itemToDelete.value.parentId);
            const checklist = editedCard.value.checklists.find((cl: any) => cl.id === itemToDelete.value.parentId);
            if (checklist) {
              checklist.items = checklist.items.filter((item: any) => item.id !== itemToDelete.value.id);
            }
            break;
          case 'attachment':
            await deleteAttachmentById(store.getters.getToken, itemToDelete.value.id);
            editedCard.value.attachments = editedCard.value.attachments.filter((att: any) => att.id !== itemToDelete.value.id);
            break;
        }
      } catch (error) {
        handleError('error', error);
      } finally {
        cancelDeletion(itemToDelete.value.type);
      }
    };

    const cancelDeletion = (type: string) => {
      switch (type) {
        case 'card':
          showDeleteCardDialog.value = false;
          break;
        case 'checklist':
          showDeleteChecklistDialog.value = false;
          break;
        case 'checklistItem':
          showDeleteChecklistItemDialog.value = false;
          break;
        case 'attachment':
          showDeleteAttachmentDialog.value = false;
          break;
      }
      itemToDelete.value = { type: '', id: 0, parentId: 0 };
    };


    const handleAddChecklist = async () => {
      try {
        const checklist = await addChecklistToCardId(store.getters.getToken, editedCard.value.id);
        editedCard.value.checklists.push({
          ...checklist,
          items: [],
          hideCompleted: false,
          isEditingTitle: false,
        });
      } catch (error) {
        handleError('error', error);
      }
    };

    const toggleHideCompleted = (checklistId: number) => {
      const checklist = editedCard.value.checklists.find((cl: any) => cl.id === checklistId);
      if (checklist) {
        checklist.hideCompleted = !checklist.hideCompleted;
      }
    };

    const handleAddChecklistItem = async (checklistId: bigint) => {
      const checklist = editedCard.value.checklists.find((cl: any) => cl.id === checklistId);
      if (checklist) {
        try {
          const item = await addChecklistItem(store.getters.getToken, checklistId);
          checklist.items.push(item);
        } catch (error) {
          handleError('error', error);
        }
      }
    };

    const handleToggleChecklistItemCompletion = async (checklistItem: any) => { 
      try {
        await updateStateCheckListItemById(store.getters.getToken, checklistItem.id, checklistItem.completed);
      } catch (error) {
        handleError('error', error);
      }
    };

    const calculateProgress = (checklist: any) => {
      if (checklist.items.length === 0) return 0;
      const completedItems = checklist.items.filter((item: any) => item.completed).length;
      return (completedItems / checklist.items.length) * 100;
    };

    const startEditingTitle = () => {
      isEditingTitle.value = true;
      setTimeout(() => {
        if (titleInput.value) {
          titleInput.value.focus();
        }
      }, 0);
    };

    const startEditingChecklistTitle = (checklist: any) => {
      checklist.isEditingTitle = true;
      setTimeout(() => {
        const input = document.getElementById(`checklist-title-${checklist.id}`);
        if (input) {
          (input as HTMLInputElement).focus();
        }
      }, 0);
    };

    const getAttachmentUrl = (suffix: string) => {
      return `http://localhost:5000/uploads/${suffix}`;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isEditingTitle.value && titleInput.value && !titleInput.value.contains(event.target as Node)) {
        handleSaveCardTitle();
      }
      if (editedCard.value && editedCard.value.checklists) {
        editedCard.value.checklists.forEach((checklist: any) => {
          if (checklist.isEditingTitle) {
            const input = document.getElementById(`checklist-title-${checklist.id}`);
            if (input && !input.contains(event.target as Node)) {
              handleSaveChecklistTitle(checklist);
            }
          }
        });
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      initFlowbite();
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      showDeleteCardDialog,
      showDeleteChecklistDialog,
      showDeleteAttachmentDialog,
      editedCard,
      availableTags,
      isEditingTitle,
      titleInput,
      showAddMemberModal,
      showAttachmentForm,
      selectedFile,
      attachments,
      closeModal,
      handleSaveCardTitle,
      handleSaveCardDescription,
      handleDeleteCard,
      getTagClass,
      handleAddTagToCard,
      handleAddChecklist,
      handleAddChecklistItem,
      calculateProgress,
      handleDeleteTagFromCard,
      handleDeleteChecklist,
      handleDeleteChecklistItem,
      confirmDeletion,
      cancelDeletion,
      toggleHideCompleted,
      startEditingTitle,
      startEditingChecklistTitle,
      handleFileUpload,
      handleAddAttachment,
      getAttachmentUrl,
      handleDeleteAttachment,
      viewAttachment,
      confirmDeleteAttachment,
      toggleAddMemberModal,
      downloadAttachment,
      handleToggleChecklistItemCompletion,
      errorMessage,
      showErrorPopup,
      successMessage,
      showSuccessPopup,
      handleArchiveCard,
      showDeleteChecklistItemDialog,
      toggleHistory,
      showHistory,
      handleDuplicateCard
    };
  },
});
</script>