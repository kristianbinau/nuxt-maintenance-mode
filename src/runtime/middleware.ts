import {
  isMaintenanceEnabled,
  getMaintenanceModeConfig,
  isUnderMaintenance,
  throwMaintenanceError,
  BYPASS_COOKIE_NAME,
} from './utils'
import { defineNuxtRouteMiddleware, useCookie } from '#imports'

export default defineNuxtRouteMiddleware((event) => {
  // Early return if maintenance mode is not enabled.
  if (!isMaintenanceEnabled()) {
    return
  }

  const maintenanceConfig = getMaintenanceModeConfig()

  // Handle GETTING Bypass
  const bypassCookie = useCookie(BYPASS_COOKIE_NAME, {
    maxAge: 60 * 60 * 24 * 7 * 4 * 12, // 1 year
    sameSite: 'strict',
    secure: true,
  })
  let bypassCookieValue: string | null = bypassCookie.value ?? null

  // Handle SETTING Bypass - We also do this
  if (
    maintenanceConfig.bypassSecret
    && event.query.bypass === maintenanceConfig.bypassSecret
  ) {
    // Set the bypass cookie if the bypass query parameter is present, and it matches the bypass secret.
    // This is used to bypass maintenance mode, in later requests.
    bypassCookie.value = maintenanceConfig.bypassSecret
    bypassCookieValue = maintenanceConfig.bypassSecret
  }

  // Handle Maintenance Checks
  if (!isUnderMaintenance(event.path, bypassCookieValue, maintenanceConfig)) {
    return
  }

  throwMaintenanceError()
})
