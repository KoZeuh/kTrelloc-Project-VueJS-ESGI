<template>
    <button @click="togglePopover" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <font-awesome-icon icon="user" class="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span class="ms-3">{{ $t('board.addNewMember') }}</span>
    </button>

    <div v-if="showPopover" class="absolute z-10 w-64 p-3 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
        <div class="flex justify-between items-center mb-2">
            <span class="mb-2 text-center">{{ $t('board.addMember') }}</span>
            <font-awesome-icon icon="xmark" class="text-red-500 cursor-pointer ml-2" @click="togglePopover"/>
        </div>

        <input v-model="usernameOrEmail" type="text" :placeholder="$t('user.emailOrUsername') " class="text-blue-400 w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:text-dark focus:ring-blue-500">

        <select v-model="role" id="role" class="text-blue-400 w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:text-dark focus:ring-blue-500">
          <option value="member">{{ $t('board.rolesOptions.member') }}</option>
          <option value="admin">{{ $t('board.rolesOptions.admin') }}</option>
        </select>


        <button @click="addMember" type="button" class="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">{{ $t('global.add') }}</button>
        
        <div data-popper-arrow></div>
    </div>

    <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>
  
<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import { addMemberToBoard } from '@/services/boardService';

    import Popup from '@/components/notifications/Popup.vue';
    
    export default defineComponent({
        name: 'AddMemberPopoverToBoard',
        props: {
            boardId: {
                type: Number,
                required: true,
            },
        },
        components: {
            Popup,
        },
        setup(props) {
            const store = useStore();
            
            const showPopover = ref(false);
            const usernameOrEmail = ref('');
            const role = ref('member');

            const showSuccessPopup = ref(false);
            const showErrorPopup = ref(false);
            const successMessage = ref('');
            const errorMessage = ref('');

        
            const togglePopover = () => {
                showPopover.value = !showPopover.value;
            };
        
            const addMember = async () => {
                if (!usernameOrEmail.value) return;
                if (!role.value) return;

                if (role.value !== 'member' && role.value !== 'admin') {
                    handleError('error', { message: 'Invalid role' });

                    return;
                }

                try {
                    const response = await addMemberToBoard(store.getters.getToken, props.boardId, usernameOrEmail.value, role.value);

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
                usernameOrEmail,
                role,
                addMember,
                showSuccessPopup,
                showErrorPopup,
                successMessage,
                errorMessage,
            };
        },
    });
</script>
  
<style scoped></style>
  