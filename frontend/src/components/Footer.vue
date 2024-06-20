<template>
  <footer class="fixed-bottom bg-gray-700 px-4 pt-20">
    <div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2"><img class="h-full object-contain" src="" alt="" /></div>
    <nav aria-label="Footer Navigation" class="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
      <a href="#" class="font-medium text-white">{{ $t('footer.demo') }}</a>
      <a href="#" class="font-medium text-white">{{ $t('footer.support') }}</a>
      <a href="#" class="font-medium text-white">{{ $t('footer.privacyPolicy') }}</a>
      <a href="#" class="font-medium text-white">{{ $t('footer.termsAndConditions') }}</a>
    </nav>
    <p class="py-10 text-center text-gray-300">© 2024 kTrelloc | {{ $t('footer.copyright.allRightsReserved') }}</p>
  </footer>

</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({name: 'Footer'});
</script>
  
<style scoped>
</style>