import getRequestList from './requestList';
import handlerList from './handlerList';

export default class BitrixBatch {
  constructor(BX24, isAdmin = false) {
    this.callBatch = BX24.batch.bind(BX24);
    this.isAdmin = isAdmin;
    this.requestList = getRequestList(isAdmin);
  }

  getBotId() {
    return this.batch(this.requestList.getBotId());
  }

  add() {
    return this.batch(this.requestList.add());
  }

  app(botId) {
    return this.batch(this.requestList.app(botId));
  }

  appUpdate(appId) {
    return this.batch(this.requestList.appUpdate(appId));
  }

  batch(request) {
    return this.callBatch(request, handlerList);
  }
}
