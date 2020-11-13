import { Plugin } from '@nuxt/types'
import { NotificationType } from '~/store/notifications/type'
let idCounter = 0
export type NotificationCancellationToken = String

function getNextCounter() {
  idCounter++
  return `key-${idCounter}`
}

declare module 'vue/types/vue' {
  interface Vue {
    $notify: (
      title: string,
      msg: string,
      type: NotificationType,
      time?: number
    ) => NotificationCancellationToken
    $closeNotification: (key: NotificationCancellationToken) => void
    $notifyErrors: (title: string, errors: { msg: string }[]) => void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notify: (
      title: string,
      msg: string,
      type: NotificationType,
      time?: number
    ) => NotificationCancellationToken
    $closeNotification: (key: NotificationCancellationToken) => void
    $notifyErrors: (title: string, errors: { msg: string }[]) => void
  }
}

const notificationPlugin: Plugin = (context, inject) => {
  inject(
    'notify',
    (title: string, msg: string, type: NotificationType, time?: number) => {
      const key = getNextCounter()
      context.store.dispatch('notifications/addNotification', {
        key,
        title,
        msg,
        type,
        time,
      })
      return key
    }
  )
  inject('closeNotification', (key: NotificationCancellationToken) => {
    context.store.commit('notification/removeNotification', key)
  })
  inject('notifyErrors', (title: string, errors: { msg: string }[]) => {
    for (let i = 0; i < errors.length; i++) {
      const error = errors[i]

      context.store.dispatch('notifications/addNotification', {
        title,
        msg: error.msg,
        type: 'error',
        time: 5_000,
      })
    }
  })
}

export default notificationPlugin
