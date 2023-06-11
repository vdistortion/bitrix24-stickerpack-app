import { createApp } from 'vue';
import Bitrix24 from 'vue-bitrix24/Library';
import App from './App.vue';
import Bot from './Bot.vue';

const params = new URLSearchParams(window.location.search);
const isBot = params.get('BOT_ID');
const isApp = params.get('APP_SID');

if (isApp) {
  Bitrix24.init().then((BX24) => {
    createApp(App).provide('$BX24', BX24).mount('#app');
  });
} else if (isBot) {
  createApp(Bot).provide('$BX24', {}).mount('#app');
} else {
  createApp(App).provide('$BX24', {}).mount('#app');
}
