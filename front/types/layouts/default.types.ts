import { INotification } from '~/store/notifications/type'
import { IDrugStores } from '~/api/api.type'

export interface D {}

export interface M {
  deleteNotification?: () => void
  dispatchLogin: (login: string) => void
  dispatchLogout: () => void
  removeDrugStore: () => void
  connect: () => void
}

export interface C {
  notifications?: INotification[]
  drugStore?: IDrugStores
  isConnected: boolean
  drugStoreName?: string
}

export interface P {}
