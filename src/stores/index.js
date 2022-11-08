import { defineStore } from 'pinia';
import BitrixBatch from '../api/bitrix';

export const useRootStore = defineStore('root', {
  state() {
    return {
      batch: null,
      botId: null,
      hash: '',
    };
  },

  actions: {
    bx24init(BX24) {
      const { member_id } = BX24.getAuth();
      this.hash = member_id;
      this.batch = new BitrixBatch(BX24, BX24.isAdmin());
    },

    init() {
      if (!this.batch) return;

      return this.batch.getBotId().then((result) => {
        this.botId = result.botId;

        if (result.botId) {
          this.batch.app(result.botId, this.hash)
            .then((result) => this.batch.appUpdate(result.app, this.hash))
            .then(console.log)
            .catch(console.warn);
        } else {
          this.batch.add()
            .then((result) => this.batch.app(result.add, this.hash))
            .then((result) => this.batch.appUpdate(result.app, this.hash))
            .then(console.log)
            .catch(console.warn);
        }
      }).catch(console.warn);
    },
  },
});
