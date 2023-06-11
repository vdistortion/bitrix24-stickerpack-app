import {
  Bitrix24, BxButtonWrapper, BxButton, BxInput, BxLink,
} from 'vue-bitrix24';
// eslint-disable-next-line import/no-unresolved
import 'vue-bitrix24/css';

const useBitrix24 = {
  install(app) {
    [BxButtonWrapper, BxButton, BxInput, BxLink].forEach((Component) => {
      app.component(Component.name, Component);
    });
  },
};

export { Bitrix24, useBitrix24 };
