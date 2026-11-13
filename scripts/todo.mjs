// Lists every "[TO CONFIRM]" left in the content files.
// Run:  npm run todo
import { readFileSync } from 'node:fs';

const files = ['ru.json', 'kz.json', 'en.json', 'team.json', 'news.json'];
let total = 0;

function walk(node, path, file) {
  if (typeof node === 'string') {
    // contact.missing is the placeholder text itself, not an open item.
    if (node.includes('[TO CONFIRM') && path !== 'contact.missing') {
      total++;
      console.log(`${file}  ${path}  ->  ${node}`);
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, file));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, file);
  }
}

for (const f of files) {
  const data = JSON.parse(readFileSync(new URL(`../src/content/${f}`, import.meta.url), 'utf8'));
  walk(data, '', f);
}

// Empty contact fields also count as open items.
for (const f of ['ru.json', 'kz.json', 'en.json']) {
  const c = JSON.parse(readFileSync(new URL(`../src/content/${f}`, import.meta.url), 'utf8'));
  for (const k of ['email', 'phone']) {
    if (!c.contact[k].value) { total++; console.log(`${f}  contact.${k}.value  ->  (empty)`); }
  }
}

console.log(`\n${total} open item(s).`);
