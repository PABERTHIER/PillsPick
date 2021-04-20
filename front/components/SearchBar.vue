<template>
  <div class="search-bar">
    <div v-if="searchingValue">
      <icon name="close" @click="clear()" />
    </div>
    <div v-else>
      <icon name="search" />
    </div>
    <input
      v-model="searchingValue"
      class="search-bar-input"
      type="text"
      :placeholder="desc"
      @keyup="search"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/SearchBar.types'

export default Vue.extend<D, M, C, P>({
  props: {
    desc: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      searchingValue: undefined,
    }
  },
  computed: {},
  methods: {
    search() {
      this.$emit('search', this.searchingValue)
    },
    clear() {
      this.searchingValue = undefined
      this.$emit('search', this.searchingValue)
    },
  },
})
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  .search-bar-input {
    margin-left: 10px;
    width: 500px;
    height: 20px;
    border-radius: 5px;
  }
  .svg-icon {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
