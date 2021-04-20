import { IUserState } from './type'

export const state = (): IUserState => ({
  isConnected: false,
  user: undefined,
})

export default state
