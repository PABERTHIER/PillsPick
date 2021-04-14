import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { IDrugs } from './api.type'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getDrugs(cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getdrugs'
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            name: x[1],
            type: x[2],
            quantity: x[3],
            instructions: x[4],
            pictureId: x[5],
          }
        })
        return result as IDrugs[]
      })
  },
})
