import { IDrugs } from '~/api/api.type'

export interface D {
  cosmeticBeauty: IDrugs[]
  cosmeticBeautyFromSearch: IDrugs[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  loadCosmeticBeauty: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (cosmeticBeauty: IDrugs[]) => IDrugs[]
}

export interface C {
  displayedCosmeticBeauty: IDrugs[]
  cosmeticBeautyData: IDrugs[]
  searchDesc: string
}

export interface P {}
