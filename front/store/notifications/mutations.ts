import { INotificationState, INotification } from './type'

export const mutations = {
  addNotification(state: INotificationState, payload: INotification) {
    state.notifications.push(payload)
  },
  deleteNotification(state: INotificationState, payload: number | string) {
    const index = state.notifications.findIndex(
      (x) => x.id === payload || x.key === payload
    )
    if (index >= 0) {
      state.notifications.splice(index, 1)
    }
  },
}

export default mutations
