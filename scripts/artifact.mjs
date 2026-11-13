// Turns the built site (dist/) into a copy that runs as a claude.ai Artifact,
// for sharing review versions. The real site build is not changed.
//
//   npm run build
//   npm run artifact -- 2        (2 = version number shown in the draft note)
//
// Output: artifact/index.html (Russian, the artifact's main page),
// artifact/kz.html, artifact/en.html and artifact/assets/ (logo images).
// What changes compared with dist/:
//   - the main page loses its own <html>/<head>/<body> tags (the Artifact
//     viewer adds them) and keeps only <title>, styles and scripts
//   - web fonts are embedded as data URIs (the viewer blocks other font hosts)
//   - paths become relative; language links point to index/kz/en.html
//   - a thin "draft, version N" note sits above the header
//   - sections are visible without waiting for the scroll fade-in
import { readFile, writeFile, mkdir, cp, readdir, rm } from 'node:fs/promises';

const version = process.argv[2] ?? '1';
const today = new Date();
const date = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const out = new URL('artifact/', root);

await rm(out, { recursive: true, force: true });
await mkdir(new URL('assets/', out), { recursive: true });
for (const f of await readdir(new URL('_astro/', dist))) {
  await cp(new URL(`_astro/${f}`, dist), new URL(`assets/${f}`, out));
}

const fonts = {};
for (const f of await readdir(new URL('fonts/', dist))) {
  fonts[f] = `data:font/woff2;base64,${(await readFile(new URL(`fonts/${f}`, dist))).toString('base64')}`;
}

const notes = {
  ru: `Черновик сайта sofoodkaz.kz · версия ${version} · ${date}`,
  kz: `sofoodkaz.kz сайтының жобасы · ${version}-нұсқа · ${date}`,
  en: `Draft of sofoodkaz.kz · version ${version} · ${date}`,
};

const extraCss = `<style>
.draft-note{background:#1B211D;color:#F6F3EC;font-size:13px;line-height:1.4;padding-block:8px}
.site-header{top:env(safe-area-inset-top,0px)}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:#F6F3EC}
html.js [data-reveal]{opacity:1!important;transform:none!important}
</style>`;

const pageFile = { ru: 'index.html', kz: 'kz.html', en: 'en.html' };

function rewrite(html, lang) {
  return html
    .replace(/url\((['"]?)\/fonts\/([\w.-]+)\1\)/g, (_, q, f) => {
      if (!fonts[f]) throw new Error(`font not found: ${f}`);
      return `url(${fonts[f]})`;
    })
    .replace(/<link rel="?preload"?[^>]*>/g, '')
    .replace(/<link rel="?(icon|apple-touch-icon)"?[^>]*>/g, '')
    .replace(/\/_astro\//g, 'assets/')
    .replace(/href="\/(ru|kz|en)\/"/g, (_, l) => `href="${pageFile[l]}"`)
    .replace(/<body>/, `<body><div class="draft-note" role="note"><div class="container">${notes[lang]}</div></div>`)
    .replace('</head>', `${extraCss}</head>`);
}

// Kazakh and English: complete documents of their own.
for (const lang of ['kz', 'en']) {
  const html = rewrite(await readFile(new URL(`${lang}/index.html`, dist), 'utf8'), lang);
  await writeFile(new URL(pageFile[lang], out), html);
}

// Russian: the artifact's main page, without the document skeleton.
const ru = rewrite(await readFile(new URL('ru/index.html', dist), 'utf8'), 'ru');

// Offline preview (preview/): the same pages as complete documents, for a
// zip that colleagues open in any browser without a claude.ai account.
// The preview is a draft: search engines are asked not to index it.
const preview = new URL('preview/', root);
await rm(preview, { recursive: true, force: true });
await cp(out, preview, { recursive: true });
const noindex = (html) => html.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
await writeFile(new URL('index.html', preview), noindex(ru));
for (const f of ['kz.html', 'en.html']) {
  await writeFile(new URL(f, preview), noindex(await readFile(new URL(f, preview), 'utf8')));
}
const head = ru.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = ru.match(/<body>([\s\S]*?)<\/body>/)[1];
const styles = head.match(/<style[\s\S]*?<\/style>/g).join('\n');
const main = [
  '<title>sofoodkaz.kz</title>',
  styles,
  `<script>document.documentElement.lang='ru';document.documentElement.classList.add('js');</script>`,
  body,
].join('\n');
await writeFile(new URL('index.html', out), main);

// Sanity checks: nothing may still point at the site root.
for (const f of ['index.html', 'kz.html', 'en.html']) {
  const s = await readFile(new URL(f, out), 'utf8');
  const left = s.match(/(src|href|srcset)="\/[^/"][^"]*"|url\(\/|, \/_astro/g);
  if (left) throw new Error(`${f} still has root paths: ${left.slice(0, 3).join(' ')}`);
  for (const m of s.matchAll(/assets\/([\w.-]+)/g)) {
    await readFile(new URL(`assets/${m[1]}`, out)).catch(() => { throw new Error(`${f}: missing assets/${m[1]}`); });
  }
  console.log(`${f}: ${Math.round(s.length / 1024)} KB`);
}
console.log(`artifact/ ready (version ${version}, ${date})`);
