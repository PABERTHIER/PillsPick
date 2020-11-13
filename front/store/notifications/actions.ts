import { Context } from '@nuxt/types'
import { INotification, NotificationType } from './type'

let idCounter = 0
export const actions = {
  addNotification(
    this: Context,
    { commit },
    payload: {
      key?: string
      title: string
      msg: string
      type: NotificationType
      time?: number
    }
  ) {
    const id = idCounter++
    const notification: INotification = {
      id,
      key: payload.key,
      title: payload.title,
      msg: payload.msg,
      type: payload.type,
    }
    commit('addNotification', notification)

    if (payload.time) {
      setTimeout(() => commit('deleteNotification', id), payload.time)
    }
  },
}

export default actions
