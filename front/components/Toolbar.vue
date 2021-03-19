<template>
  <div class="toolbar">
    <nuxt-link :to="'/'">
      <Logo />
    </nuxt-link>
    <div class="icons-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import { D, M, C, P } from '~/components/Toolbar.types'

export default Vue.extend<D, M, C, P>({
  components: {
    Logo,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  .icons-container {
    width: 100%;
    display: flex;
  }
}
</style>
