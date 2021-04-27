import { IDrugs } from '~/api/api.type'

export interface D {
  dressings: IDrugs[]
  dressingsFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchDressings: () => void
  loadDressings: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (dressings: IDrugs[]) => IDrugs[]
}

export interface C {
  pads: IDrugs[]
  displayedDressings: IDrugs[]
  dressingsData: IDrugs[]
  searchDesc: string
}

export interface P {}
