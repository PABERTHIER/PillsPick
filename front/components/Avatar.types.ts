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
  status: string
}

export interface P {
  isConnected: boolean
  userId: number
  user?: any
}
