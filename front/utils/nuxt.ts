import { NuxtAppOptions } from '@nuxt/types'
import VueRouter from 'vue-router'

interface IGlobalNuxt extends NuxtAppOptions {
  $router: VueRouter
}

export const $nuxt = () => (window as any).$nuxt as IGlobalNuxt
