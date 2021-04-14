<template>
  <div class="page-container">
    <div v-if="drugs && drugs.length">
      <div v-for="drug in drugs" :key="drug.id">
        <div>{{ drug.name }}</div>
        <div>{{ drug.type }}</div>
        <div>{{ drug.quantity }}</div>
        <div>{{ drug.instructions }}</div>
        <div class="separator" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import drugs from '~/api/drugs'
import { D, M, C, P } from '~/pages/advices/index.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {
      drugs: [],
    }
  },
  computed: {},
  mounted() {
    this.loadDrugs()
  },
  methods: {
    async loadDrugs() {
      try {
        const result = await drugs(this.$axios).getDrugs()
        this.drugs = result.map((x) => {
          return x
        })
      } catch (e) {
        this.$notify('', e, 'error')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .separator {
    margin: 10px 0px;
    border-bottom: 1px solid $grey-blue;
  }
}
</style>
