import { IDrugs } from '~/api/api.type'

export interface D {
  naturalCare: IDrugs[]
  naturalCareFromSearch: IDrugs[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchNaturalCare: () => void
  loadNaturalCare: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (naturalCare: IDrugs[]) => IDrugs[]
}

export interface C {
  naturalCares: IDrugs[]
  displayedNaturalCare: IDrugs[]
  naturalCareData: IDrugs[]
  searchDesc: string
}

export interface P {}
