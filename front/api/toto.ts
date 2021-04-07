import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getMessage(cancelToken?: CancelToken) {
    const url = process.env.baseApi + 'hello'
    return httpClient($axios).get<any>(url, cancelToken)
  },
})
