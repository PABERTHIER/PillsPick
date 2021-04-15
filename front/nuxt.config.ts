const config = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'PillsPick',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
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
    '~/plugins/vue-mq',
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
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
  ],
  axios: {
    proxy: true,
    debug: true,
    proxyHeaders: false,
    credentials: false,
    baseURL: process.env.BASE_API_URL || 'http://localhost:7071/api/',
  },
  proxy: {
    '^/api': {
      target: 'http://localhost:7071',
      changeOrigin: true,
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  env: {
    base: process.env.BASE_ROUTE || '/',
    baseApi:
      process.env.BASE_API_URL || 'https://getuserdatas.azurewebsites.net/api/',
    basePublic: process.env.BASE_PUBLIC_ROUTE || 'http://localhost/',
    publicStaticPath: process.env.BASE_URL || '/',
  },
  router: {
    base: process.env.BASE_ROUTE || '/',
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
    publicPath: process.env.BASE_URL || '/_nuxt/',
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
  pwa: {
    workbox: false,
  },
  styleResources: {
    scss: ['./styles/variables.scss', './styles/responsive.scss'],
  },
  // server: {
  //   host: '0.0.0.0',
  // },
  // mobile tests
}

export default config
