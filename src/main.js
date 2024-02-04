import { createApp } from 'vue';
// eslint-disable-next-line import/no-unresolved
import Bitrix24 from 'vue-bitrix24/Library';
import App from './App.vue';
import Chat from './Chat.vue';

const apps = {
  DEFAULT: App,
  IM_SMILES_SELECTOR: Chat,
};

Bitrix24.init().then((BX24) => {
  const { placement } = BX24.placement.info();
  createApp(apps[placement]).provide('$BX24', BX24).mount('#app');
}).catch(() => {
  createApp(App).provide('$BX24', null).mount('#app');
});
