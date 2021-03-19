import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: Infinity,
  },
  defaultBreakpoint: 'xxl',
})

declare module 'vue/types/vue' {
  interface Vue {
    $mq: 'sm' | 'md' | 'lg'
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $mq: 'sm' | 'md' | 'lg'
  }
}
