import { IDrugs } from '~/api/api.type'

export interface D {
  maternity: IDrugs[]
  maternityFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchMotherhood: () => void
  loadMaternity: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (maternity: IDrugs[]) => IDrugs[]
}

export interface C {
  motherhood: IDrugs[]
  displayedMaternity: IDrugs[]
  maternityData: IDrugs[]
  searchDesc: string
}

export interface P {}
