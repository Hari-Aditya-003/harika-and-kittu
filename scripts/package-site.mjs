import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = resolve('dist');
const archive = resolve('artifacts/harika-dharmendra-invitation.zip');
await mkdir('artifacts', { recursive: true });
await rm(archive, { force: true });
execFileSync('zip', ['-qr', archive, '.'], { cwd: root });
const hashes = {};
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else hashes[relative(root, path)] = createHash('sha256').update(await readFile(path)).digest('hex');
  }
}
await collect(root);
await writeFile('artifacts/BUILD-MANIFEST.json', JSON.stringify({
  archive: relative(process.cwd(), archive),
  archive_sha256: createHash('sha256').update(await readFile(archive)).digest('hex'),
  files: hashes,
}, null, 2) + '\n');
console.log(`Packaged ${Object.keys(hashes).length} files into ${archive}`);
