import { IDrugStores } from '~/api/api.type'

export interface D {
  drugStores: IDrugStores[]
  drugStoresFromSearch: IDrugStores[]
  isLoaded: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchSelectDrugStore: (data: IDrugStores) => void
  selectDrugStore: (data: IDrugStores) => void
  loadDrugStores: () => void
  search: (searchingValue: string) => void
  setPages: () => void
  paginate: (drugs: IDrugStores[]) => IDrugStores[]
}

export interface C {
  displayedDrugStores: IDrugStores[]
  drugStoresData: IDrugStores[]
  searchDesc: string
}

export interface P {}
