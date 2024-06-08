import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';
import json from './package.json';

const archive = archiver('zip', { zlib: { level: 9 } });

archive.glob('**/*', {
  cwd: ['dist', json.name, 'browser'].join(path.sep),
  ignore: ['**/*.zip'],
});
archive.pipe(fs.createWriteStream(['src', `${json.name}.zip`].join(path.sep)));
archive.finalize().catch(console.warn);
