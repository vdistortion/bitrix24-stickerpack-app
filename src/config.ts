const fullPath = [window.location.origin, window.location.pathname].join('');
const rootPath = fullPath.replace('dist/index.html', '').replace('index.html', '');

export default {
  global: {
    appName: 'Стикеры',
    appNameEng: 'Stickers',
    appDirName: 'bitrix24-stickerpack-app',
    archiveName: 'bitrix24-stickerpack-app.zip',
    archiveHashName: 'bitrix24-stickerpack-app.zip',
  },
  path: rootPath,
  handler: fullPath,
};
