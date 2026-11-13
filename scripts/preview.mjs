// Turns the built site (dist/) into a review preview (preview/) that works
// from any folder: a GitHub Pages sub-path or straight from disk.
// The real site build in dist/ is not changed.
//
//   npm run build
//   npm run preview:export -- 2      (2 = version number in the draft note)
//
// What changes compared with dist/:
//   - every root path ("/ru/team/", "/fonts/x.woff2") becomes relative
//   - links to folders get "index.html" so they open from disk too
//   - a thin "draft, version N" note sits above the header
//   - search engines are asked not to index it (noindex)
import { readFile, writeFile, cp, readdir, rm } from 'node:fs/promises';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const version = process.argv[2] ?? '1';
const now = new Date();
const date = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const out = join(root, 'preview');

await rm(out, { recursive: true, force: true });
await cp(dist, out, { recursive: true });
await rm(join(out, 'robots.txt'), { force: true });
await rm(join(out, 'sitemap.xml'), { force: true });
await rm(join(out, '_redirects'), { force: true });

const notes = {
  ru: `Черновик сайта sofoodkaz.kz · версия ${version} · ${date}`,
  kz: `sofoodkaz.kz сайтының жобасы · ${version}-нұсқа · ${date}`,
  en: `Draft of sofoodkaz.kz · version ${version} · ${date}`,
};
const noteCss = '<style>.draft-note{background:#1B211D;color:#F6F3EC;font-size:13px;line-height:1.4;padding-block:8px}</style>';

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const withIndex = (path) => (path === '' || path.endsWith('/') ? `${path}index.html` : path);

let count = 0;
for await (const file of walk(out)) {
  const rel = relative(out, file).split(sep);
  const prefix = '../'.repeat(rel.length - 1);
  const lang = ['ru', 'kz', 'en'].includes(rel[0]) ? rel[0] : 'ru';
  let html = await readFile(file, 'utf8');

  html = html
    // href="/ru/team/" -> "../../ru/team/index.html", src="/_astro/x" -> "../../_astro/x"
    .replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, path) => {
      const [p, hash = ''] = path.split('#');
      const target = attr === 'href' && !/\.[a-z0-9]+$/i.test(p) ? withIndex(p) : p;
      return `${attr}="${prefix}${target}${hash ? `#${hash}` : ''}"`;
    })
    .replace(/srcset="([^"]*)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)\//g, `$1${prefix}`)}"`)
    .replace(/url\((['"]?)\/(?!\/)/g, `url($1${prefix}`)
    .replace(/(http-equiv="refresh" content="0; ?url=)\/([^"]*)"/, (_, a, p) => `${a}${prefix}${withIndex(p)}"`)
    .replace('</head>', `<meta name="robots" content="noindex, nofollow">${noteCss}</head>`);

  if (html.includes('class="site-header')) {
    html = html.replace(/<body([^>]*)>/, `<body$1><div class="draft-note" role="note"><div class="container">${notes[lang]}</div></div>`);
  }

  const left = html.match(/(href|src)="\/[^/"][^"]*"|url\(\/[^/]/g);
  if (left) throw new Error(`${file} still has root paths: ${left.slice(0, 3).join(' ')}`);
  await writeFile(file, html);
  count++;
}
console.log(`preview/ ready: ${count} pages (version ${version}, ${date})`);
