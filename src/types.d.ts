declare module 'uuid';
declare module 'bitrix24-library';

interface IHandlerList {
  [key: string]: any;
}
interface IBatch {
  batch: (handlerList: IHandlerList) => any;
}

interface IPlacement {
  placement: 'DEFAULT' | 'IM_SMILES_SELECTOR';
}

interface IBX24 {
  setTitle: (title: string) => void;
  createBatch: (handlerList?: IHandlerList) => IBatch;
  getDomain: () => string;
  bind: (
    el: Window,
    event: string,
    handler: (e: KeyboardEvent) => void,
  ) => void;
  placement: {
    info: () => IPlacement;
  };
}
