<template>
    <div>
        <button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="fi fi-us fis mr-2"></span>
            {{ $t('navbar.choiceLanguages.english') }}
        </button>

        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="language-dropdown-menu">
            <ul class="py-2 font-medium" role="none">
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'en')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-us fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.english') }}
                        </div>
                    </button>
                </li>
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'fr')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-fr fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.french') }}
                        </div>
                    </button>
                </li>
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'es')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-es fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.spanish') }}
                        </div>
                    </button>
                </li>
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'de')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-de fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.german') }}
                        </div>
                    </button>
                </li>
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'it')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-it fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.italian') }}
                        </div>
                    </button>
                </li>
                <li>
                    <button @click.prevent="$emit('changeLanguage', 'pt')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        <div class="inline-flex items-center">
                            <span class="fi fi-pt fis mr-2"></span>
                            {{ $t('navbar.choiceLanguages.portuguese') }}
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({
        name: 'LanguageMenu',
        emits: ['changeLanguage']
    });
</script>
  