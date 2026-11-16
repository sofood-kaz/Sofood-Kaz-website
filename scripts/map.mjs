// Builds src/assets/map/region.json: the linework of the map sheet.
// Input (scripts/.mapdata/, fetched by map-fetch.mjs): Natural Earth 1:10m layers
// (public domain) and Terrain Tiles elevation (terrarium PNG) for the contour lines.
// Run: npm run map
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { contours } from 'd3-contour';
import { BBOX, Z, tileX, tileY } from './map-fetch.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(HERE, '.mapdata');
const OUT = path.join(HERE, '..', 'src', 'assets', 'map', 'region.json');

// Equirectangular projection, true scale at 44 N. 200 px per degree of latitude.
const S = 200;
const K = Math.cos((44 * Math.PI) / 180);
const X = (lon) => (lon - BBOX.w) * K * S;
const Y = (lat) => (BBOX.n - lat) * S;
const W = X(BBOX.e);
const H = Y(BBOX.s);
const PAD = 0.6; // degrees kept around the sheet so lines run off the edge

const inBox = ([lon, lat]) =>
  lon > BBOX.w - PAD && lon < BBOX.e + PAD && lat > BBOX.s - PAD && lat < BBOX.n + PAD;

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const r1 = (n) => Math.round(n * 10) / 10;
const toD = (pts, close) => 'M' + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L') + (close ? 'Z' : '');

// Split a lon/lat line into runs that lie inside the padded box, projected and simplified.
function lineRuns(coords, tol = 0.5) {
  const runs = [];
  let cur = [];
  for (const c of coords) {
    if (inBox(c)) cur.push([X(c[0]), Y(c[1])]);
    else { if (cur.length > 1) runs.push(cur); cur = []; }
  }
  if (cur.length > 1) runs.push(cur);
  return runs.map((r) => toD(simplify(r, tol)));
}

const load = async (name) => JSON.parse(await readFile(path.join(DIR, `${name}.geojson`), 'utf8')).features;
const lines = (g) => (g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : []);
const polys = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []);

async function vectors() {
  const water = [];
  for (const f of await load('ne_10m_lakes')) {
    if (!f.geometry) continue;
    for (const poly of polys(f.geometry)) {
      if (!poly[0].some(inBox)) continue;
      water.push(poly.map((ring) => {
        // A closed ring starts and ends on the same point, so simplify it as two halves.
        const pts = ring.map(([lo, la]) => [X(lo), Y(la)]);
        const mid = Math.floor(pts.length / 2);
        return toD([...simplify(pts.slice(0, mid + 1), 0.4), ...simplify(pts.slice(mid), 0.4).slice(1)], true);
      }).join(''));
    }
  }
  const rivers = [];
  for (const f of await load('ne_10m_rivers_lake_centerlines')) {
    if (!f.geometry || f.properties.featurecla === 'Lake Centerline') continue;
    for (const l of lines(f.geometry)) rivers.push(...lineRuns(l));
  }
  const roads = [];
  for (const f of await load('ne_10m_roads')) {
    if (!f.geometry || !/Highway/.test(f.properties.type || '')) continue;
    for (const l of lines(f.geometry)) roads.push(...lineRuns(l));
  }
  const border = [];
  for (const f of await load('ne_10m_admin_0_boundary_lines_land')) {
    if (!f.geometry) continue;
    for (const l of lines(f.geometry)) border.push(...lineRuns(l));
  }
  return { water, rivers, roads, border };
}

async function relief() {
  const x0 = tileX(BBOX.w), x1 = tileX(BBOX.e), y0 = tileY(BBOX.n), y1 = tileY(BBOX.s);
  const tw = (x1 - x0 + 1) * 256, th = (y1 - y0 + 1) * 256;
  const dem = new Float32Array(tw * th);
  for (let tx = x0; tx <= x1; tx++) {
    for (let ty = y0; ty <= y1; ty++) {
      const { data, info } = await sharp(path.join(DIR, `dem-${Z}-${tx}-${ty}.png`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      for (let py = 0; py < 256; py++) {
        for (let px = 0; px < 256; px++) {
          const i = (py * 256 + px) * info.channels;
          dem[((ty - y0) * 256 + py) * tw + (tx - x0) * 256 + px] = data[i] * 256 + data[i + 1] + data[i + 2] / 256 - 32768;
        }
      }
    }
  }
  const n = 2 ** Z;
  const STEP = 2;
  const gw = Math.ceil(W / STEP) + 1, gh = Math.ceil(H / STEP) + 1;
  let grid = new Float32Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) {
    const lat = BBOX.n - (gy * STEP) / S;
    const rad = (lat * Math.PI) / 180;
    const my = ((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2) * n * 256 - y0 * 256;
    for (let gx = 0; gx < gw; gx++) {
      const lon = BBOX.w + (gx * STEP) / (K * S);
      const mx = ((lon + 180) / 360) * n * 256 - x0 * 256;
      const ix = Math.min(tw - 2, Math.max(0, Math.floor(mx))), iy = Math.min(th - 2, Math.max(0, Math.floor(my)));
      const fx = mx - ix, fy = my - iy;
      const a = dem[iy * tw + ix], b = dem[iy * tw + ix + 1], c = dem[(iy + 1) * tw + ix], d = dem[(iy + 1) * tw + ix + 1];
      grid[gy * gw + gx] = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    }
  }
  // Two light blur passes: map contours are generalised, not pixel-exact.
  for (let pass = 0; pass < 2; pass++) {
    const next = new Float32Array(grid);
    for (let y = 1; y < gh - 1; y++) {
      for (let x = 1; x < gw - 1; x++) {
        let s = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += grid[(y + dy) * gw + x + dx];
        next[y * gw + x] = s / 9;
      }
    }
    grid = next;
  }
  const levels = [400, 500, 600, 800, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000];
  const out = [];
  for (const c of contours().size([gw, gh]).thresholds(levels)(grid)) {
    let d = '';
    for (const poly of c.coordinates) {
      for (const ring of poly) {
        if (ring.length < 24) continue;
        // Drop the parts that run along the edge of the grid.
        let run = [];
        const flush = () => { if (run.length > 6) d += toD(simplify(run, 0.7)); run = []; };
        for (const [gx, gy] of ring) {
          const edge = gx < 1 || gy < 1 || gx > gw - 1 || gy > gh - 1;
          if (edge) flush(); else run.push([gx * STEP, gy * STEP]);
        }
        flush();
      }
    }
    if (d) out.push({ level: c.value, d });
  }
  return out;
}

const place = (lon, lat) => ({ x: r1(X(lon)), y: r1(Y(lat)) });

const v = await vectors();
const data = {
  source: 'Natural Earth 1:10m (public domain); elevation: Terrain Tiles (Mapzen/AWS open data)',
  projection: 'Equirectangular, true scale at 44 N',
  width: r1(W),
  height: r1(H),
  kmPerUnit: 111.32 / S,
  ...v,
  contours: await relief(),
  places: {
    konaev: place(77.063, 43.866),
    almaty: place(76.946, 43.238),
    taldykorgan: place(78.38, 45.017),
  },
};
await mkdir(path.dirname(OUT), { recursive: true });
const json = JSON.stringify(data);
await writeFile(OUT, json);
const relief$ = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${data.width} ${data.height}" fill="none" stroke-width="0.55"><metadata>Contour lines of the Almaty and Zhetisu regions, generated by scripts/map.mjs from Terrain Tiles elevation data (Mapzen, AWS Open Data). Not hand-drawn, not AI-generated.</metadata>` +
  data.contours.map((k) => `<path stroke="${k.level % 1000 === 0 ? '#2E8556' : '#1F7446'}" d="${k.d}"/>`).join('') + '</svg>';
await mkdir(path.join(HERE, '..', 'public', 'map'), { recursive: true });
await writeFile(path.join(HERE, '..', 'public', 'map', 'relief.svg'), relief$);
console.log(`region.json ${(json.length / 1024).toFixed(0)} KB  water ${v.water.length} rivers ${v.rivers.length} roads ${v.roads.length} border ${v.border.length} contours ${data.contours.length}`);
