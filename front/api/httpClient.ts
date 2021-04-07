import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'
import { RestOperationResult } from './api.type'

export default ($axios: NuxtAxiosInstance) => ({
  delete<T>(uri: string, cancelToken?: CancelToken) {
    return $axios.$delete<T>(uri, { cancelToken })
  },
  get<T>(uri: string, cancelToken?: CancelToken) {
    return $axios.$get<T>(uri, { cancelToken })
  },
  patch<T>(uri: string, data: any[], cancelToken?: CancelToken) {
    return $axios.$patch<T>(uri, data, { cancelToken })
  },
  post<T>(uri: string, data: any, cancelToken?: CancelToken) {
    return $axios.$post<T>(uri, data, { cancelToken })
  },
  put<T>(uri: string, data: any, cancelToken?: CancelToken) {
    return $axios.$put<T>(uri, data, { cancelToken })
  },
})

export function handleServerError(error: any): RestOperationResult {
  const result = error.response.data
  if (typeof result === 'object') {
    result.success = false
    result.isValid = false
    result.code = error.response.status
    return result
  } else {
    return { success: false, isValid: false, code: error.response.status }
  }
}
