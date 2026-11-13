import type { APIRoute } from 'astro';
import { LANGS, LANG_CODES, DEFAULT_LANG } from '../i18n';

// sitemap.xml with hreflang alternates for the three language versions.
export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...LANG_CODES.map((code) => `    <xhtml:link rel="alternate" hreflang="${LANGS[code].lang}" href="${origin}/${code}/"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}/${DEFAULT_LANG}/"/>`,
  ].join('\n');
  const urls = LANG_CODES.map((code) => `  <url>
    <loc>${origin}/${code}/</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
