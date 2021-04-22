<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div
      v-if="naturalCare && naturalCare.length"
      class="natural-care-container"
    >
      <div v-for="nc in displayedNaturalCare" :key="nc.id" class="natural-care">
        <PillContainer :drug="nc" :picture-name="'medicinal-herb'" class="nc" />
      </div>
    </div>
    <div v-if="isLoaded && naturalCareData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/naturalCare/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      naturalCare: [],
      naturalCareFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    displayedNaturalCare() {
      return this.paginate(this.naturalCareData)
    },
    naturalCareData() {
      if (this.naturalCareFromSearch.length) {
        return this.naturalCareFromSearch
      } else {
        return this.naturalCare
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    naturalCare() {
      this.setPages()
    },
  },
  mounted() {
    this.loadNaturalCare()
  },
  methods: {
    async loadNaturalCare() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        const result = await drugsClient(this.$axios).getDrugs()
        this.naturalCare = result.filter((x) => x.headerName === 'natural_care')
        this.isLoaded = true
      } catch (e) {
        this.$notify('', e, 'error', 5000)
        this.isLoaded = false
      } finally {
        this.isLoading = false
        loader.hide()
      }
    },
    async search(searchingValue) {
      if (searchingValue === undefined || searchingValue === '') {
        this.naturalCareFromSearch = this.naturalCare
        this.setPages()
      } else {
        try {
          const result = await drugsClient(this.$axios).getDrugsByName(
            searchingValue
          )
          if (result.length === 0) {
            this.searchEmpty = true
          } else {
            this.naturalCareFromSearch = result.filter(
              (x) => x.headerName === 'natural_care'
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
      const numberOfPages = Math.ceil(
        this.naturalCareData.length / this.perPage
      )
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(naturalCare) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return naturalCare.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .natural-care-container {
    display: flex;
    flex-wrap: wrap;
    .natural-care {
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
    .natural-care-container {
      justify-content: center;
    }
  }
}
</style>
