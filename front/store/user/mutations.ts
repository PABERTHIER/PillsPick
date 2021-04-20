import { IUserState } from './type'
import { IChemist, IUser } from '~/api/api.type'

export const mutations = {
  setUser(state: IUserState, payload: IUser[] | IChemist[]) {
    state.isConnected = true
    state.user = payload
  },
  removeUser(state: IUserState) {
    state.isConnected = false
    state.user = undefined
  },
}

export default mutations
