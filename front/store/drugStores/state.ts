import { IDrugStoreState } from './type'

export const state = (): IDrugStoreState => ({
  drugStore: undefined,
  drugStores: [],
})

export default state
