import { NotificationType } from '~/store/notifications/type'

export interface D {}

export interface M {
  close: () => void
}

export interface C {}

export interface P {
  title: string
  msg: string
  type: NotificationType
}
