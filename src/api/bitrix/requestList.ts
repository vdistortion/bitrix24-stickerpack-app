import { environment } from '../../environments/environment';

const handler = [window.location.origin, window.location.pathname].join('');

export default () => ({
  sendMessage(dialogId: string, message: string) {
    return {
      message: {
        method: 'im.message.add',
        params: {
          DIALOG_ID: dialogId,
          SYSTEM: 'N',
          MESSAGE: message,
        },
      },
    };
  },
  getList() {
    return {
      list: {
        method: 'placement.get',
        params: {},
      },
    };
  },
  app() {
    return {
      app: {
        method: 'placement.bind',
        params: {
          PLACEMENT: 'IM_SMILES_SELECTOR',
          HANDLER: handler,
          LANG_ALL: {
            ru: {
              TITLE: environment.APP_NAME_RU,
            },
            en: {
              TITLE: environment.APP_NAME_ENG,
            },
          },
          OPTIONS: {
            context: 'ALL',
            role: 'USER',
            extranet: 'N',
          },
        },
      },
    };
  },
  deleteApp() {
    return {
      deleteApp: {
        method: 'placement.unbind',
        params: {
          PLACEMENT: 'IM_SMILES_SELECTOR',
        },
      },
    };
  },
});
