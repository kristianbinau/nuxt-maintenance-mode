import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  createError,
} from '#imports'

export default defineNuxtRouteMiddleware((event) => {
  const enabled = useRuntimeConfig().public.maintenanceModeEnabled
  const exclude = useRuntimeConfig().public.maintenanceModeExclude
  const include = useRuntimeConfig().public.maintenanceModeInclude

  if (!enabled) {
    return
  }

  if (include && !urlMatches(event.path, include)) {
    return
  }

  if (exclude && urlMatches(event.path, exclude)) {
    return
  }

  throw createError({
    statusCode: 503,
    statusMessage: 'Site is under maintenance',
  })
})

/**
 * Matches a given URL against an array of patterns.
 *
 * @param url The URL to match.
 * @param patterns An array of URL patterns to match against.
 * @returns True if the URL matches any of the patterns, false otherwise.
 */
function urlMatches(url: string, patterns: string[]): boolean {
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
