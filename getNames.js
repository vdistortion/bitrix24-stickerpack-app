import path from 'path';

const datatime = new Date().toLocaleString();
const fullPath = path.resolve(import.meta.url).split(path.sep);
export const appName = fullPath[fullPath.length - 2];
export const archiveName = `${appName}.zip`;
export const archiveHashName = `${appName}, ${datatime}.zip`;
