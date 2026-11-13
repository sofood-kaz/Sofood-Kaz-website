import { defineMiddleware } from 'astro:middleware';

/*
 * Typography pass over the finished HTML, so editors never type special
 * spaces themselves. Only text between tags is touched (never scripts,
 * styles or attributes):
 *   - "word — word"  -> non-breaking space before the dash
 *   - "40 920"       -> non-breaking space inside numbers
 *   - "4 га", "91 700 т", "40,920 t" -> number and unit stay together
 *   - one-letter words ("в", "с", "и", "a") stay with the next word
 */
const NBSP = ' ';

function typo(text: string): string {
  return text
    .replace(/ ([—–]) /g, `${NBSP}$1 `)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NBSP}`)
    .replace(/(\d) (?=(т|t|га|ha|г\.)(?=[\s.,;:)]|$))/g, `$1${NBSP}`)
    .replace(/(^|[\s(«])([А-Яа-яЁёA-Za-zҚқҒғҮүҰұӘәӨөІіҺһ]) (?=\S)/g, `$1$2${NBSP}`);
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const type = response.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) return response;

  const html = await response.text();
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/i);
  const out = parts.map((part, i) => (i % 2 === 1 ? part : typo(part))).join('');

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(out, { status: response.status, statusText: response.statusText, headers });
});
