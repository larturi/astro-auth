// @ts-check
import { defineConfig, envField } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',

  adapter: netlify()
})
