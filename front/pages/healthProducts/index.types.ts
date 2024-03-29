import { IDrugs } from '~/api/api.type'

export interface D {
  heal: IDrugs[]
  healFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchHealthProducts: () => void
  loadHeal: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (heal: IDrugs[]) => IDrugs[]
}

export interface C {
  healthProducts: IDrugs[]
  displayedHeal: IDrugs[]
  healData: IDrugs[]
  searchDesc: string
}

export interface P {}
