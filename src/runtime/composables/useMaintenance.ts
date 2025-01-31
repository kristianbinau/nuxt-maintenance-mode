import { computed } from 'vue'

import {
  BYPASS_COOKIE_NAME,
  getMaintenanceModeConfig,
  isUnderMaintenance as _isUnderMaintenance,
} from '../utils'
import { useCookie } from '#app'

export function useMaintenance(path: string) {
  const maintenanceConfig = getMaintenanceModeConfig()
  const bypassCookie = useCookie(BYPASS_COOKIE_NAME)

  const isUnderMaintenance = computed<boolean>(() => {
    const bypassCookieValue = bypassCookie.value || null

    return _isUnderMaintenance(path, bypassCookieValue, maintenanceConfig)
  })

  return { isUnderMaintenance }
}
