import { useRuntimeConfig, createError } from '#imports'

export const BYPASS_COOKIE_NAME = 'maintenance-mode-bypass'

export type MaintenanceModeConfig = {
  enabled: boolean
  bypassSecret: string | null
  include: string[] | null
  exclude: string[] | null
}

/**
 * Matches a given URL against an array of patterns.
 *
 * @param url The URL to match.
 * @param patterns An array of URL patterns to match against.
 *
 * @returns {boolean} Whether the URL matches any of the patterns.
 */
export function urlMatches(url: string, patterns: string[]): boolean {
  for (const pattern of patterns) {
    // Create a regular expression from the pattern.
    //
    // - `^`: Matches the beginning of the string.
    // - `$`: Matches the end of the string.
    // - `.*`: Matches any character zero or more times.
    // - `\/`: Matches a literal forward slash.
    const regex = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`)

    if (regex.test(url)) {
      return true
    }
  }

  return false
}

/**
 * Quickly determine if maintenance mode is enabled.
 * We use this to determine if we should start evaluating maintenance mode.
 *
 * @returns {boolean} Whether maintenance mode is enabled.
 */
export function isMaintenanceEnabled(): boolean {
  return useRuntimeConfig().public.maintenanceModeEnabled
}

/**
 * Determines if the site is under maintenance.
 *
 * @param path The path of the request.
 * @param bypassCookieValue The value of the bypass cookie.
 * @param maintenanceConfig The maintenance mode configuration.
 *
 * @returns {boolean} Whether the site is under maintenance.
 */
export function isUnderMaintenance(
  path: string,
  bypassCookieValue: string | null,
  maintenanceConfig: MaintenanceModeConfig,
): boolean {
  const { enabled, bypassSecret, include, exclude } = maintenanceConfig

  if (!enabled) {
    return false
  }

  if (bypassSecret && bypassCookieValue && bypassCookieValue === bypassSecret) {
    return false
  }

  if (include && !urlMatches(path, include)) {
    return false
  }

  if (exclude && urlMatches(path, exclude)) {
    return false
  }

  return true
}

/**
 * Gets the maintenance mode configuration.
 *
 * @returns {MaintenanceModeConfig} The maintenance mode configuration.
 */
export function getMaintenanceModeConfig(): MaintenanceModeConfig {
  const enabled = useRuntimeConfig().public.maintenanceModeEnabled
  const bypassSecret = useRuntimeConfig().public.maintenanceModeBypassSecret
  const exclude = useRuntimeConfig().public.maintenanceModeExclude
  const include = useRuntimeConfig().public.maintenanceModeInclude

  return {
    enabled,
    bypassSecret,
    include,
    exclude,
  }
}

/**
 * Throws a maintenance error.
 *
 * @throws {NuxtError} A 503 error with the message "Site is under maintenance".
 */
export function throwMaintenanceError(): void {
  throw createError({
    statusCode: 503,
    statusMessage: 'Site is under maintenance',
  })
}
