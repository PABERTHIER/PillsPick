import { INotification } from '~/store/notifications/type'

export interface D {}

export interface M {
  deleteNotification?: () => void
}

export interface C {
  notifications?: INotification[]
}

export interface P {}
