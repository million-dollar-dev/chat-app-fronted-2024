import notifycationEffectSound from '../assets/sounds/soundEffect.wav'

const originalTitle = document.title
let notificationInterval = null

const playNotificationEffect = () => {
    new Audio(notifycationEffectSound).play()
}

const showTitleNotification = () => {
    if (notificationInterval) return
    let show = true
    notificationInterval = setInterval(() => {
        document.title = show ? "New Message!" : originalTitle
        show = !show
    }, 1000)
}

const clearTitleNotification = () => {
    if (notificationInterval) {
        clearInterval(notificationInterval)
        notificationInterval = null
        document.title = originalTitle
    }
}
export {playNotificationEffect, showTitleNotification, clearTitleNotification};