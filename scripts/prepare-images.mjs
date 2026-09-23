/**
 * Crops the product creatives into optimized WebP assets in public/images.
 * The source creatives have Arabic text baked in, so every asset is a crop
 * rectangle (left, top, width, height in source pixels), not the full image.
 *
 * Usage: node scripts/prepare-images.mjs [sourceDir]
 * Default sourceDir: ./source-images/kids
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] || path.resolve('source-images/kids');
const OUT = path.resolve('public/images');

const HERO = 'Gemini_Generated_Image_1jhrzz1jhrzz1jhr.png'; // 768x1376, hero creative
const CONTENTS = 'Gemini_Generated_Image_n6bu6en6bu6en6bu.png'; // 768x1376, pack contents creative
const PROBLEM = '1111.png'; // 1254x1254
const SOLUTION = '112.png'; // 1254x1254

/** name → [source file, crop {left, top, width, height}, output widths] */
const CROPS = {
  'hero-pack': [HERO, { left: 0, top: 395, width: 768, height: 830 }, [480, 768]],
  'pack-case': [HERO, { left: 175, top: 730, width: 360, height: 280 }, [360]],
  'pack-certificate': [HERO, { left: 405, top: 580, width: 363, height: 320 }, [360]],
  'pack-frame': [CONTENTS, { left: 122, top: 787, width: 232, height: 186 }, [360]],
  'pack-booklet': [HERO, { left: 40, top: 890, width: 540, height: 320 }, [360]],
  'problem-kid': [PROBLEM, { left: 140, top: 388, width: 1010, height: 450 }, [480, 800]],
  'solution-kid': [SOLUTION, { left: 110, top: 315, width: 1035, height: 530 }, [480, 800]],
};

fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC, { withFileTypes: true, recursive: true }).filter((d) => d.isFile());
const find = (name) => {
  const hit = files.find((f) => f.name === name);
  return hit ? path.join(hit.parentPath || hit.path, hit.name) : null;
};

let count = 0;
for (const [name, [source, crop, widths]] of Object.entries(CROPS)) {
  const from = find(source);
  if (!from) {
    console.warn(`missing: ${source}`);
    continue;
  }
  for (const [i, width] of widths.entries()) {
    // the largest width keeps the plain name, smaller ones get a -<width> suffix for srcset
    const file = i === widths.length - 1 ? `${name}.webp` : `${name}-${width}.webp`;
    await sharp(from)
      .extract(crop)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(OUT, file));
    count++;
  }
}

// Social sharing image
const hero = find(HERO);
if (hero) {
  await sharp(hero)
    .extract(CROPS['hero-pack'][1])
    .resize(1200, 630, { fit: 'contain', background: '#fff8ee' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.resolve('public/og.jpg'));
}

console.log(`generated ${count} webp images in public/images`);
