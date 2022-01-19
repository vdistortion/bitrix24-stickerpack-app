export default {
  scope: ['imbot'],
  placement: [],
  testDomains: ['team.bitrix24.ru', 'szdl.bitrix24.ru'],
  scripts: [],
  global: {
    appName: window.appName,
    appNameEng: window.appNameEng,
    appCodeName: window.appCodeName,
    appDirName: window.DIRNAME_APP,
    archiveName: window.ARCHIVE_NAME,
    env: window.NODE_ENV,
  },
  path: `${window.location.origin}/app/${window.DIRNAME_APP}/`,
  ajaxUrl: `/app/${window.DIRNAME_APP}/ajax/`,
  eventHandler: `${window.location.origin}/app/${window.DIRNAME_APP}/ajax/index.php`,
  handler: [window.location.origin, window.location.pathname].join(''),
};
