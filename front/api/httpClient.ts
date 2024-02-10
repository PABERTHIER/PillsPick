import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'

export default ($axios: NuxtAxiosInstance) => ({
  get<T>(uri: string, cancelToken?: CancelToken) {
    return $axios.$get<T>(uri, { cancelToken })
  },
  post<T>(uri: string, data: any, cancelToken?: CancelToken) {
    return $axios.$post<T>(uri, data, { cancelToken })
  },
})
