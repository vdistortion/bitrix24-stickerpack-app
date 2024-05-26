import getRequestList from './requestList';
import handlerList from './handlerList';

export class BitrixBatch {
  public BX24: IBX24;
  private readonly batch: any;
  private requestList: any;

  constructor(BX24: IBX24) {
    const instanceBatch: IBatch = BX24.createBatch(handlerList);
    this.BX24 = BX24;
    this.batch = instanceBatch.batch.bind(instanceBatch);
    this.requestList = getRequestList();
  }

  sendMessage(dialogId: number, message: string) {
    return this.batch(this.requestList.sendMessage(dialogId, message));
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
