import { IDrugs } from '~/api/api.type'

export interface IDrugState {
  advices: IDrugs[]
  cosmeticProducts: IDrugs[]
  dressings: IDrugs[]
  healthProducts: IDrugs[]
  motherhood: IDrugs[]
  naturalCare: IDrugs[]
  nutrition: IDrugs[]
  optical: IDrugs[]
  orthopedic: IDrugs[]
  pills: IDrugs[]
  cart: IDrugs[]
}
