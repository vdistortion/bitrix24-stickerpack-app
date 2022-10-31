import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datatime = new Date().toLocaleString();
const fullPath = path.resolve(__dirname).split(path.sep);
const appName = fullPath[fullPath.length - 1];
const archiveName = `${appName}.zip`;
const archiveHashName = `${appName}, ${datatime}.zip`;

export {
  appName,
  archiveName,
  archiveHashName,
};
