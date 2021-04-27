import { IDrugs } from '~/api/api.type'

export interface D {
  advices: IDrugs[]
  advicesFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchAdvices: () => void
  loadAdvices: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (advices: IDrugs[]) => IDrugs[]
}

export interface C {
  prescriptions: IDrugs[]
  displayedAdvices: IDrugs[]
  advicesData: IDrugs[]
  searchDesc: string
}

export interface P {}
