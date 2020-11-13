declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
  export interface P {}
}

declare module '*.svg' {
  const content: any
  export default content
}
