// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sofoodkaz.kz',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // The CSS is small: inline it so the first paint needs no extra request.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
