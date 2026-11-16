// Downloads the raw geodata for the map sheet into scripts/.mapdata/ (not committed).
// Sources: Natural Earth 1:10m (public domain), Terrain Tiles on AWS (terrarium PNG).
// Run: npm run map:fetch   then: npm run map
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '.mapdata');
export const BBOX = { s: 42.3, w: 73.0, n: 46.0, e: 80.6 };
const NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson';
const LAYERS = ['ne_10m_lakes', 'ne_10m_rivers_lake_centerlines', 'ne_10m_roads', 'ne_10m_admin_0_boundary_lines_land'];

const exists = (p) => access(p).then(() => true, () => false);

async function layer(name) {
  const file = path.join(DIR, `${name}.geojson`);
  if (await exists(file)) return console.log(`${name}: cached`);
  const res = await fetch(`${NE}/${name}.geojson`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const text = await res.text();
  await writeFile(file, text);
  console.log(`${name}: ${(text.length / 1e6).toFixed(1)} MB`);
}

export const Z = 7;
export const tileX = (lon) => Math.floor(((lon + 180) / 360) * 2 ** Z);
export const tileY = (lat) => {
  const r = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.asinh(Math.tan(r)) / Math.PI) / 2) * 2 ** Z);
};

async function tiles() {
  for (let x = tileX(BBOX.w); x <= tileX(BBOX.e); x++) {
    for (let y = tileY(BBOX.n); y <= tileY(BBOX.s); y++) {
      const file = path.join(DIR, `dem-${Z}-${x}-${y}.png`);
      if (await exists(file)) continue;
      const res = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${x}/${y}.png`);
      if (!res.ok) throw new Error(`tile ${x}/${y}: HTTP ${res.status}`);
      await writeFile(file, Buffer.from(await res.arrayBuffer()));
      console.log(`dem ${x}/${y}`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mkdir(DIR, { recursive: true });
  await tiles();
  for (const name of LAYERS) await layer(name);
}
