<template>
    <section class="ml-12 px-2 md:px-5 pb-4">
        <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div class="lg:flex lg:flex-wrap">
                    <div class="px-4 md:px-0 lg:w-6/12">
                        <div class="md:mx-6 md:p-12">
                            <div class="text-center">
                                <img class="mx-auto w-48" src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                                <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">{{ $t('register.title') }}</h4>
                            </div>

                            <form @submit.prevent="handleRegisterSubmit">
                                <p class="mb-4">{{ $t('register.pleaseRegisterAnAccount') }}</p>

                                <FormField
                                    v-model="username"
                                    type="text"
                                    :label="$t('user.username')"
                                    :placeholder="$t('user.username')"
                                    id="username"
                                />
                                <FormField
                                    v-model="email"
                                    type="email"
                                    :label="$t('user.email')"
                                    :placeholder="$t('user.email')"
                                    id="email"
                                />
                                <FormField
                                    v-model="password"
                                    type="password"
                                    :label="$t('user.password')"
                                    :placeholder="$t('user.password')"
                                    id="password"
                                />

                                <div class="mb-12 pb-1 pt-1 text-center">
                                    <button
                                        class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        type="submit"
                                        style="background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);">
                                        {{ $t('login.signup') }}
                                    </button>
                                    <a href="#!">{{ $t('register.termsAndConditions') }}</a>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none">
                        <div class="px-4 py-6 text-white md:mx-6 md:p-12">
                            <h4 class="mb-6 text-xl font-semibold">{{ $t('register.company.title') }}</h4>
                            <p class="text-sm">{{ $t('register.company.description') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { createUser, loginUser } from '@/services/userService';
import Popup from '@/components/notifications/Popup.vue';
import FormField from '@/components/form/register/Field.vue';

export default defineComponent({
    name: 'Register',
    components: {
        Popup,
        FormField
    },
    setup() {
        const store = useStore();

        const username = ref('');
        const email = ref('');
        const password = ref('');

        const showErrorPopup = ref(false);
        const errorMessage = ref('');

        onMounted(() => {
            store.commit('clearError');
        });

        const handleRegisterSubmit = async () => {
            try {
                const userData = { username: username.value, email: email.value, password: password.value };

                await createUser(userData);
                
                await store.dispatch('loginUser', { email: email.value, password: password.value });
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
            username,
            email,
            password,
            handleRegisterSubmit,
            showErrorPopup,
            errorMessage
        };
    },
});
</script>
