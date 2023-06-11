import fs from 'fs';
import archiver from 'archiver';
import { archiveName } from './getNames.js';

const archive = archiver('zip', { zlib: { level: 9 } });
const output = fs.createWriteStream(archiveName);
const path = (path) => ['dist', path].join('/');
const list = [
  {
    file: false,
    name: 'assets',
  },
  {
    file: false,
    name: 'stickers',
  },
  {
    file: true,
    name: 'index.html',
  },
];

list.forEach(({ file, name }) => {
  if (file) archive.file(path(name), { name });
  else archive.directory(path(name), name, null);
});

archive.pipe(output);
archive.finalize().catch(console.warn);
