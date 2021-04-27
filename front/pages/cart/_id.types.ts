import { IDrugs, IDrugStores, IUser } from '~/api/api.type'

export interface D {}

export interface M {
  clearCart: () => void
  validate: () => void
}

export interface C {
  cart: IDrugs[]
  drugStore: IDrugStores
  isConnected: boolean
  user: IUser
}

export interface P {}
