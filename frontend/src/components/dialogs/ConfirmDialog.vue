<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="bg-white text-blue-800 p-6 rounded-lg shadow-lg z-10">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="onCancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ $t('global.dialog.cancel') }}</button>
        <button @click="onConfirm" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">{{ $t('global.dialog.confirm') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ConfirmDialog',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      }
    },
    emits: ['confirm', 'cancel'],
    methods: {
      onConfirm() {
        this.$emit('confirm');
      },
      onCancel() {
        this.$emit('cancel');
      }
    }
  });
</script>
