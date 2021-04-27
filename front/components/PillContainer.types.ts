import { IDrugs, IDrugStores } from '~/api/api.type'

export interface D {}

export interface M {
  addDrugToCart: (drug: IDrugs) => void
  removeDrugToCart: (drugId: number) => void
  addToCart: () => void
  removeToCart: () => void
}

export interface C {
  drugStore: IDrugStores
  isConnected: boolean
}

export interface P {
  drug: IDrugs
  pictureName: string
  canAdd: boolean
  canRemove: boolean
}
