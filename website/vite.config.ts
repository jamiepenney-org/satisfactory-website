import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph';

export default defineConfig({
  plugins: [
    ogPlugin({
      basic: {
        url: 'https://satisfactory.jamiepenney.co.nz',
        image: '/images/satisfactory_logo_square.png',
        title: 'Penney Family Satisfactory Server',
        description: 'Currently working on a megafactory producing items for Project Assembly Phase 4',
        locale: 'en_NZ',
      },
    })
  ],
});
