import config from '../../config';

export default {
  botId(list) {
    const bot = Object.values(list).find((b) => b.CODE === config.global.appCodeName);
    return bot ? bot.ID : null;
  },
};
