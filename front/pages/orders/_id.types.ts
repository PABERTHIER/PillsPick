import { IOrders } from '~/api/api.type'

export interface D {
  orders: IOrders[]
  isLoading: boolean
}

export interface M {
  loadOrders: () => void
  validateOrder: (orderId: number) => void
  cancelOrder: (orderId: number) => void
}

export interface C {
  userId: any
  drugStoreId: number
  user: any
  userType: string
}

export interface P {}
