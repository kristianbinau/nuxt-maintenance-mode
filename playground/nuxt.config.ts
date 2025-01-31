// eslint-disable prefer-regex-literals
export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      maintenanceModeEnabled: process.env.NUXT_PUBLIC_MAINTENANCE_MODE_ENABLED,
    },
  },
  compatibilityDate: '2025-01-27',
  maintenanceMode: {
    enabled: false,
    include: ['/blog*'],
  },
})
