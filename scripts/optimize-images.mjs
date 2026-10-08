import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const assets = fileURLToPath(new URL('../src/assets/', import.meta.url));
const files = (await readdir(assets)).filter((filename) => filename.endsWith('.jpg'));
let originalSize = 0;
let optimizedSize = 0;

for (const filename of files) {
  const source = path.join(assets, filename);
  const output = path.join(assets, filename.replace(/\.jpg$/, '.webp'));
  const width = filename === 'img1.jpg' ? 1600 : filename === 'img2.jpg' ? 1200 : 800;
  await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output);
  originalSize += (await stat(source)).size;
  optimizedSize += (await stat(output)).size;
}

console.log(`${files.length} imágenes: ${(originalSize / 1e6).toFixed(2)} MB → ${(optimizedSize / 1e6).toFixed(2)} MB (${(100 * (1 - optimizedSize / originalSize)).toFixed(1)}% menos).`);
