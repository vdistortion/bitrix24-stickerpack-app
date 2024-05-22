export interface IHandlerList {
  [key: string]: <Type>(value: Type) => Type;
}
export interface IBatch {
  batch: (handlerList: IHandlerList) => void;
}

export interface IPlacement {
  placement: 'DEFAULT' | 'IM_SMILES_SELECTOR';
}

export interface IBX24 {
  setTitle: (title: string) => void;
  createBatch: (handlerList: IHandlerList) => IBatch;
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
