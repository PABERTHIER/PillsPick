import { IDrugStoreState } from './type'
import { IDrugStores } from '~/api/api.type'

export const mutations = {
  setDrugStore(state: IDrugStoreState, payload: IDrugStores) {
    state.drugStore = Object.assign({}, state.drugStore, payload)
  },
  deleteDrugStore(state: IDrugStoreState) {
    state.drugStore = undefined
  },
  setDrugStores(state: IDrugStoreState, payload: IDrugStores[]) {
    state.drugStores = payload
  },
}

export default mutations
