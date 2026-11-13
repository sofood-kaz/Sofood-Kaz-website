"""Build the self-hosted font files in public/fonts/.

Source: the @fontsource-variable packages in node_modules (already split
into latin / cyrillic / cyrillic-ext subsets with Google's unicode ranges).
This script trims the variable axes we do not use and checks that the
Kazakh letters are present.

Run with:  npm run fonts   (needs Python 3 with fonttools and brotli)
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

PLAYFAIR = ROOT / "node_modules/@fontsource-variable/playfair/files"
GOLOS = ROOT / "node_modules/@fontsource-variable/golos-text/files"

SUBSETS = ["latin", "cyrillic", "cyrillic-ext"]
KAZAKH = "әғқңөұүһіӘҒҚҢӨҰҮҺІ"


def axes(font):
    return {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes}


def build(src, dst, limits):
    font = TTFont(src)
    before = axes(font)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    font.save(dst)
    return before


for subset in SUBSETS:
    # Playfair 2.0: one weight (400), optical size kept for 16-96 px use.
    b = build(PLAYFAIR / f"playfair-{subset}-opsz-normal.woff2",
              OUT / f"playfair-{subset}.woff2",
              {"wght": 400, "opsz": (16, 96)})
    print(f"playfair {subset}: source axes {b}")
    # Golos Text: weights 400-600 only.
    b = build(GOLOS / f"golos-text-{subset}-wght-normal.woff2",
              OUT / f"golos-{subset}.woff2",
              {"wght": (400, 600)})
    print(f"golos {subset}: source axes {b}")

# Coverage check for Kazakh letters across the three subsets.
for family in ("playfair", "golos"):
    cmap = set()
    for subset in SUBSETS:
        cmap |= set(TTFont(OUT / f"{family}-{subset}.woff2").getBestCmap())
    missing = [ch for ch in KAZAKH if ord(ch) not in cmap]
    print(f"{family}: Kazakh letters missing: {missing or 'none'}")

for f in sorted(OUT.glob("*.woff2")):
    print(f"{f.name}: {f.stat().st_size // 1024} KB")

# Static TTF copies for the Open Graph image script (satori cannot read
# woff2 or variable fonts). Not shipped with the site.
from fontTools.merge import Merger

OG = ROOT / "scripts" / ".og-fonts"
OG.mkdir(exist_ok=True)


def static_merged(paths, limits, dst):
    parts = []
    for i, p in enumerate(paths):
        f = instancer.instantiateVariableFont(TTFont(p), limits)
        f.flavor = None
        tmp = OG / f"_part{i}.ttf"
        f.save(tmp)
        parts.append(str(tmp))
    merged = Merger().merge(parts)
    merged.save(dst)
    for p in parts:
        Path(p).unlink()


static_merged([PLAYFAIR / f"playfair-{s}-opsz-normal.woff2" for s in SUBSETS],
              {"wght": 400, "opsz": 72}, OG / "playfair.ttf")
for w in (400, 500):
    static_merged([GOLOS / f"golos-text-{s}-wght-normal.woff2" for s in SUBSETS],
                  {"wght": w}, OG / f"golos-{w}.ttf")

# Favicon: a Playfair "S" on brand green, square corners.
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

font = TTFont(OG / "playfair.ttf")
gs = font.getGlyphSet()
glyph = gs[font.getBestCmap()[ord("S")]]
bp = BoundsPen(gs)
glyph.draw(bp)
xmin, ymin, xmax, ymax = bp.bounds
size, target = 64, 44
scale = target / (ymax - ymin)
dx = (size - (xmax - xmin) * scale) / 2 - xmin * scale
dy = (size + (ymax - ymin) * scale) / 2 + ymin * scale
pen = SVGPathPen(gs)
glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, dx, dy)))
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
    f'<rect width="{size}" height="{size}" fill="#0A5E33"/>'
    f'<path fill="#F6F3EC" d="{pen.getCommands()}"/></svg>\n'
)
(ROOT / "public" / "favicon.svg").write_text(svg, encoding="utf-8")
print("favicon.svg written")
