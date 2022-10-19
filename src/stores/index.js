import { defineStore } from 'pinia';
import BitrixBatch from '../api/bitrix';

export const useRootStore = defineStore('root', {
  state() {
    return {
      batch: null,
      botId: null,
    };
  },

  actions: {
    bx24init(BX24) {
      this.batch = new BitrixBatch(BX24, BX24.isAdmin());
    },

    init() {
      if (!this.batch) return;

      return this.batch.getBotId().then((result) => {
        this.botId = result.botId;

        if (result.botId) {
          this.batch.app(result.botId).then((result) => this.batch.appUpdate(result.app)).then(console.log).catch(console.warn);
        } else {
          this.batch.add().then(console.log).catch(console.warn);
        }
      }).catch(console.warn);
    },
  },
});
