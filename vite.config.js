import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const releaseName = 'sentry-vue@1.0.0'

export default defineConfig({
  plugins: [vue(), sentryVitePlugin({
    org: "zjc-1m",
    project: "javascript-vue",
    release: {
      name: releaseName,
    },
  })],

  build: {
    sourcemap: true
  }
})
