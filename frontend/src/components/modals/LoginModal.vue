<template>
  <div v-if="isVisible" class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">

      <div class="relative bg-white rounded-lg shadow">
        <button @click="closeModal" type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
            aria-hidden="true" class="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                cliprule="evenodd"></path>
        </svg>
          <span class="sr-only">Close popup</span>
        </button>

        <div class="p-5">
          <h3 class="text-2xl mb-0.5 font-medium"></h3>
          <p class="mb-4 text-sm font-normal text-gray-800"></p>

          <div class="text-center">
            <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              {{ $t('login.loginToYourAccount') }}
            </p>
            <p class="mt-2 text-sm leading-4 text-slate-600">
              {{ $t('login.youMustBeLoggedIn') }}
            </p>
          </div>

          <div class="mt-7 flex flex-col gap-2">
  
            <button
                class="cursor-not-allowed inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                class="h-[18px] w-[18px]" disabled>
              {{ $t('login.continueWith') }} GitHub
            </button>

            <button
                class="cursor-not-allowed inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                class="h-[18px] w-[18px]" disabled>{{ $t('login.continueWith') }} Google
            </button>
          </div>

          <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div class="h-px w-full bg-slate-200"></div>
            {{ $t('global.or') }}
            <div class="h-px w-full bg-slate-200"></div>
          </div>


          <form class="w-full" @submit.prevent="handleLoginSubmit">
            <label for="email" class="sr-only">{{ $t('user.email') }}</label>
            <input name="email" v-model="email" type="email" id="email" autocomplete="email" required
                   class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                   :placeholder="$t('user.email')" value="">
            <label for="password" class="sr-only">{{ $t('user.password') }}</label>
            <input v-model="password" type="password" id="password" name="password" autocomplete="current-password" required
                   class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                   :placeholder="$t('user.password')" value="">
            <p class="mb-3 mt-2 text-sm text-gray-500">
              <a href="/forgot-password" class="text-blue-800 hover:text-blue-600">{{ $t('login.resetPassword') }}</a>
            </p>
            <button type="submit"
                    class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
              {{ $t('global.validate') }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-600">
            {{ $t('login.dontHaveAnAccount') }}
            <a href="javascript:void(0)" @click="openRegisterModal" class="font-medium text-[#4285f4]">{{ $t('login.signup') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Popup :message="errorMessage" typePopup="error" :visible="showErrorPopup"/>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from "vuex";

  import Popup from '@/components/notifications/Popup.vue';

  export default defineComponent({
    name: 'LoginModal',
    components: { Popup },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['close', 'signup'],
    setup(props, { emit }) {
      const store = useStore();
      const email = ref('');
      const password = ref('');

      const showErrorPopup = ref(false);
      const errorMessage = ref('');

      const closeModal = () => {
        emit('close');
      };

      const openRegisterModal = () => {
        emit('signup');
      };

      const handleLoginSubmit = async () => {
        try {
          await store.dispatch('loginUser', { email: email.value, password: password.value });
        } catch(error) {
          errorMessage.value = error.response.data.message;
          showErrorPopup.value = true;

          setTimeout(() => {
            showErrorPopup.value = false;
          }, 2000);
        }
      };

      return {
        closeModal,
        openRegisterModal,
        handleLoginSubmit,
        email,
        password,
        errorMessage,
        showErrorPopup,
      };
    },
  });
</script>

<style scoped></style>
