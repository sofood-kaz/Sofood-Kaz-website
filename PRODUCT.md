# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (confirmed 15.11.2026): officers of development institutions, banks and government in Kazakhstan - Development Bank of Kazakhstan (DBK), Baiterek holding, Kazakh Invest, the Akimat of Konaev and of Almaty region. They open the site at a desk, usually after a meeting or an official letter, while preparing an internal memo or a decision paper. Their job: take away the scale of the project and its benefit for the region in figures they can quote.

Secondary (not the design driver): journalists, job seekers, suppliers of milk and services, Solico Group colleagues.

Reading languages: Russian (default), Kazakh, English.

Campaign audiences (social media campaign brief Rev0, 16.11.2026, draft for Sofood approval): families in Almaty region and Zhetisu and trade buyers are the primary audiences of the campaign, with the website as the destination of every post; officials, banks and investors are secondary there; job seekers supporting. Open decision for the owner: whether the website's primary reader changes from officials to families and trade buyers.

## Product Purpose

Public corporate website of Sofood Kaz LLP (ТОО «Sofood Kaz»), the Solico Group production company in Kazakhstan, which is building an agro-industrial dairy complex in Konaev, Almaty region.

Success: a visitor from a bank or a state body leaves with (1) the scale of the whole complex, (2) the benefit for Kazakhstan - jobs, local milk purchases, investment, (3) confidence in who stands behind it. Contacting the team is a secondary outcome.

## Positioning

A food complex under construction today in Konaev, built by a group with five decades of food manufacturing (Solico Group, the holding behind the Kalleh brand), buying raw milk from farms of the Almaty and Zhetisu regions. The claim rests on things a visitor can check: a construction site with dated progress, a named local management team, and the group's existing plants and brands.

## Operating Context

- The site supports official correspondence and meetings; it is read next to letters, a business plan and presentations, and its figures must agree with them.
- Visitors copy figures into their own documents, so every figure needs a unit, a date and, where relevant, a source.
- Content is maintained by editing JSON files, not through a CMS.

## Capabilities and Constraints

- Astro 7 static site, plain CSS, no client-side framework. Eight pages per language: home, About Solico, history, team, factory, careers, press, contact.
- All copy in `src/content/{ru,kz,en}.json`; team, brands, releases and news in their own JSON files. The 2026 redesign keeps routes and copy; only layouts that need it may ask for copy changes, and those are confirmed with the owner first.
- Kazakh must render correctly: any typeface must cover ә ғ қ ң ө ү һ ұ і.
- Unconfirmed facts stay marked `[TO CONFIRM]` (`npm run todo` lists them). Never invent figures, dates, names or contacts.
- Scale to present (confirmed 15.11.2026): the whole complex, with the cheese plant as the first step.
- Open decisions:
  - Exact whole-complex figures for publication. Internal sources differ: about USD 1.2 bn and about 5,000 jobs (letter to Baiterek/DBK), Phase 1 USD 200 m, and USD 1.38-1.9 bn in the latest master plan. Owner to give one approved set.
  - Construction progress: 23% (brief) vs about 25% (company letter of 02.11.2026).
  - Contact email and phone; four factory timeline dates; two address lines.
  - Production deploy to sofoodkaz.kz (currently a GitHub Pages preview only).

## Brand Commitments

Confirmed 15.11.2026:

- Sofood Kaz has its own approved logo; the site must use it. File not yet in the repository - owner to supply.
- Solico Group green is the mandatory main brand colour.
- Solico Group endorsement on every page: the group logo and the line "part of Solico Group".
- Company name is written "Sofood Kaz" (ТОО «Sofood Kaz», Sofood Kaz ЖШС).
- Voice: facts and dates over adjectives; short sentences; no promotional superlatives.

Owner decisions 16.11.2026:

- Opening phrase of the site is the campaign line: «От фермы до полки» / «Фермадан сөреге дейін» / "From farm to shelf".
- Public content from the 3D map: plants and products only, plus energy in one sentence without MW figures. No agro-city, land, hectares or USD figures.
- One-line illustrations, journey line plus singles; the Project sponsor portrait (Mr Gholamali Soleimani) is cleared for marketing use but not drawn yet.

## Evidence on Hand

- Cheese plant figures in the current copy: 40,920 t of products a year, 91,700 t of raw milk a year, 400 permanent jobs.
- Solico Group figures from solico-group.com (November 2026): 70+ active brands, 2,500+ product ranges, 40+ export markets, 25+ production sites, 27,000+ employees, USD 3 bn+ invested.
- 44 brand logos (`src/assets/brands/`), Solico and Kalleh logos (`src/assets/logos/`), founder portrait, seven history photographs (`src/assets/history/`).
- Named management: Director Kurmangali Amankossov, Investment Director Murat Jakishev.
- Press coverage links in `src/content/news.json`.
- Not on hand, do not fabricate: photographs of the construction site, plant, equipment and people (owner will supply); own press releases; testimonials; partner or customer names; the Sofood Kaz logo file.

## Product Principles

1. Every figure is quotable: value, unit, date, source.
2. Show the whole complex first, then the step being built now.
3. Proof before claims: site photographs, dated progress, named people, the group's record.
4. Benefit is stated for Kazakhstan: jobs, local milk, investment, exports.
5. Three languages are equal; nothing ships in one language only.

## Accessibility & Inclusion

Readable for officials on office monitors and on phones; text contrast at WCAG AA or better; all motion off under reduced-motion settings; full keyboard navigation.
