<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="optical && optical.length" class="optical-container">
      <div v-for="opt in displayedOptical" :key="opt.id" class="optical">
        <PillContainer :drug="opt" class="opt" />
      </div>
    </div>
    <div v-if="isLoaded && opticalData.length" class="pagination">
      <div class="page-item">
        <button
          v-t="'miscellaneous.previous'"
          :disabled="page === 1"
          type="button"
          class="page-link"
          @click="page--"
        />
      </div>
      <div class="page-item">
        <button
          v-for="pageNumber in pages.slice(page - 1, page + 5)"
          :key="pageNumber.id"
          type="button"
          class="page-link"
          @click="page = pageNumber"
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
          @click="page++"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import drugsClient from '~/api/drugsClient'
import SearchBar from '~/components/SearchBar.vue'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/optical/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      optical: [],
      opticalFromSearch: [],
      isLoaded: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    displayedOptical() {
      return this.paginate(this.opticalData)
    },
    opticalData() {
      if (this.opticalFromSearch.length) {
        return this.opticalFromSearch
      } else {
        return this.optical
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    optical() {
      this.setPages()
    },
  },
  mounted() {
    this.loadOptical()
  },
  methods: {
    async loadOptical() {
      try {
        const result = await drugsClient(this.$axios).getDrugs()
        this.optical = result.filter((x) => x.headerName === 'optical')
        this.isLoaded = true
      } catch (e) {
        this.$notify('', e, 'error', 5000)
        this.isLoaded = false
      }
    },
    async search(searchingValue) {
      if (searchingValue === undefined || searchingValue === '') {
        this.opticalFromSearch = this.optical
        this.setPages()
      } else {
        try {
          const result = await drugsClient(this.$axios).getDrugsByName(
            searchingValue
          )
          if (result.length === 0) {
            this.searchEmpty = true
          } else {
            this.opticalFromSearch = result.filter(
              (x) => x.headerName === 'optical'
            )
            this.searchEmpty = false
          }
          this.setPages()
        } catch (e) {
          this.$notify('', e, 'error', 5000)
        }
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.opticalData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(optical) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return optical.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .optical-container {
    display: flex;
    flex-wrap: wrap;
    .optical {
      margin-right: 10px;
      width: 200px;
      height: 200px;
    }
  }
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
}
@include window-down(md) {
  .page-container {
    .optical-container {
      justify-content: center;
    }
  }
}
</style>
