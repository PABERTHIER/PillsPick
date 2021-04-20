import { Context } from '@nuxt/types'
import { IDrugStores } from '~/api/api.type'

export const actions = {
  dispatchSelectDrugStore(this: Context, { commit }, payload: IDrugStores) {
    commit('setDrugStore', payload)
  },
  removeDrugStore(this: Context, { commit }) {
    commit('deleteDrugStore')
  },
}

export default actions
