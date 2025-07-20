import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph';

export default defineConfig({
  plugins: [
    ogPlugin({
      basic: {
        url: 'https://satisfactory.jamiepenney.co.nz',
        image: '/images/og.png',
        title: 'Penney Family Satisfactory Server',
        locale: 'en_NZ',
      },
    })
  ],
});
