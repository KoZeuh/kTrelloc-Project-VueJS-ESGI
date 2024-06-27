<template>
    <section class="ml-12 transform ease-in-out duration-500 px-2 md:px-5 pb-4 dark:text-white" v-if="isAuthenticated">
        <div class="container mx-auto max-w-3xl mt-8">
            <h1 class="text-2xl font-bold px-6 md:px-0">{{ $t('settings.title') }}</h1>
            <ul class="flex border-b border-gray-300 text-sm font-medium mt-3 px-6 md:px-0">
                <li class="mr-8 border-b-2 border-gray-800">
                    <a href="javascript:void(0)" class="py-4 inline-block">{{ $t('settings.profileInfos') }}</a>
                </li>
                <li class="mr-8 hover:text-gray-500">
                    <a href="javascript:void(0)" class="cursor-not-allowed py-4 inline-block">{{ $t('settings.security') }}</a>
                </li>
            </ul>
            <form @submit.prevent="handleUpdateProfile">
                <div class="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
                    <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
                        <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">{{ $t('settings.title') }}</h2>
                        <p class="text-xs text-gray-500">{{ $t('settings.profileInfosDesc') }}</p>
                    </div>
                    <div class="md:w-2/3 w-full">
                        <FormField
                            id="username"
                            :label="$t('user.username')"
                            v-model="formData.username"
                            type="text"
                            :disabled="true"
                            :class="'cursor-not-allowed'"
                        />
                        <hr class="border-gray-200">
                        <FormField
                            id="email"
                            :label="$t('user.email')"
                            v-model="formData.email"
                            type="email"
                        />
                    </div>
                </div>
                <div class="p-16 py-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200">
                    <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded uppercase cursor-pointer" :value="$t('global.save')">
                </div>
            </form>
        </div>
    </section>

    <Popup :message="successMessage" typePopup="success" :visible="showSuccessPopup"/>
    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue';
    import { useStore } from 'vuex';

    import { updateUserEmail } from '@/services/userService';

    import Popup from '@/components/notifications/Popup.vue';
    import FormField from '@/components/form/settings/Field.vue';

    export default defineComponent({
        name: 'Settings',
        components: {
            Popup,
            FormField
        },
        setup() {
            const store = useStore();
            const user = store.getters.getUser;

            const formData = reactive({
                username: user.username,
                email: user.email
            });

            const showSuccessPopup = ref(false);
            const showErrorPopup = ref(false);
            const successMessage = ref('');
            const errorMessage = ref('');

            const handleUpdateProfile = async () => {
                try {
                    if (!formData.email) {
                        return;
                    }

                    if (formData.email === user.email) {
                        return;
                    }
                    
                    const response = await updateUserEmail(store.getters.getToken, formData.email);
                    store.commit('setUser', response.user);
                    successMessage.value = response.message;
                    showSuccessPopup.value = true;
                    setTimeout(() => {
                        showSuccessPopup.value = false;
                    }, 2000);
                } catch (error) {
                    handleError(error);
                }
            };

            const handleError = (error: any) => {
                errorMessage.value = error.response.data.message;
                showErrorPopup.value = true;
                setTimeout(() => {
                    showErrorPopup.value = false;
                }, 2000);
            };

            return {
                formData,
                isAuthenticated: store.getters.isAuthenticated,
                handleUpdateProfile,
                showErrorPopup,
                showSuccessPopup,
                successMessage,
                errorMessage
            };
        }
    });
</script>
