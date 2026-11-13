# sofoodkaz.kz

Public website of Sofood Kaz LLP (ТОО «Sofood Kaz»), part of Solico Group.
One long home page in three languages: `/ru/` (default), `/kz/`, `/en/`.

Built with [Astro](https://astro.build) 7 as a static site with plain CSS. The output is a folder of HTML, CSS, fonts and images that any web host can serve.

---

## 1. Run it on your computer

You need Node.js 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321/ru/. Pages reload when you save a file.

To build the final site into `dist/` and look at it:

```bash
npm run build
```

```bash
npm run preview
```

---

## 2. Where things are

```
src/content/ru.json  kz.json  en.json   all page text, one file per language
src/content/team.json                   team members (all three languages)
src/content/news.json                   press links (all three languages)
src/assets/photos/                      hero photo and site plan
src/assets/team/                        team portraits
src/assets/logos/                       Solico Group and Kalleh logos
src/components/                         page sections (layout, no text)
src/styles/tokens.css                   colours, fonts, sizes
public/                                 favicon, share images, fonts, robots.txt
scripts/                                helper scripts (fonts, share images, open items)
```

Text never lives in the layout files. To change wording you only edit JSON files.

---

## 3. Edit text

Open the language file, for example `src/content/ru.json`, and change the text **between the quotes after the colon**. Do not change the names before the colon, and keep commas and brackets as they are.

```json
"title": "Что мы строим в Конаеве",
```

Rules:

- Change the same item in all three files (`ru.json`, `kz.json`, `en.json`) so the languages stay in step.
- Write normal spaces and dashes. The build adds non-breaking spaces itself (before a dash, inside numbers such as 40 920, between a number and its unit, after one-letter words).
- Section labels such as `"01 — Проект"` are shown in capitals automatically.
- Lists (facilities, timeline rows, history years) can get more or fewer rows: copy or delete a whole `{ ... }` block, including its comma.
- Timeline status must be one of `done`, `now`, `planned`.
- If you change the hero headline, rebuild the share images (section 7).

**Open items.** Anything still unknown is written as `[TO CONFIRM]` and shows on the page as such. To list everything still open:

```bash
npm run todo
```

**Contacts.** In each language file set `contact.email.value` and `contact.phone.value`, for example `"value": "info@sofoodkaz.kz"` and `"value": "+7 727 000 00 00"`. When a value is empty the page shows `[TO CONFIRM]`; when it is filled the page shows a clickable email or phone link. Addresses are in `contact.site.lines` and `contact.office.lines` (one line per entry). Company name, BIN and legal address are under `footer`.

---

## 4. Add a team member

1. Open `src/content/team.json` and copy one `{ ... }` block.
2. Give it a short `id` in Latin letters, for example `"id": "aigerim-sarsenova"`.
3. Fill `name`, `role` and, if needed, `focus` in all three languages (`focus` can stay `""`).
4. Save a portrait as `src/assets/team/<id>.jpg`, for example `src/assets/team/aigerim-sarsenova.jpg`.
   Portrait format 4:5, at least 800 × 1000 px. JPG, PNG or WebP all work.

The order in the file is the order on the page. Remove the `"member-4"` placeholder block once real people are added. Without a photo the card shows a grey placeholder with "Фото: портрет".

---

## 5. Add a news item

Open `src/content/news.json` and add a block:

```json
{
  "date": "2026-12-01",
  "url": "https://example.kz/article",
  "articleLang": "ru",
  "title": { "ru": "...", "kz": "...", "en": "..." },
  "source": { "ru": "Издание", "kz": "Басылым", "en": "Publication" }
}
```

- `date` is year-month-day. The list sorts itself, newest first.
- `articleLang` is the language of the original article (`ru`, `kz` or `en`). Readers of the other languages see a note such as "на английском".
- Each row links to the original article.

---

## 6. Replace photos

Photos are found by file name. Drop the file in and rebuild; no code change.

| Where on the page | File | Shape |
|---|---|---|
| Hero, right side | `src/assets/photos/hero.jpg` | 5:6 portrait, at least 1000 × 1200 px |
| 01 The project, site plan | `src/assets/photos/site-plan.png` (or .jpg) | 15:8 landscape, at least 1600 × 853 px |
| Team portraits | `src/assets/team/<id>.jpg` | 4:5 portrait, at least 800 × 1000 px |

The build converts every image to AVIF and WebP in several sizes and sets width and height. Captions and alt texts are in the language files (`hero.photo`, `project.plan`). Update the caption so it describes the real photo, for example "Фото: стройплощадка, Конаев" and the date.

Logos are `src/assets/logos/solico-mark.png` and `kalleh.png`. Replace them with files of the same name (a larger PNG or an official version from Solico Group).

---

## 7. Share images, icons and fonts

These are generated once and stored in `public/`. Rebuild them only when needed.

- **Share images** (`public/og/og-ru.png` etc., shown when the link is posted in messengers and social networks) use the hero headline and kicker. After changing those texts:

  ```bash
  npm run og
  ```

- **Fonts** (`public/fonts/`) are Playfair (headlines, numbers, wordmark) and Golos Text (everything else), self-hosted and cut to Latin, Cyrillic and Kazakh letters. Playfair 2.0 is used instead of Playfair Display because Playfair Display has no Kazakh letters (ә ғ қ ң ө ү һ). To rebuild them (needs Python 3 with `fonttools` and `brotli`):

  ```bash
  npm run fonts
  ```

  This also rebuilds `public/favicon.svg` and the font copies the share-image script uses; run `npm run og` after it.

---

## 8. Deploy

```bash
npm run build
```

Upload the contents of `dist/` to the web root of the host. That is all the site needs: no server code, no database.

**`/` to `/ru/`.** The site root sends visitors to `/ru/`.

- Netlify and Cloudflare Pages read `public/_redirects` and answer with a proper 301.
- nginx: add `location = / { return 301 /ru/; }`.
- Apache (`.htaccess`): `RedirectMatch 301 ^/$ /ru/`.
- On any other host, `dist/index.html` redirects in the browser as a fallback.

**404 page.** `dist/404.html`. Netlify and Cloudflare Pages use it automatically. nginx: `error_page 404 /404.html;`. Apache: `ErrorDocument 404 /404.html`.

**Caching (optional).** Files under `/_astro/` get a new name whenever their content changes, so they can be cached for a year (`Cache-Control: public, max-age=31536000, immutable`). Fonts in `/fonts/` keep their names; a month is safe. HTML should not be cached long.

**Domain.** The address `https://sofoodkaz.kz` is set in `astro.config.mjs` (`site`). It is used for canonical links, hreflang, the sitemap and share images. Change it there if the domain changes.

**After going live:**

1. Open https://sofoodkaz.kz/ru/, /kz/ and /en/.
2. Submit `https://sofoodkaz.kz/sitemap.xml` in Google Search Console and Yandex Webmaster.
3. Check a share preview, for example by sending the link to yourself in Telegram.

---

## 8a. Review preview on GitHub Pages

Every push to the `main` branch builds a review preview and publishes it on GitHub Pages (workflow `.github/workflows/preview.yml`, about two minutes). The preview has the "draft, version N" note at the top (N = build number), is hidden from search engines (`noindex`) and uses `index.html` (RU), `kz.html` and `en.html`.

Text can be fixed without this computer: open `src/content/ru.json` on github.com, click the pencil icon, edit, and "Commit changes". The preview updates by itself. Progress and errors are on the repository's **Actions** tab.

This preview is not the production site. At launch, `npm run build` produces the real site in `dist/` (with `/ru/`, `/kz/`, `/en/`, sitemap and no `noindex`); see section 8.

## 8b. Share a review version as a claude.ai Artifact

To make the next version, build and export, then ask Claude to publish `artifact/index.html` (with `kz.html`, `en.html` and `assets/`) to the same artifact URL with the label "Version N":

```bash
npm run build
```

```bash
npm run artifact -- 2
```

The same command also writes `preview/`: the three pages as normal HTML files that open from disk in any browser, with no claude.ai account. Zip that folder to send it by email, Telegram or OneDrive to people who cannot open the artifact link (the v1 zip is `sofoodkaz-preview-v1.zip`; use Python's `zipfile` or 7-Zip rather than Windows PowerShell's `Compress-Archive`, whose folder names break on Macs).

The export (`scripts/artifact.mjs`) embeds the fonts, makes paths relative, links the languages as `index.html` (RU), `kz.html` and `en.html`, adds a thin "draft, version N" note at the top and shows all sections without the scroll fade-in. It does not change `dist/`.

## 9. What is built in

- **Languages:** `/ru/`, `/kz/`, `/en/`. `<html lang>` and hreflang use `ru`, `kk` (Kazakh) and `en`; `x-default` is `/ru/`. The language switcher keeps the section you are reading (`/kz/#team`).
- **SEO:** title and description per language, canonical links, Open Graph and Twitter tags with a share image per language, `sitemap.xml` with language alternates, `robots.txt` that allows everything, Organization structured data (Sofood Kaz, BIN, legal address, parent organisation Solico Group). No `noindex` anywhere.
- **Accessibility:** semantic sections and headings, skip link, visible focus outlines, real links and buttons, alt text on images, colour contrast at least 4.5:1 for text. The logo green `#07924B` is used for nothing that carries text.
- **Phone layout:** from 360 px. The navigation becomes a "Меню" button; grids stack.
- **Motion:** a subtle fade-in on scroll, switched off when the visitor's system asks for reduced motion.
- **Not included (v1):** analytics, cookie banner, contact form. Contact is by email and phone links.

## 10. Checks used before hand-over

```bash
npm run build
```

```bash
npm run preview
```

Then, against http://localhost:4322:

- Lighthouse: `npx lighthouse@13.6.0 http://localhost:4322/ru/ --view` (and `/kz/`, `/en/`; add `--preset=desktop` for desktop).
- Links: `npx linkinator@8.1.0 http://localhost:4322/ru/ http://localhost:4322/kz/ http://localhost:4322/en/ --recurse --skip "sofoodkaz\.kz"` (the sofoodkaz.kz addresses only resolve once the domain is live).
- Accessibility: axe-core (WCAG 2.2 AA rules) in the browser on each page.
