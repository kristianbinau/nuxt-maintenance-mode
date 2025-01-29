// eslint-disable prefer-regex-literals
export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-27',
  maintenanceMode: {
    enabled: true,
    include: ['/blog*'],
  },
})
