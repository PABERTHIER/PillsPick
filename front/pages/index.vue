<template>
  <div class="page-container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  data() {
    return {}
  },
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
})
</script>

<style lang="scss" scoped></style>
