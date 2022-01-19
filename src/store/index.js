import Vue from 'vue';
import Vuex from 'vuex';
import BitrixBatch from '../api/bitrix';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      batch: null,
      botId: null,
    };
  },

  mutations: {
    bx24init(state, BX24) {
      state.batch = new BitrixBatch(BX24);
    },
  },

  actions: {
    init({ state }) {
      if (!state.batch) return;

      return state.batch.getBotId()
        .then((result) => {
          state.botId = result.botId;

          if (result.botId) {
            state.batch.app(result.botId).then((result) => state.batch.appUpdate(result.app)).then(console.log).catch(console.warn);
          } else {
            state.batch.add().then(console.log).catch(console.warn);
          }
        }).catch(console.warn);
    },
  },
});
