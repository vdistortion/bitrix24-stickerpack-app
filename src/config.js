export default {
  scope: ['imbot'],
  placement: [],
  testDomains: [],
  scripts: [],
  global: {
    appName: 'Стикеры в Битрикс24 (7 наборов)',
    appNameEng: 'Bitrix24 Stickers (7 packs)',
    appCodeName: 'bitrix24-stickerpack-bot',
    appDirName: window.DIRNAME_APP,
    archiveName: window.ARCHIVE_NAME,
    archiveHashName: window.ARCHIVE_HASH_NAME,
    mode: window.MODE,
  },
  path: `${window.location.origin}/dev/${window.DIRNAME_APP}/`,
  eventHandler: `${window.location.origin}/dev/${window.DIRNAME_APP}/handlers/eventHandler.php`,
  handler: [window.location.origin, window.location.pathname].join(''),
};
