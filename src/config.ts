import { environment } from './environments/environment';

const fullPath = [window.location.origin, window.location.pathname].join('');
const rootPath = fullPath
  .replace('dist/index.html', '')
  .replace('index.html', '');

export default {
  global: {
    appName: 'Стикеры',
    appNameEng: 'Stickers',
    appDirName: environment.APP_NAME,
    archiveName: `${environment.APP_NAME}.zip`,
    archiveHashName: `${environment.APP_NAME}.zip`,
  },
  path: rootPath,
  handler: fullPath,
};
