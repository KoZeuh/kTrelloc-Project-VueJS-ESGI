<template>
  <div class="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
    <div class="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
      kTrello
    </div>
    <div class="grow h-full flex items-center justify-center"></div>
    <div class="flex-none h-full text-center flex items-center justify-center">
      <div v-if="isAuthenticated" class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <UserProfileMenu :user="user" @logout="logout" />
        <OpenNavbarBtn />
      </div>
      <div v-else class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse px-3">
        <button @click="showLoginModal = true" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ $t('navbar.getStarted') }}
        </button>
        <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" />
      </div>
      <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
        <LanguageMenu @changeLanguage="handleChangeLanguage" />
        <OpenNavbarBtn />
      </div>
    </div>
  </div>

  <aside class="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]">
    <Sidebar :isAuthenticated="isAuthenticated" />
    <NavButton />
  </aside>

  <div class="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
    <Breadcrumb :currentBreadcrumb="currentBreadcrumb" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import LoginModal from '@/components/modals/LoginModal.vue';
  import UserProfileMenu from '@/components/navbar/UserProfileMenu.vue';
  import LanguageMenu from '@/components/navbar/LanguageMenu.vue';
  import Sidebar from '@/components/navbar/Sidebar.vue';
  import NavButton from '@/components/navbar/NavButton.vue';
  import Breadcrumb from '@/components/navbar/Breadcrumb.vue';
  import OpenNavbarBtn from '@/components/navbar/OpenNavbarBtn.vue';

  export default defineComponent({
    name: 'Navbar',
    components: {
      LoginModal,
      UserProfileMenu,
      LanguageMenu,
      Sidebar,
      NavButton,
      Breadcrumb,
      OpenNavbarBtn
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const { locale } = useI18n();

      const showLoginModal = ref(false);
      const errorMessage = computed(() => store.getters.getError);

      onMounted(() => {
        store.commit('clearError');
        locale.value = localStorage.getItem('language') || 'en';
        initializeSidebar();
      });

      const logout = () => {
        store.commit('logout');
        document.location.href = '/';
      };

      const currentBreadcrumb = computed(() => {
        let breadcrumb = 'TODO';
        if (route.meta.breadcrumb) {
          breadcrumb = route.meta.breadcrumb;
        }
        return breadcrumb;
      });

      const handleChangeLanguage = (language: string) => {
        locale.value = language;
        localStorage.setItem('language', language);
      };

      const initializeSidebar = () => {
        const sidebar = document.querySelector("aside");
        const maxSidebar = document.querySelector(".max");
        const miniSidebar = document.querySelector(".mini");
        const maxToolbar = document.querySelector(".max-toolbar");
        const logo = document.querySelector('.logo');
        const content = document.querySelector('.content');
        const openNavBtns = document.querySelectorAll(".openNav-btn");
        const setDarkModeBtn = document.querySelector(".setDarkMode-btn");
        const setLightModeBtn = document.querySelector(".setLightMode-btn");
        const currentTheme = localStorage.getItem("theme") || 'dark';
        const moon = document.querySelector(".moon");
        const sun = document.querySelector(".sun");

        if (setDarkModeBtn) {
          setDarkModeBtn.addEventListener("click", () => setDark("dark"));
        }

        if (setLightModeBtn) {
          setLightModeBtn.addEventListener("click", () => setDark("light"));
        }

        openNavBtns.forEach(btn => {
          btn.addEventListener("click", openNav)
        });

        function setDark(val) {
          if (val === "dark") {
            document.documentElement.classList.add('dark');
            moon.classList.add("hidden");
            sun.classList.remove("hidden");
          } else {
            document.documentElement.classList.remove('dark');
            sun.classList.add("hidden");
            moon.classList.remove("hidden");
          }
          localStorage.setItem("theme", val);
        }

        function openNav() {
          if (sidebar.classList.contains('-translate-x-48')) {
            sidebar.classList.remove("-translate-x-48");
            sidebar.classList.add("translate-x-none");
            maxSidebar.classList.remove("hidden");
            maxSidebar.classList.add("flex");
            miniSidebar.classList.remove("flex");
            miniSidebar.classList.add("hidden");
            maxToolbar.classList.add("translate-x-0");
            maxToolbar.classList.remove("translate-x-24", "scale-x-0");
            logo.classList.remove("ml-12");
            content.classList.remove("ml-12");
            content.classList.add("ml-12", "md:ml-60");
          } else {
            sidebar.classList.add("-translate-x-48");
            sidebar.classList.remove("translate-x-none");
            maxSidebar.classList.add("hidden");
            maxSidebar.classList.remove("flex");
            miniSidebar.classList.add("flex");
            miniSidebar.classList.remove("hidden");
            maxToolbar.classList.add("translate-x-24", "scale-x-0");
            maxToolbar.classList.remove("translate-x-0");
            logo.classList.add('ml-12');
            content.classList.remove("ml-12", "md:ml-60");
            content.classList.add("ml-12");
          }
        }

        setDark(currentTheme);
      };

      return {
        isAuthenticated: store.getters.isAuthenticated,
        user: store.getters.getUser,
        errorMessage,
        logout,
        showLoginModal,
        currentBreadcrumb,
        handleChangeLanguage
      };
    },
  });
</script>

<style scoped></style>
