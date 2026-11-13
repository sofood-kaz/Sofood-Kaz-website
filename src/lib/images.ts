import type { ImageMetadata } from 'astro';

/*
 * Photos are picked up by file name, so replacing a placeholder only needs a
 * file dropped into the right folder:
 *   src/assets/photos/hero.jpg       -> hero photo
 *   src/assets/photos/site-plan.png  -> site plan
 *   src/assets/team/<id>.jpg         -> portrait for the team.json entry <id>
 * Any of jpg, jpeg, png, webp or avif works.
 */
type Mod = { default: ImageMetadata };

const photos = import.meta.glob<Mod>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const portraits = import.meta.glob<Mod>('/src/assets/team/*.{jpg,jpeg,png,webp,avif}', { eager: true });

function byName(map: Record<string, Mod>, name: string): ImageMetadata | undefined {
  for (const [path, mod] of Object.entries(map)) {
    const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (base === name) return mod.default;
  }
  return undefined;
}

export const findPhoto = (name: string) => byName(photos, name);
export const findPortrait = (id: string) => byName(portraits, id);
