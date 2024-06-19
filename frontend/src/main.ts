import 'flowbite';
import '@/styles/main.scss'

import { createApp } from 'vue';

import App from '@/App.vue';

import router from '@/router';

import store from '@/store';

import i18n from '@/plugins/i18n';

import { FontAwesomeIcon } from '@/plugins/fontAwesome';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(i18n);

store.dispatch('initializeStore').then(() => {
    app.use(store).use(router).mount('#app');
});
