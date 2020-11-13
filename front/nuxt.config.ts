import { Configuration } from '@nuxt/types'
import webpack from 'webpack'

const config: Configuration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'PillsPick',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/i18n',
    '~/plugins/notifications',
    '~/plugins/svg',
    '~/plugins/vuejs-dialog',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost/PillsPick/restapi/',
  },
  router: {
    base: '/',
    middleware: [],
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { selector: '#mainContainerScrollable', x: 0, y: 0 }
      }
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    publicPath: '/_nuxt/',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module!.rules.push({
        test: /\.svg$/i,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      })
      // Stylelint
    },
  },
  styleResources: {
    scss: ['./styles/variables.scss'],
  },
}

export default config
