// Fails if one platform's build picked up the other platform's code.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const listFiles = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => join(entry.parentPath, entry.name));

const checks = [
  { dir: 'build/web', forbiddenFile: '.native.', forbiddenImport: /from ['"]react-native['"]/ },
  { dir: 'build/native', forbiddenFile: '.web.', forbiddenImport: /from ['"]react-dom['"]/ },
];

const errors = checks.flatMap(({ dir, forbiddenFile, forbiddenImport }) =>
  listFiles(dir).flatMap((file) => [
    ...(file.includes(forbiddenFile) ? [`${file}: file belongs to the other platform`] : []),
    ...(forbiddenImport.test(readFileSync(file, 'utf8')) ? [`${file}: imports the other platform's renderer`] : []),
  ]),
);

if (errors.length > 0) {
  console.error(`Platform leak in build output:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('check-build: web and native outputs are separate');
