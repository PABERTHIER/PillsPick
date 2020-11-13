import { NuxtAppOptions } from '@nuxt/types'

export const $nuxt = () => (window as any).$nuxt as NuxtAppOptions
