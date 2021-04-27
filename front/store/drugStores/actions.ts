import { Context } from '@nuxt/types'
import { IDrugStores } from '~/api/api.type'
import drugStoresClient from '~/api/drugStoresClient'

export const actions = {
  dispatchSelectDrugStore(this: Context, { commit }, payload: IDrugStores) {
    commit('setDrugStore', payload)
  },
  removeDrugStore(this: Context, { commit }) {
    commit('deleteDrugStore')
  },
  async dispatchDrugStores(this: Context, { commit }) {
    const drugStores = await drugStoresClient(this.$axios).getDrugStores()
    commit('setDrugStores', drugStores)
  },
}

export default actions
