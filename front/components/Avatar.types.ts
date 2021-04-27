import { IDrugs } from '~/api/api.type'
export interface D {
  showActions: boolean
}

export interface M {
  togglePopup: () => void
  connect: () => void
  disconnect: () => void
  closePopup: () => void
}

export interface C {
  cart: IDrugs[]
  status: string
}

export interface P {
  isConnected: boolean
  userId: number
  user?: any
}
