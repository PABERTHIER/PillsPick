<template>
  <div class="logo-container">
    <img :src="`icon.png`" class="logo" alt="logo" />
    <div v-t="'pages.default.title'" class="header" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/Logo.types'

export default Vue.extend<D, M, C, P>({
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.logo-container {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 9px;
  .logo {
    width: 50px;
    height: 50px;
  }
}
@include window-down(md) {
  .logo-container {
    .header {
      display: none;
    }
  }
}
@include window-up(md) {
  .logo-container {
    .header {
      margin-left: 15px;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
