import { IDrugStores } from '~/api/api.type'

export interface D {}

export interface M {
  openDrugStore: () => void
  select: () => void
}

export interface C {}

export interface P {
  data: IDrugStores
}
