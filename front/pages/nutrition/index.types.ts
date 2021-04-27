import { IDrugs } from '~/api/api.type'

export interface D {
  dietetic: IDrugs[]
  dieteticFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchNutrition: () => void
  loadDietetic: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (dietetic: IDrugs[]) => IDrugs[]
}

export interface C {
  nutrition: IDrugs[]
  displayedDietetic: IDrugs[]
  dieteticData: IDrugs[]
  searchDesc: string
}

export interface P {}
