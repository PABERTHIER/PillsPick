<template>
  <div class="pagination">
    <div class="page-item">
      <button
        v-t="'miscellaneous.previous'"
        :disabled="page === 1"
        type="button"
        class="page-link"
        @click="goToPrevious()"
      />
    </div>
    <div class="page-item">
      <button
        v-for="pageNumber in pages.slice(page - 1, page + 5)"
        :key="pageNumber.id"
        type="button"
        class="page-link"
        @click="goToSelected(pageNumber)"
      >
        {{ pageNumber }}
      </button>
    </div>
    <div class="page-item">
      <button
        v-if="page < pages.length"
        v-t="'miscellaneous.next'"
        type="button"
        class="page-link"
        @click="goToNext()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/Pagination.types'

export default Vue.extend<D, M, C, P>({
  props: {
    data: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    perPage: {
      type: Number,
      required: false,
      default: 40,
    },
  },
  data() {
    return {
      pages: [],
    }
  },
  computed: {
    displayedData() {
      return this.paginate(this.data)
    },
  },
  watch: {
    data() {
      this.setPages()
    },
  },
  methods: {
    setPages() {
      const numberOfPages = Math.ceil(this.data.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(data) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return data.slice(from, to)
    },
    goToPrevious() {
      this.$emit('goToPrevious', this.page - 1)
    },
    goToSelected(pageNumber) {
      this.$emit('goToSelected', pageNumber)
    },
    goToNext() {
      this.$emit('goToNext', this.page + 1)
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  button.page-link {
    display: inline-block;
    font-size: 20px;
    color: $blue;
    font-weight: 500;
  }
}
@include window-down(md) {
  .page-container {
    .data-container {
      justify-content: center;
    }
  }
}
</style>
