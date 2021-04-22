import { IOrders } from '~/api/api.type'

export interface D {}

export interface M {
  validate: () => void
  cancel: () => void
}

export interface C {
  status: string
  totalAmount: string
  showIcon: boolean
}

export interface P {
  data: IOrders
  userType: string
}
