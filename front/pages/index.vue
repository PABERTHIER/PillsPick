<template>
  <div class="page-container">
    <div class="route">
      <div class="links">
        <nuxt-link v-t="'pages.default.title'" :to="'/'" />
      </div>
      <div class="route-content">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .header {
    position: relative;
  }
  .route {
    background-color: $background-color;
    .links {
      margin-top: 50px;
      display: flex;
      height: 50px;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        text-decoration: none;
        color: $grey;
        padding: 0 48px;
        box-sizing: content-box;
        border-top: 3px solid $background-color;
        border-bottom: 3px solid $background-color;
        white-space: nowrap;
        &.nuxt-link-exact-active,
        &:hover {
          color: $black;
          text-shadow: 0 0 0.65px $black;
          border-bottom: 3px solid $red;
        }
      }
    }
    .route-content {
      position: relative;
      overflow: hidden;
      z-index: 0;
      margin-bottom: 15px;
    }
  }
}

.svg-icon {
  height: 32px;
  width: 32px;
}
</style>
