<template>
  <div class="page-container">
    <div v-if="drugs && drugs.length" class="drugs-container">
      <div v-for="drug in drugs" :key="drug.id" class="drugs">
        <PillContainer :drug="drug" class="drug" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import drugs from '~/api/drugs'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/pills/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    PillContainer,
  },
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
  .drugs-container {
    display: flex;
    flex-wrap: wrap;
    .drug {
      margin-right: 10px;
      width: 200px;
      height: 200px;
    }
  }
}
</style>
