import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import httpClient from '~/api/httpClient'

export default ($axios: NuxtAxiosInstance) => ({
  getMessage(cancelToken?: CancelToken) {
    console.log('toto')
    const url = '/hello'
    return httpClient($axios).get<any>(url, cancelToken)
  },
})
