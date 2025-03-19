import { NotificationBuilder, NotifyLevel } from "../../../types"
import { notify } from "../../../utils"

var isNotified: boolean

export function notifyCriticalBattery() {
    if (isNotified) return
    const notification: NotificationBuilder = {
        expirationTime: 10000,
        title: 'ATENÇÃO',
        message: 'A bateria está em estado crítico!',
        iconPath: '/usr/share/icons/breeze-dark/status/22/battery-010.svg',
        sound: '/usr/share/sounds/freedesktop/stereo/service-logout.oga',
        urgency: NotifyLevel.CRITICAL
    }

    notify(notification)
    isNotified = true
}

export function resetNotification() {
    if (!isNotified) return
    isNotified = false
}
