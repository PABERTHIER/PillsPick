module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue-i18n/recommended',
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    'no-console': 1,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-unused-vars': 0,
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'import/no-webpack-loader-syntax': 0,
    'vue/no-v-html': 0,
    'vue-i18n/no-v-html': 0,
  },
  settings: {
    'vue-i18n': {
      localeDir: './locales/*.json', // extention is glob formatting!
    },
  },
}
