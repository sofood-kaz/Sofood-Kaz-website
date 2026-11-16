---
name: Sofood Kaz
description: Corporate site of Sofood Kaz LLP drawn as one printed map sheet of the Almaty and Zhetisu regions.
colors:
  land: "#0A5E33"
  deep: "#06321D"
  milk: "#FBFAF4"
  milk-2: "#D5E6DA"
  water: "#0B4638"
  shore: "#BFD8D2"
  river: "#8CCBDD"
  contour: "#1F7446"
  contour-index: "#2E8556"
  mark: "#F2C230"
  white: "#EFF4EC"
  ink-2: "#2F4A3A"
  ink-3: "#4A6354"
  rule: "#C3D2C7"
  legend-rule: "#A9BFB0"
  placeholder: "#DCE6DD"
typography:
  display:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.008em"
  headline:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.008em"
  title:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "clamp(1.9rem, 2.9vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum', 'lnum'"
  label:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  label-small:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  nav:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    letterSpacing: "0.07em"
  furniture:
    fontFamily: "'PT Sans Narrow', 'Arial Narrow', 'Roboto Condensed', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  sheet-pad: "14px"
  gutter: "40px"
  col-gap: "40px"
  section-y: "96px"
  header-h: "66px"
components:
  sheet-button:
    backgroundColor: "{colors.land}"
    textColor: "{colors.milk}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "48px"
  sheet-button-hover:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.milk}"
  legend-panel:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.deep}"
    rounded: "{rounded.none}"
    padding: "16px 22px 18px"
  margin-bar:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.milk}"
    typography: "{typography.nav}"
    height: "{spacing.header-h}"
    padding: "0 24px"
  margin-foot:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.milk-2}"
    typography: "{typography.furniture}"
    padding: "6px 24px"
  page-head:
    backgroundColor: "{colors.land}"
    textColor: "{colors.milk}"
    typography: "{typography.display}"
    padding: "72px 40px 64px"
  band-green:
    backgroundColor: "{colors.land}"
    textColor: "{colors.milk}"
  band-ink:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.milk}"
  band-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep}"
  state-mark:
    backgroundColor: "{colors.deep}"
    rounded: "{rounded.none}"
    size: "14px"
---

# Design System: Sofood Kaz

## Overview

**Creative North Star: "The Map Sheet"**

Every page is one printed map sheet. The browser window is the deep green margin of the sheet; a 2px milk line frames the content inside it; the top is a margin bar with the name, the Solico Group endorsement, navigation and language. The home page opens on a drawn map of the Almaty and Zhetisu regions (Natural Earth linework, contours from open elevation tiles) with the complex in Konaev marked in yellow, a milk legend panel that is the table of key figures, an inset site photograph and a foot margin with conventional signs, credit and a measured scale bar.

Inner pages keep the sheet frame and the margin bar but read on milk grounds. Each opens with a green land page head set over the relief of the region, and green or deep bands break the milk sections. Components are map furniture: legend panels, hairline tables, state marks, scale bars, place labels. The density is that of a reference sheet: tables and rows with rules, few panels, no cards.

The system refuses the corporate hero photograph with a stats row and cards. Photographs appear as framed insets or plates with a caption strip, never as a full-bleed mood image.

**Key Characteristics:**
- One sheet per page: deep margin, 2px milk frame line, square corners throughout.
- Solico green land is the main ground; milk is linework, panels and reading ground.
- One yellow, reserved for the complex.
- State is a mark (solid, hatch, outline), never a hue.
- Condensed capitals for labels and furniture; tabular numerals for figures.
- Three equal languages (RU, KZ, EN); every face covers Kazakh letters.

## Colors

A two-green map palette with milk linework and one road-yellow marker; water is darker than the land, not paler.

### Primary
- **Solico Land Green** (`land`): the ground of the home map, page heads, green bands and the primary button. On milk grounds it is also the link, accent-figure and progress-fill colour (aliased in code as `--green`).
- **Sheet Margin Green** (`deep`): the page margin around the frame, the margin bar, foot margin, footer, inset caption strips and the button hover. On milk grounds it is the ink for text and heavy rules (aliased as `--ink` and `--legend-ink`).

### Secondary
- **Complex Yellow** (`mark`): the complex plot and its hatch, the Konaev label, the 23% figure on the green stage, the complex sign in the foot margin, focus rings on dark grounds and text selection. Nothing else.

### Tertiary
- **River Blue** (`river`): river lines and water names on the map, and the river sign in the foot margin.
- **Reservoir Teal** (`water`): fill of lakes and reservoirs. Dark, with a pale outline.
- **Shoreline** (`shore`): the 1.2px outline of water bodies.
- **Contour** and **Index Contour** (`contour`, `contour-index`): relief lines on the land, 1px and 1.4px (every 1000 m).

### Neutral
- **Milk** (`milk`): frame line, roads, borders, labels and text on green; legend panels; the reading ground of inner pages (aliased as `--paper`).
- **Milk Secondary** (`milk-2`): secondary text on green and deep grounds, region names, the reading-progress line.
- **Sheet Tint** (`white`): the tinted milk band that alternates with plain milk on inner pages.
- **Ink Secondary** (`ink-2`) and **Ink Tertiary** (`ink-3`): body prose and captions on milk grounds.
- **Rule** (`rule`) and **Legend Rule** (`legend-rule`): 1px hairlines between rows on milk grounds and inside the legend.
- **Placeholder** (`placeholder`): ground of a photograph that has not been supplied.

### Named Rules
**The Reserved Yellow Rule.** Yellow belongs to the complex: its plot, its name, its progress figure. The only other uses are focus rings on dark grounds and selection. It is never a button, a band, a link or a decoration.

**The Dark Water Rule.** Water is darker than land with a pale shoreline. Rivers and water names carry the only blue on the sheet.

**The Re-pointed Tokens Rule.** Green and deep bands do not get their own components. They re-point the ink, rule, link and placeholder tokens to milk values, so the same component reads on either ground.

## Typography

**Display Font:** PT Sans Narrow 400 and 700 (with Arial Narrow, Roboto Condensed, sans-serif)
**Body Font:** Golos Text 400 to 600 (with system-ui, Segoe UI, Roboto, Arial, sans-serif)

**Character:** A condensed grotesque for everything that is a map label, a heading or a figure, and a plain humanist sans for reading. PT Sans Narrow was chosen because it covers the Kazakh letters ә ғ қ ң ө ү һ ұ і in both weights; Sofia Sans Condensed was rejected for lacking them. Both faces are self-hosted in latin, cyrillic and cyrillic-ext subsets.

### Hierarchy
- **Display** (700, clamp 40 to 76px, line-height 0.98): the home headline and the h1 of every page head, set on the land. The home headline tightens to -0.012em.
- **Headline** (700, clamp 32 to 48px, line-height 1.08): section headings. A larger step (clamp 34 to 56px) is used for the contact and founder titles.
- **Title** (Golos 600, clamp 20 to 24px, line-height 1.25): row and column headings inside sections.
- **Body** (Golos 400, 17px, line-height 1.55): prose, in secondary ink, kept to about 34em to 640px wide. Lead paragraphs are 19px.
- **Figure** (PT Sans Narrow 700, tabular lining numerals, line-height 1 or tighter): legend figures at clamp 1.9 to 2.6rem; the progress figure scales up to 6rem on the stage and 8rem on the factory page.
- **Label** (PT Sans Narrow 700, 15 to 16px, 0.12 to 0.14em, uppercase): a heading in the manner of a legend title, used as the heading itself.
- **Small label** (Golos 600, 13px, 0.12em, uppercase): headings of short lists and contact items, and roles.
- **Furniture** (PT Sans Narrow 400, 14px, 0.06em, uppercase): foot margin, caption strips, scale steps. Navigation is the same voice at 17px, 0.07em.
- **Map labels** (PT Sans Narrow, sized in map units): cities uppercase and tracked; regions uppercase, widely tracked, at 0.8 opacity; water names italic in river blue; the river name upright and larger; the complex name 700 in yellow.

### Named Rules
**The Label-Is-The-Heading Rule.** A capital label is a heading in its own right, as on a legend. It is never stacked above another heading as a kicker or eyebrow. Page heads carry a title and an optional lead, nothing above them.

**The Quotable Figure Rule.** A figure is set in the narrow face with tabular numerals, with its unit beside it and its description, date and source directly under it.

**The Knock-Out Rule.** Type on the map or on the relief clears the linework behind it: map labels by a land-coloured stroke painted under the fill, headings by a land-coloured halo, and the home headline also by a land backing behind each line.

## Layout

The page body is padded by the sheet margin (14px; 8px at 760px and below) on the deep ground. Inside it the sheet frame is a column at least the height of the window: sticky margin bar, main, footer. The last block of main grows to fill the sheet.

Inner content sits in a 1280px container with 40px gutters on a 12-column grid with 40px gaps; sections have 96px block padding. At 900px and below the gutter is 20px, the gap 24px, the section padding 64px, and all spans collapse to one column.

The home sheet is one screen tall on desktop (clamped 580 to 940px): the map fills the body, the headline sits upper left at up to 46% width, the legend lower left at up to 600px or 44%, the inset lower right, the foot margin across the bottom. At 1020px and below the sheet becomes a grid: headline, the map as a 16:9 band with frame lines, foot margin, then legend and inset side by side. At 760px and below it is a single column and a second, closer framing of the same map is shown square.

The margin bar collapses its navigation into a framed menu button at 1020px and below; the group logo hides at 760px and below.

## Elevation & Depth

The system is flat. Depth is conveyed by ground (deep, land, milk), by 2px milk frame lines between grounds, and by the knock-out of type over linework. Bands and sections never cast shadows.

### Shadow Vocabulary
- **Panel on the map** (`box-shadow: 0 10px 28px -8px rgba(3, 26, 15, 0.55)`): only the legend panel and the photo inset while they float over the home map on desktop. Removed at 1020px and below, where they become flat cells of the grid.
- **Frame line under the sticky bar** (`box-shadow: 0 2px 0 #FBFAF4`): a drawn line, not a shadow.
- **Knock-out halo** (`text-shadow` in the land colour, 6 to 20px): headings over relief; see Typography.

### Named Rules
**The Lies-On-The-Map Rule.** A soft shadow appears only under a panel that lies on top of the drawn map. Anything on a plain ground is flat.

## Shapes

Every panel, button, frame, bar and photograph has square corners (0px). Structure is drawn with lines: 2px milk for sheet frames, band edges, inset frames and the stage divider; 2px ink for the top rule of a table; 1.5px for marks, bars and the menu button; 1px for hairlines between rows. Round forms exist only as point symbols: city circles on the map and the event dots of the history line.

Hatching is diagonal at 45 degrees and always means under construction: the complex plot (yellow and deep), the legend state mark (land and milk), the unbuilt part of a progress bar.

Map linework keeps its stroke width at every scale (non-scaling strokes): roads 2.2px milk, state border 1.2px milk dash-dot at 0.55 opacity, rivers 1.1px, contours 1px.

## Components

### Buttons
- **Shape:** square (0px), 48px high, 26px side padding.
- **Primary (sheet button):** land ground, milk text, PT Sans Narrow 700 at 18px, 0.08em, uppercase. One per panel. Full width on phones.
- **Hover / Focus / Active:** ground changes to deep over 0.2s; active moves down 1px; focus ring 2px, offset 3px (land on the milk legend, yellow on dark grounds, green on milk pages).
- **Secondary:** a text link beside it, Golos 500, underlined 1px with 0.3em offset, thickening to 2px on hover. The "read more" link adds a small arrow that moves 4px right on hover.
- **Menu button:** 1.5px milk outline on deep, narrow uppercase; fills milk with deep text when open.

### Navigation
- **Margin bar:** sticky, deep ground, 66px high, 2px milk line beneath. Left: the name as a text wordmark (PT Sans Narrow 700, 27px, uppercase) over the line "part of Solico Group", then the Solico Group logo behind a thin divider. Right: page links and, behind a divider, the three language codes.
- **States:** a 2px milk underline grows from the left on hover (0.3s) and stays under the current page and current language. Inactive languages are in secondary milk.
- **Reading progress:** a 2px secondary-milk line along the bottom of the bar, scaled by scroll position.
- **Phone:** the menu opens as a deep panel with a 2px milk frame, one link per row at 21px with hairlines between.
- **Footer:** deep band with a 2px milk top line: group logo, name, endorsement, then company, BIN and address at 14px.

### Legend panel (signature)
The table of figures. Milk panel on the map, deep ink. A capital label heading with a 2px ink rule under it; figures in a two-column grid, each a large tabular figure with its description beneath and a 1px legend rule below; a source line at 13px; then the primary button and one text link. The figure that reports construction progress is preceded by a 26px hatched state mark.

### Map sheet (signature)
The drawn map: land ground, contours, dark water with pale shore, blue rivers, milk roads and dash-dot border, city circles, tracked region names, and the complex as a 16-unit hatched yellow square with its yellow name to the left. Below it the foot margin: conventional signs (complex, highway, river, state border), the data credit, and a two-cell scale bar whose length is measured from the rendered map so it is true at every window size. Two framings of the same linework: wide for desktop, a closer square for phones.

Entrance, only when motion is allowed: the map develops outward from the complex in a circle (1.5s), headline, legend and inset settle upward 14px in sequence (0.8s, delays 0.15 / 0.45 / 0.6s), and the plot outline pulses twice. Content is visible without it.

### Scale steps (signature)
The same sheet read at three scales: region, the site from above, phase one today. On screens wider than 900px with JavaScript, a stage is pinned on the left (58 / 42 split, 2px milk divider) while the text steps scroll on the right. Step 1 shows the map; at step 2 the map zooms six times toward the complex (1.2s) and the aerial photograph opens from the plot in a circle (0.9s, after 0.5s); step 3 opens the current site photograph the same way. A three-cell rung strip at the lower left of the stage names the scales; the active cell is filled milk with deep text. On phones, without JavaScript, each step is a plain section with its own 16:9 framed picture; under reduced motion the stage changes without transitions. The third step sets the progress figure in yellow above a progress bar.

### Page head
Green land band over the relief of the region (the relief drawing at 2400px, positioned differently per page), 2px milk line beneath. Display title up to 17em wide and an optional lead up to 640px, both milk with a land halo. Padding 72 / 64px, 40px on phones. No label above the title.

### Bands and sections
- **Milk section:** plain milk ground.
- **Tinted band:** sheet tint ground with 1px rules above and below.
- **Green band / deep band:** land or deep ground with 2px milk lines above and below (collapsed where two dark bands or a page head meet). Tokens are re-pointed, so rows, labels, links and placeholders inside turn milk. The contact band also carries the relief and the halo.

### Rows and tables
A list opens with a 2px ink rule and separates rows with 1px rules. Used for the home index (narrow bold title, description, arrow that moves 6px on hover while the title turns green), the timeline (date, event, state), facilities (green number, name, two columns), news and releases.

### State marks and progress
- **State mark:** a 14px square with a 1.5px ink outline. Solid is done, 45-degree hatch is under way, outline only is planned. A text status sits beside it; the current row is set in green at 600.
- **Progress bar:** 16px high with a 1.5px outline; the built share is solid (green on milk, milk on green) and the remainder hatched. On the factory page it fills over 1.4s when it scrolls into view.

### Photographs
- **Inset on the map:** 2px milk frame, 16:9 image, deep caption strip with a 2px milk top line; caption left and date right in the furniture voice.
- **Figure on a page:** square image with a caption row beneath at 13px in tertiary ink, description left and date or credit right.
- **Placeholder:** placeholder ground with a 1px rule and a 13px note in the lower left.

### Motion shared by all pages
Blocks marked for reveal fade in and rise 12px (0.6s) once when they enter the window; pages cross-fade over 0.28s where the browser supports it. All of it is off under reduced motion, and smooth scrolling is disabled.

### One-line illustrations (approved by the owner, 16.11.2026)

- **What:** hand-drawn single-line drawings in `src/components/Line.astro`: `journey` (milk, cheese, shelf in one line, the campaign drawing for "From farm to shelf") and the singles `milk`, `cheese`, `shelf` cut from the same hand.
- **Line:** one continuous path, one colour (`currentColor`), no fill, 3 px, round caps and joins. Green or deep green on milk, milk on green. Never yellow.
- **Where:** the journey line is a band under the home map sheet; singles sit above a heading they illustrate (factory chain). They never sit on the map itself and never replace a photograph or a figure.
- **Motion:** the line draws itself once when it scrolls into view (2.6 s); static under reduced motion and without JavaScript.
- **Captions:** a handwritten face (Caveat, covers Kazakh) is cleared for marketing captions; it is not loaded on the website.

## Do's and Don'ts

### Do:
- **Do** frame every page as a sheet: deep margin, 2px milk frame line, sticky margin bar, deep footer.
- **Do** open every inner page with the green page head over the relief, then read on milk grounds with green or deep bands between.
- **Do** keep yellow for the complex: plot, Konaev label, the progress figure on green, the complex sign, plus focus rings on dark grounds and selection.
- **Do** show state by mark: solid built, 45-degree hatch under construction, outline planned, with the word beside it.
- **Do** set figures in PT Sans Narrow 700 with tabular numerals, with unit, description, date and source next to them.
- **Do** clear linework behind any type placed on the map or the relief (stroke, halo or backing in the land colour).
- **Do** draw structure with rules: 2px between grounds and above tables, 1px between rows.
- **Do** check any new typeface for ә ғ қ ң ө ү һ ұ і before using it.
- **Do** give every scroll-driven or animated element a static form for phones, no JavaScript and reduced motion.

### Don't:
- **Don't** put a kicker or eyebrow above a heading. A capital label is used only as the heading itself.
- **Don't** use yellow for buttons, links, bands, icons or emphasis in prose.
- **Don't** use hatching as decoration; it means under construction.
- **Don't** signal state by colour alone.
- **Don't** draw water pale or light blue; water is dark teal with a pale shoreline, and only rivers and water names are blue.
- **Don't** round the corners of panels, buttons, frames or photographs.
- **Don't** add shadows to anything that does not lie on the drawn map.
- **Don't** use a full-bleed mood photograph as a hero, or cards with a stats row.
- **Don't** place farms, suppliers or other points on the map that are not in the source data.
