import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useRootStore } from './stores';
import Bitrix24 from 'vue-bitrix24/Library';
import App from './App.vue';
import Bot from './Bot.vue';

Bitrix24.init().then((BX24) => {
  const app = createApp(App).use(createPinia());
  const store = useRootStore();
  store.bx24init(BX24);
  BX24.setTitle('Секретный бот 🤖');
  app.provide('$BX24', BX24).mount('#app');
  setInterval(() => BX24.fitWindow(), 1000);
}).catch(() => {
  createApp(Bot).use(createPinia()).provide('$BX24', {}).mount('#app');
});
