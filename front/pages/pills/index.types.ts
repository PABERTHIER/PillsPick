import { IDrugs } from '~/api/api.type'

export interface D {
  drugs: IDrugs[]
  drugsFromSearch: IDrugs[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  loadDrugs: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (drugs: IDrugs[]) => IDrugs[]
  // goToPrevious: () => void
  // goToSelected: (pageNumber: number) => void
  // goToNext: () => void
}

export interface C {
  displayedDrugs: IDrugs[]
  drugsData: IDrugs[]
  searchDesc: string
}

export interface P {}
