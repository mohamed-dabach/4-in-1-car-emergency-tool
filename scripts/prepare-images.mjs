/**
 * Converts the raw product photos into optimized WebP assets in public/images.
 * Usage: node scripts/prepare-images.mjs [sourceDir]
 * Default sourceDir: ./source-images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] || path.resolve('source-images');
const OUT = path.resolve('public/images');

const MAP = {
  'photo_5967309978202737921_y.jpg': 'hero-kit',
  'photo_5967309978202737922_y.jpg': 'kit-uses',
  'photo_5967309978202737920_x.jpg': 'vehicles',
  'photo_5967309978202737923_x.jpg': 'jump-start',
  'photo_5967309978202737929_y.jpg': 'inflate-tire',
  'photo_5967309978202737940_y.jpg': 'inflate-modes',
  'photo_5967309978202737941_x.jpg': 'four-modes',
  'photo_5967309978202737924_x.jpg': 'powerbank',
  'photo_5967309978202737925_y.jpg': 'smart-clamp',
  'photo_5967309978202737926_y.jpg': 'in-the-box',
  'photo_5967309978202737942_y.jpg': 'real-box-1',
  'photo_5967309978202737945_x.jpg': 'real-box-2',
  'photo_5967309978202737944_w.jpg': 'real-device',
  'photo_5967309978202737943_y.jpg': 'box-specs',
};

fs.mkdirSync(OUT, {recursive: true});

const found = fs.readdirSync(SRC, {withFileTypes: true, recursive: true});
const files = found.filter((d) => d.isFile());

let count = 0;
for (const [source, name] of Object.entries(MAP)) {
  const hit = files.find((f) => f.name === source);
  if (!hit) {
    console.warn(`missing: ${source}`);
    continue;
  }
  const from = path.join(hit.parentPath || hit.path, hit.name);
  await sharp(from)
    .resize({width: 1200, withoutEnlargement: true})
    .webp({quality: 82})
    .toFile(path.join(OUT, `${name}.webp`));
  count++;
}

// Social sharing image
const hero = files.find((f) => f.name === 'photo_5967309978202737921_y.jpg');
if (hero) {
  await sharp(path.join(hero.parentPath || hero.path, hero.name))
    .resize(1200, 630, {fit: 'contain', background: '#0B192C'})
    .jpeg({quality: 85})
    .toFile(path.resolve('public/og.jpg'));
}

console.log(`generated ${count} webp images in public/images`);
