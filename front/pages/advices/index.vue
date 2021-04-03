<template>
  <div class="page-container">
    <div @click="toto()">Click on me !</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import toto from '~/api/toto'
import { D, M, C, P } from '~/pages/advices/index.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.toto()
  },
  methods: {
    async toto() {
      try {
        const text = await toto(this.$axios).getMessage()
        console.log(text)
      } catch (e) {
        console.log(e)
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
