import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import { Plugin } from '@nuxt/types'

import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import { DialogOptions } from 'vue/types/vue'

declare module 'vue/types/vue' {
  interface DialogOptions {
    html?: boolean
    loader?: boolean
    reverse?: boolean
    okText?: string
    cancelText?: string
    animation?: 'zoom' | 'bounce' | 'fade'
    type?: 'basic' | 'soft' | 'hard'
    verification?: string
    verificationHelp?: string
    clicksCount?: number
    backdropClose?: true
    customClass?: string
  }

  interface Vue {
    $dialog: {
      alert: (message: string, options?: DialogOptions) => Promise<any>
      confirm: (
        message: string | { title?: string; body?: string },
        options?: DialogOptions
      ) => Promise<any>
    }
    $confirm: (
      message: string | { title?: string; body?: string }
    ) => Promise<any>
  }
}

export function getDialogDefaultOptions(this: Vue): DialogOptions {
  return {
    animation: 'fade',
    cancelText: this.$t('miscellaneous.cancel') as string,
    okText: this.$t('miscellaneous.ok') as string,
    backdropClose: true,
  }
}

const confirmPlugin: Plugin = (context, inject) => {
  inject('confirm', function(this: Vue, message: string | undefined) {
    const title = message
    const defaultOptions = getDialogDefaultOptions.call(this)
    return (Vue as any).dialog.confirm(title, defaultOptions)
  })
}

Vue.use(VuejsDialog, {
  animation: 'fade',
})

export default confirmPlugin
