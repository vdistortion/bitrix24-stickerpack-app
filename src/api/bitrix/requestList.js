import config from '../../config';

export default () => ({
  sendMessage(message) {
    return {
      message: {
        method: 'im.message.add',
        params: {
          DIALOG_ID: 1,
          SYSTEM: 'Y',
          MESSAGE: message,
        },
      },
    };
  },
  app() {
    return {
      app: {
        method: 'placement.bind',
        params: {
          PLACEMENT: 'IM_SMILES_SELECTOR',
          HANDLER: config.handler,
          LANG_ALL: {
            ru: {
              TITLE: config.global.appName,
            },
            en: {
              TITLE: config.global.appNameEng,
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
          HANDLER: config.handler,
        },
      },
    };
  },
});
