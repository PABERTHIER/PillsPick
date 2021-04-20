import { IDrugs } from '~/api/api.type'

export interface D {
  optical: IDrugs[]
  opticalFromSearch: IDrugs[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  loadOptical: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (optical: IDrugs[]) => IDrugs[]
}

export interface C {
  displayedOptical: IDrugs[]
  opticalData: IDrugs[]
  searchDesc: string
}

export interface P {}
