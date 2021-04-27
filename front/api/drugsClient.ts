import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { IDrugs } from './api.type'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getDrugs(cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getDrugs'
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            name: x[1],
            type: x[2],
            instructions: x[3],
            pictureId: x[4],
            cisCode: x[5],
            routeAdministration: x[6],
            owner: x[7],
            isWatched: x[8],
            headerName: x[9],
          }
        })
        return result as IDrugs[]
      })
  },
  getDrugsByName(name: string, headerName: string, cancelToken?: CancelToken) {
    const url = `${process.env.baseApi}getDrugsByName/${headerName}/${name}`
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            name: x[1],
            type: x[2],
            instructions: x[3],
            pictureId: x[4],
            cisCode: x[5],
            routeAdministration: x[6],
            owner: x[7],
            isWatched: x[8],
            headerName: x[9],
          }
        })
        return result as IDrugs[]
      })
  },
  getDrugsByHeaderName(headerName: string, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getDrugsByHeaderName/' + headerName
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            id: x[0],
            name: x[1],
            type: x[2],
            instructions: x[3],
            pictureId: x[4],
            cisCode: x[5],
            routeAdministration: x[6],
            owner: x[7],
            isWatched: x[8],
            headerName: x[9],
          }
        })
        return result as IDrugs[]
      })
  },
})
