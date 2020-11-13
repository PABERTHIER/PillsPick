export type NotificationType = 'success' | 'error' | 'info'

export interface INotification {
  id: number
  key?: string
  title: string
  msg: string
  type: NotificationType
}

export interface INotificationState {
  notifications: INotification[]
}
