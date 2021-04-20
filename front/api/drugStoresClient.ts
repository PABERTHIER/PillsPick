import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { IDrugStores } from './api.type'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getDrugStores(cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getDrugStores'
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            url: x[1],
            name: x[2],
            holdersName: x[3],
            address: x[4],
            departement: x[5],
            area: x[6],
            zipCode: x[7],
            city: x[8],
          }
        })
        return result as IDrugStores[]
      })
  },
  getDrugStoresByZipCode(zipCode: string, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getDrugStoresByZipCode/' + zipCode
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            url: x[1],
            name: x[2],
            holdersName: x[3],
            address: x[4],
            departement: x[5],
            area: x[6],
            zipCode: x[7],
            city: x[8],
          }
        })
        return result as IDrugStores[]
      })
  },
})
