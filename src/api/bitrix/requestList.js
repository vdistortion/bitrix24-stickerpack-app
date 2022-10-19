import config from '../../config';

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
          EVENT_HANDLER: config.eventHandler,
          PROPERTIES: {
            NAME: config.global.appName,
          },
        },
      },
    };
  },
  app(botId) {
    return {
      app: {
        method: 'imbot.app.register',
        params: {
          BOT_ID: botId,
          CODE: config.global.appCodeName,
          IFRAME: config.handler,
          HASH: 'd41d8cd98f00b204e9800998ecf8427e',
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
  appUpdate(appId) {
    return {
      appUpdate: {
        method: 'imbot.app.update',
        params: {
          APP_ID: appId,
          FIELDS: {
            IFRAME: config.handler,
            HASH: 'd41d8cd98f00b204e9800998ecf8427e',
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
});
