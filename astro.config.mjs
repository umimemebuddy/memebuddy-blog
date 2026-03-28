import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://memebuddy.cc',
  integrations: [],
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
