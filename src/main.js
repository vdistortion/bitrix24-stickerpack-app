import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useRootStore } from './stores';
import Bitrix24 from 'vue-bitrix24/Library';
import App from './App.vue';
import Bot from './Bot.vue';
import config from '@/config';

const params = new URLSearchParams(window.location.search);
const isBot = params.get('BOT_ID');
const isApp = params.get('APP_SID');

if (isApp) {
  Bitrix24.init(config.scripts).then((BX24) => {
    const app = createApp(App).use(createPinia());
    const store = useRootStore();
    store.bx24init(BX24);
    app.provide('$BX24', BX24).mount('#app');
  });
} else if (isBot) {
  createApp(Bot).use(createPinia()).provide('$BX24', {}).mount('#app');
} else {
  createApp(App).use(createPinia()).provide('$BX24', {}).mount('#app');
}
