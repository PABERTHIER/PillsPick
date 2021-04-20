import { IDrugs } from '~/api/api.type'

export interface D {
  dietetic: IDrugs[]
  dieteticFromSearch: IDrugs[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  loadDietetic: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (dietetic: IDrugs[]) => IDrugs[]
}

export interface C {
  displayedDietetic: IDrugs[]
  dieteticData: IDrugs[]
  searchDesc: string
}

export interface P {}
