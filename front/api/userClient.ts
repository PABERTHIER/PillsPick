import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { IChemist, IUser } from './api.type'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  /* eslint no-throw-literal: "off" */
  postLogin(login: string, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'postLogin/' + login
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        if (x.data.length === 0) {
          throw { error: 'Login incorrect' }
        }
        if (x.type === 'customer') {
          const result = x.data.map((x) => {
            return {
              id: x[0],
              name: x[1],
              lastName: x[2],
              birthDate: x[3],
              address: x[4],
              zipCode: x[5],
              city: x[6],
              ssNumber: x[7],
              mail: x[8],
              phoneNumber: x[9],
              type: 'customer',
            }
          })
          return result as IUser[]
        } else {
          const result = x.data.map((x) => {
            return {
              id: x[0],
              name: x[1],
              lastName: x[2],
              birthDate: x[3],
              address: x[4],
              zipCode: x[5],
              city: x[6],
              idNumber: x[7],
              drugStoreId: x[8],
              mail: x[9],
              phoneNumber: x[10],
              type: 'chemist',
            }
          })
          return result as IChemist[]
        }
      })
      .catch(() => {
        throw { error: 'Login incorrect' }
      })
  },
})
