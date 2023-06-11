import config from '../../config';
import icon from '../../assets/icon.png';

const file = icon.replace('data:image/png;base64,', '');

export default () => ({
  getBotId() {
    return {
      botId: ['imbot.bot.list'],
    };
  },
  add() {
    return {
      add: {
        method: 'imbot.register',
        params: {
          CODE: config.global.appCodeName,
          EVENT_HANDLER: config.handler,
          PROPERTIES: {
            NAME: config.global.appName,
          },
        },
      },
    };
  },
  delete(botId) {
    return {
      deleteBot: {
        method: 'imbot.unregister',
        params: {
          BOT_ID: botId,
        },
      },
    };
  },
  app(botId, hash) {
    return {
      app: {
        method: 'imbot.app.register',
        params: {
          BOT_ID: botId,
          CODE: config.global.appCodeName,
          IFRAME: config.handler,
          HASH: hash,
          ICON_FILE: file,
          LANG: [
            {
              LANGUAGE_ID: 'ru',
              TITLE: config.global.appName,
            },
            {
              LANGUAGE_ID: 'en',
              TITLE: config.global.appNameEng,
            },
          ],
        },
      },
    };
  },
  appUpdate(appId, hash) {
    return {
      appUpdate: {
        method: 'imbot.app.update',
        params: {
          APP_ID: appId,
          FIELDS: {
            IFRAME: config.handler,
            HASH: hash,
            ICON_FILE: file,
            LANG: [
              {
                LANGUAGE_ID: 'ru',
                TITLE: config.global.appName,
              },
              {
                LANGUAGE_ID: 'en',
                TITLE: config.global.appNameEng,
              },
            ],
          },
        },
      },
    };
  },
  deleteApp(appId) {
    return {
      deleteApp: {
        method: 'imbot.app.unregister',
        params: {
          APP_ID: appId,
        },
      },
    };
  },
});
