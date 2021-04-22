<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="drugs && drugs.length" class="drugs-container">
      <div v-for="drug in displayedDrugs" :key="drug.id" class="drugs">
        <PillContainer :drug="drug" :picture-name="'pill'" class="drug" />
      </div>
    </div>
    <!-- <div v-show="drugs.length === 0" v-t="'miscellaneous.no_element'" /> -->
    <!-- <Pagination
      v-if="isLoaded && drugs.length"
      :data="drugs"
      :page="page"
      :per-page="perPage"
      @goToPrevious="goToPrevious"
      @goToSelected="goToSelected"
      @goToNext="goToNext"
    /> -->
    <div v-if="isLoaded && drugsData.length" class="pagination">
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
// import Pagination from '~/components/Pagination.vue'
import SearchBar from '~/components/SearchBar.vue'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/pills/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    // Pagination,
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      drugs: [],
      drugsFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    displayedDrugs() {
      return this.paginate(this.drugsData)
    },
    drugsData() {
      if (this.drugsFromSearch.length) {
        return this.drugsFromSearch
      } else {
        return this.drugs
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    drugs() {
      this.setPages()
    },
  },
  mounted() {
    this.loadDrugs()
  },
  methods: {
    async loadDrugs() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        const result = await drugsClient(this.$axios).getDrugs()
        this.drugs = result.filter((x) => x.headerName === 'drug')
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
        this.drugsFromSearch = this.drugs
        this.setPages()
      } else {
        try {
          const result = await drugsClient(this.$axios).getDrugsByName(
            searchingValue
          )
          if (result.length === 0) {
            this.searchEmpty = true
          } else {
            this.drugsFromSearch = result.filter((x) => x.headerName === 'drug')
            this.searchEmpty = false
          }
          this.setPages()
        } catch (e) {
          this.$notify('', e, 'error', 5000)
        }
      }
    },
    // goToPrevious() {
    //   this.page++
    // },
    // goToSelected(pageNumber) {
    //   this.page = pageNumber
    // },
    // goToNext() {
    //   this.page--
    // },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.drugsData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(drugs) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return drugs.slice(from, to)
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
  .pagination {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .page-item {
    }
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
    .drugs-container {
      justify-content: center;
    }
  }
}
</style>
