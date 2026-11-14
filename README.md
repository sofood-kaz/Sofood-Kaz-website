# sofoodkaz.kz

Public website of Sofood Kaz LLP (ТОО «Sofood Kaz»), part of Solico Group.
A home page and seven inner pages in three languages: `/ru/` (default), `/kz/`, `/en/`.

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

The site has a home page and seven inner pages in each language:

| Page | Address | Main text key |
|---|---|---|
| Home | `/ru/` | `hero`, `figures`, `home` |
| About Solico | `/ru/solico/` | `solico`, `brands` |
| History | `/ru/history/` | `history` |
| Our team | `/ru/team/` | `team` + `team.json` |
| The factory | `/ru/factory/` | `factory` |
| Careers | `/ru/careers/` | `careers` |
| Press | `/ru/press/` | `press` + `releases.json`, `news.json` |
| Contact | `/ru/contact/` | `contact`, `footer` |

```
src/content/ru.json  kz.json  en.json   all page text, one file per language
src/content/team.json                   team members
src/content/brands.json                 brand names (logos in src/assets/brands/)
src/content/releases.json               Sofood Kaz press releases
src/content/news.json                   press coverage (links to other sites)
src/assets/photos/                      hero photo, site plan, founder portrait
src/assets/team/                        team portraits
src/assets/brands/                      brand logos, one file per brand id
src/assets/history/                     photos for the history timeline
src/components/                         page sections (layout, no text)
src/pages/[lang]/[page].astro           which sections each page shows
src/styles/tokens.css                   colours, fonts, sizes
public/                                 favicon, share images, fonts, robots.txt
scripts/                                helper scripts
```

Text never lives in the layout files. To change wording you only edit JSON files.

---

## 3. Edit text

Open the language file, for example `src/content/ru.json`, and change the text **between the quotes after the colon**. Do not change the names before the colon, and keep commas and brackets as they are.

- Change the same item in all three files (`ru.json`, `kz.json`, `en.json`) so the languages stay in step.
- Menu names, browser-tab titles and search descriptions of each page are under `pages`.
- Write normal spaces and dashes. The build adds non-breaking spaces itself.
- Lists (facilities, timeline rows, history events) can get more or fewer rows: copy or delete a whole `{ ... }` block, including its comma.
- If you change the hero headline, rebuild the share images (section 7).

**Open items.** Anything still unknown is written as `[TO CONFIRM]` and shows on the page as such. List them with:

```bash
npm run todo
```

**Contacts.** In each language file set `contact.email.value` and `contact.phone.value`. Empty values show `[TO CONFIRM]`; filled values become clickable links.

**Careers.** The page shows the one line in `careers.lead` until vacancies are added.

---

## 4. Team

`src/content/team.json`. People with `"lead": true` are shown large at the top of the team page (now the Director and the Investment Director); everyone else appears in the smaller grid below.

To add a person: copy one `{ ... }` block, give it a short `id` in Latin letters, fill `name`, `role` and `focus` in the three languages, and save a portrait as `src/assets/team/<id>.jpg` (4:5, at least 800 x 1000 px). Without a photo the card shows a grey placeholder.

---

## 5. Press releases, news, brands, history

**Press release** (`src/content/releases.json`):

```json
{
  "date": "2026-12-01",
  "title": { "ru": "...", "kz": "...", "en": "..." },
  "text": { "ru": "...", "kz": "...", "en": "..." },
  "url": ""
}
```

`text` is a short summary shown under the headline. `url` is optional (a link to a PDF or full text).

**Press coverage** (`src/content/news.json`): `date`, `url`, `articleLang` (`ru`, `kz` or `en`), `title` and `source` in three languages. The home page shows the three newest.

**Brand** (`src/content/brands.json`): add `{ "id": "name", "name": "Name" }` and put the logo at `src/assets/brands/<id>.png` (about 300 x 150 px, transparent or white background). The order in the file is the order in the moving row.

**Brand categories** (`src/content/brand-groups.json`): the list "What the group makes" on the About Solico page; each entry has the category name in three languages and its brand names.

**History event** (`history.items` in each language file): `year` (the large pinned number), `range` (shown above the title, for example `1991–1999`), `title`, `text`, and `image` = the file name in `src/assets/history/` without extension, or `""` for no photo.

The Solico Group facts, founder biography, history and brand list follow the group's site solico-group.com (read 14.11.2026). When the group updates its figures, change them in `solico.facts` in the three language files.

---

## 6. Replace photos

Photos are found by file name. Drop the file in and rebuild; no code change.

| Where | File | Shape |
|---|---|---|
| Home, hero | `src/assets/photos/hero.jpg` | 5:6 portrait, at least 1000 x 1200 px |
| Factory, site plan | `src/assets/photos/site-plan.png` (or .jpg) | 15:8 landscape, at least 1600 x 853 px |
| About Solico, founder | `src/assets/photos/founder.jpg` | 4:5 portrait; the current one is small (472 x 590), replace it when a larger official portrait is available |
| Team portraits | `src/assets/team/<id>.jpg` | 4:5 portrait, at least 800 x 1000 px |

Captions and alt texts are in the language files.

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

Preview: https://sofood-kaz.github.io/Sofood-Kaz-website/

Every push to the `main` branch builds a review preview and publishes it on GitHub Pages (workflow `.github/workflows/preview.yml`, about two minutes). The preview has a "draft, version N" note at the top (N = build number) and is hidden from search engines (`noindex`).

Text can be fixed without this computer: open `src/content/ru.json` on github.com, click the pencil icon, edit, and "Commit changes". The preview updates by itself. Progress and errors are on the repository's **Actions** tab.

To make the same preview on this computer (it also opens straight from disk, so the `preview` folder can be zipped and sent):

```bash
npm run build
```

```bash
npm run preview:export -- 2
```

This preview is not the production site. At launch, `npm run build` produces the real site in `dist/` (sitemap, no `noindex`); see section 8.

## 9. What is built in

- **Languages:** every page exists under `/ru/`, `/kz/` and `/en/`. `<html lang>` and hreflang use `ru`, `kk` (Kazakh) and `en`. The language switcher opens the same page in the other language.
- **Interactive parts** (all in `src/layouts/Base.astro`, no libraries):
  - History: the large year stays in place and changes as events scroll past; a green line fills along the list.
  - Brands: a slow moving row of logos; it pauses on hover, on keyboard focus and with the pause button. On the history page the band opens from the centre as you reach it.
  - A thin reading-progress line under the header; the menu marks the current page.
  - Factory: the construction progress bar fills when it comes into view.
  - Soft cross-fade between pages in browsers that support it.
  - Subtle fade-in of rows and cards on scroll.
- **Motion and fallbacks:** with "reduce motion" switched on in the visitor's system, all of the above stop: the brands become a still grid and every history event shows its own year. The site also reads fully without JavaScript.
- **SEO:** title and description per page and language, canonical links, hreflang, Open Graph image per language, `sitemap.xml`, `robots.txt` that allows everything, Organization structured data on the home page. No `noindex` in the real build.
- **Accessibility:** semantic headings, skip link, visible focus outlines, alt texts, contrast at least 4.5:1 for text.
- **Phone layout:** from 360 px; the navigation becomes a "Меню" button below 1120 px.
- **Not included:** analytics, cookie banner, contact form.

## 10. Checks used before hand-over

```bash
npm run build
```

```bash
npm run preview
```

Then, against http://localhost:4322:

- Lighthouse: `npx lighthouse@13.6.0 http://localhost:4322/ru/ --view` (and the other pages; add `--preset=desktop` for desktop).
- Links: `npx linkinator@8.1.0 http://localhost:4322/ru/ http://localhost:4322/kz/ http://localhost:4322/en/ --recurse --skip "sofoodkaz\.kz"` (the sofoodkaz.kz addresses only resolve once the domain is live).
- Accessibility: axe-core (WCAG 2.2 AA rules) in the browser on each page.
