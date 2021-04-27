import { IDrugStores } from '~/api/api.type'

export interface D {
  drugStores: IDrugStores[]
  drugStoresFromSearch: IDrugStores[]
  isLoaded: boolean
  isLoading: boolean
  page: number
  perPage: number
  pages: any[]
  searchEmpty: boolean
}

export interface M {
  dispatchSelectDrugStore: (data: IDrugStores) => void
  dispatchDrugStores: () => void
  dispatchDrugs: () => void
  selectDrugStore: (data: IDrugStores) => void
  loadDrugStores: () => void
  search: (searchingValue: string) => void
  loadDrugs: () => void
  setPages: () => void
  paginate: (drugs: IDrugStores[]) => IDrugStores[]
}

export interface C {
  drgStores: IDrugStores[]
  displayedDrugStores: IDrugStores[]
  drugStoresData: IDrugStores[]
  searchDesc: string
}

export interface P {}
