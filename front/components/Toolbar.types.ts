export interface D {}

export interface M {
  deleteDrugStoreName: () => void
  connect: () => void
  disconnect: () => void
}

export interface C {}

export interface P {
  drugStoreName?: string
  isConnected: boolean
}
