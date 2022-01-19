import Vue from 'vue';
import { Bitrix24 } from 'vue-bitrix24';
import App from './App.vue';
import StickerList from './components/StickerList.vue';
import store from './store';

Vue.config.productionTip = false;

Bitrix24.init().then(($BX24) => {
  store.commit('bx24init', $BX24);
  load(App, $BX24);
}).catch(() => {
  load(StickerList, {});
});

function load(Component, $BX24) {
  new Vue({
    store,
    provide: { $BX24 },
    render: (h) => h(Component),
  }).$mount('#app');
}
