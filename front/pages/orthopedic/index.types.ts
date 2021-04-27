import { IDrugs } from '~/api/api.type'

export interface D {
  orthopedic: IDrugs[]
  orthopedicFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchOrthopedic: () => void
  loadOrthopedic: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (orthopedic: IDrugs[]) => IDrugs[]
}

export interface C {
  orthopedics: IDrugs[]
  displayedOrthopedic: IDrugs[]
  orthopedicData: IDrugs[]
  searchDesc: string
}

export interface P {}
