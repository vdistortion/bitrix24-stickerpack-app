import getRequestList from './requestList';
import handlerList from './handlerList';

export default class BitrixBatch {
  constructor(BX24, isAdmin = false) {
    const instanceBatch = BX24.createBatch(handlerList);
    this.batch = instanceBatch.batch.bind(instanceBatch);
    this.isAdmin = isAdmin;
    this.requestList = getRequestList(isAdmin);
  }

  getBotId() {
    return this.batch(this.requestList.getBotId());
  }

  add() {
    return this.batch(this.requestList.add());
  }

  delete(botId) {
    return this.batch(this.requestList.delete(botId));
  }

  app(botId, hash) {
    return this.batch(this.requestList.app(botId, hash));
  }

  appUpdate(appId, hash) {
    return this.batch(this.requestList.appUpdate(appId, hash));
  }
}
