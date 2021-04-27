import { IDrugs } from '~/api/api.type'

export interface D {
  cosmeticBeauty: IDrugs[]
  cosmeticBeautyFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchCosmeticProducts: () => void
  loadCosmeticBeauty: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (cosmeticBeauty: IDrugs[]) => IDrugs[]
}

export interface C {
  cosmeticProducts: IDrugs[]
  displayedCosmeticBeauty: IDrugs[]
  cosmeticBeautyData: IDrugs[]
  searchDesc: string
}

export interface P {}
