export default {
  scope: ['imbot'],
  placement: [],
  testDomains: [],
  scripts: [],
  global: {
    appName: window.appName,
    appNameEng: window.appNameEng,
    appCodeName: window.appCodeName,
    appDirName: window.DIRNAME_APP,
    archiveName: window.ARCHIVE_NAME,
    env: window.NODE_ENV,
  },
  path: `${window.location.origin}/dev/${window.DIRNAME_APP}/`,
  ajaxUrl: `/dev/${window.DIRNAME_APP}/ajax/`,
  eventHandler: `${window.location.origin}/dev/${window.DIRNAME_APP}/ajax/index.php`,
  handler: [window.location.origin, window.location.pathname].join(''),
};
