import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable or disable the maintenance mode
   */
  enabled: boolean
  /**
   * Exclude paths from maintenance mode
   * If set, these paths will not be in maintenance mode
   *
   * Supports wildcard paths like `/blog/*`
   *
   * When both `exclude` and `include` are set, `include` will take precedence
   */
  exclude: string[] | null
  /**
   * Include paths in maintenance mode
   * If set, only these paths will be in maintenance mode
   *
   * Supports wildcard paths like `/blog/*`
   *
   * When both `exclude` and `include` are set, `include` will take precedence
   */
  include: string[] | null
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'maintenance-mode',
    configKey: 'maintenanceMode',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    enabled: false,
    exclude: null,
    include: null,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add Options to Runtime Config
    nuxt.options.runtimeConfig.public.maintenanceModeEnabled
      ||= options.enabled
    nuxt.options.runtimeConfig.public.maintenanceModeExclude
      ||= options.exclude
    nuxt.options.runtimeConfig.public.maintenanceModeInclude
      ||= options.include

    // Add Nitro Middleware
    addServerHandler({
      handler: resolve('./runtime/server/middleware'),
      middleware: true,
    })
  },
})
