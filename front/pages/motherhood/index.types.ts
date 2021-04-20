import { IDrugs } from '~/api/api.type'

export interface D {
  maternity: IDrugs[]
  maternityFromSearch: IDrugs[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  loadMaternity: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (maternity: IDrugs[]) => IDrugs[]
}

export interface C {
  displayedMaternity: IDrugs[]
  maternityData: IDrugs[]
  searchDesc: string
}

export interface P {}
