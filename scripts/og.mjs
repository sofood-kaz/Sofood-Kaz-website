// Builds the Open Graph images (public/og/og-<lang>.png) and the PNG/ICO icons
// from the content files and public/favicon.svg.
// Run after changing the hero headline:  npm run og
// Needs scripts/.og-fonts/ (created by: npm run fonts).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const read = (p) => readFile(new URL(p, root));

const fonts = [
  { name: 'Playfair', data: await read('scripts/.og-fonts/playfair.ttf'), weight: 400, style: 'normal' },
  { name: 'Golos', data: await read('scripts/.og-fonts/golos-400.ttf'), weight: 400, style: 'normal' },
  { name: 'Golos', data: await read('scripts/.og-fonts/golos-500.ttf'), weight: 500, style: 'normal' },
];

const h = (type, style, ...children) => ({ type, props: { style, children: children.length === 1 ? children[0] : children } });

await mkdir(new URL('public/og/', root), { recursive: true });

for (const lang of ['ru', 'kz', 'en']) {
  const c = JSON.parse(await read(`src/content/${lang}.json`));
  const tree = h('div', {
    width: 1200, height: 630, display: 'flex', position: 'relative',
    background: '#F6F3EC', color: '#1B211D', fontFamily: 'Golos',
  }, h('div', {
    position: 'absolute', top: 64, left: 72, right: 72, bottom: 64,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
    h('div', { display: 'flex', flexDirection: 'column' },
      h('div', { fontFamily: 'Playfair', fontSize: 52, color: '#0A5E33', lineHeight: 1 }, c.brand.name),
      h('div', { fontSize: 22, color: '#5B625C', marginTop: 10, letterSpacing: 1 }, c.brand.tagline),
    ),
    h('div', { fontFamily: 'Playfair', fontSize: 64, lineHeight: 1.08, maxWidth: 1000, letterSpacing: -0.5 }, c.hero.title),
    h('div', { display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1B211D', paddingTop: 20, fontSize: 22, color: '#3B423D' },
      h('div', {}, c.hero.kicker),
      h('div', { fontWeight: 500, color: '#0A5E33' }, 'sofoodkaz.kz'),
    ),
  ));
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(new URL(`public/og/og-${lang}.png`, root), await sharp(png).png({ compressionLevel: 9, palette: true }).toBuffer());
  console.log(`og-${lang}.png`);
}

// Icons from the favicon SVG.
const icon = await read('public/favicon.svg');
await sharp(icon, { density: 1200 }).resize(180, 180).png().toFile(new URL('public/apple-touch-icon.png', root).pathname.replace(/^\/(\w:)/, '$1'));
await sharp(icon, { density: 1200 }).resize(512, 512).png().toFile(new URL('public/icon-512.png', root).pathname.replace(/^\/(\w:)/, '$1'));
const png32 = await sharp(icon, { density: 300 }).resize(32, 32).png().toBuffer();
// ICO container holding one 32x32 PNG.
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(png32.length, 14); head.writeUInt32LE(22, 18);
await writeFile(new URL('public/favicon.ico', root), Buffer.concat([head, png32]));
console.log('icons written');
