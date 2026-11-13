import ru from './content/ru.json';
import kz from './content/kz.json';
import en from './content/en.json';

/**
 * Site languages. The URL code is what appears in the address (/kz/);
 * `lang` is the real language code used in <html lang> and hreflang
 * ("kk" is Kazakh; "kz" is the country code).
 */
export const LANGS = {
  ru: { lang: 'ru', label: 'RU', name: 'Русский', ogLocale: 'ru_RU', dateLocale: 'ru-RU' },
  kz: { lang: 'kk', label: 'KZ', name: 'Қазақша', ogLocale: 'kk_KZ', dateLocale: 'kk-KZ' },
  en: { lang: 'en', label: 'EN', name: 'English', ogLocale: 'en_US', dateLocale: 'en-GB' },
} as const;

export type Lang = keyof typeof LANGS;
export const LANG_CODES = Object.keys(LANGS) as Lang[];
export const DEFAULT_LANG: Lang = 'ru';

const CONTENT = { ru, kz, en };
export type Content = typeof ru;

export function t(lang: Lang): Content {
  return CONTENT[lang] as Content;
}

/** Text that exists in all three languages, as used in team.json and news.json. */
export type Localized = Record<Lang, string>;

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
  }
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getUTCFullYear()}`;
}

/** Pages of the site besides the home page, in menu order. */
export const PAGES = ['solico', 'history', 'team', 'factory', 'careers', 'press', 'contact'] as const;
export type Page = (typeof PAGES)[number];
export type PageKey = 'home' | Page;

export function pagePath(lang: Lang, page: PageKey): string {
  return page === 'home' ? `/${lang}/` : `/${lang}/${page}/`;
}
