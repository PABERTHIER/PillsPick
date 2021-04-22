import { Context } from '@nuxt/types'
import userClient from '~/api/userClient'

export const notifPath = 'notifications/addNotification'
export const notifErrorTitle = 'miscellaneous.error'

export const actions = {
  async dispatchLogin(this: Context, { commit, dispatch }, payload: string) {
    try {
      const data = await userClient(this.$axios).postLogin(payload)
      commit('setUser', data[0]) // de la merde
    } catch (error) {
      dispatch(
        notifPath,
        {
          title: (this.app.i18n as any).t(notifErrorTitle) as string,
          msg: error.error as string,
          type: 'error',
          time: 5000,
        },
        { root: true }
      )
    }
  },
  dispatchLogout(this: Context, { commit }) {
    commit('removeUser')
  },
}

export default actions
