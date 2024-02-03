import getRequestList from './requestList';
import handlerList from './handlerList';

export default class BitrixBatch {
  constructor(BX24, isAdmin = false) {
    const instanceBatch = BX24.createBatch(handlerList);
    this.batch = instanceBatch.batch.bind(instanceBatch);
    this.isAdmin = isAdmin;
    this.requestList = getRequestList(isAdmin);
  }

  sendMessage(message) {
    return this.batch(this.requestList.sendMessage(message));
  }

  getList() {
    return this.batch(this.requestList.getList());
  }

  app() {
    return this.batch(this.requestList.app());
  }

  deleteApp() {
    return this.batch(this.requestList.deleteApp());
  }
}
