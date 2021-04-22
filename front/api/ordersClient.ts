import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { IOrders } from './api.type'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getOrdersByCustomerId(id: number, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getOrdersByCustomerId/' + id
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            idOrder: x[0],
            status: x[1],
            drugStoreName: x[2],
            orderData: x[3],
          }
        })
        return result as IOrders[]
      })
  },
  getOrdersByDrugStoreId(id: number, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'getOrdersByDrugStoreId/' + id
    return httpClient($axios)
      .get<any>(url, cancelToken)
      .then((x) => {
        const result = x.map((x) => {
          return {
            idOrder: x[0],
            status: x[1],
            drugStoreName: x[2],
            orderData: x[3],
          }
        })
        return result as IOrders[]
      })
  },
  validateOrder(id: number, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'validateOrder/' + id
    return httpClient($axios).post<void>(url, cancelToken)
  },
  cancelOrder(id: number, cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'cancelOrder/' + id
    return httpClient($axios).post<void>(url, cancelToken)
  },
})
