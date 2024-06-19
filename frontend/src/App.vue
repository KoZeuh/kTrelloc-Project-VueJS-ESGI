<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-[#0F172A]" id="all-content">
    <Navbar />

    <main class="flex-grow">
        <router-view />
    </main>


    <Footer/>
  </div>
</template>




<script lang="ts">
  import { defineComponent } from 'vue';

  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Navbar,
      Footer
    }
  });
</script>

