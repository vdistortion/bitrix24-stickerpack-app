import { v4 as uuid } from 'uuid';
import config from '../config';

export default {
  uuid,
  isDevelopmentMode() {
    return process.env.NODE_ENV === 'development';
  },
  isDevelopmentPortal(domain) {
    return config.testDomains.includes(domain);
  },
  verifyScopeLog(scopeList, requiredList) {
    [...scopeList, ...requiredList].reduce((messages, scope) => {
      if (!scopeList.includes(scope)) messages.push(`scope "${scope}" excess`);
      if (!requiredList.includes(scope)) messages.push(`scope "${scope}" not found`);
      return messages;
    }, []).forEach((message) => {
      console.log('🔥', message);
    });
  },
};
