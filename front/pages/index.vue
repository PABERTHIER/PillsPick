<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="drugStores.length && isLoaded" class="drug-stores-container">
      <div v-for="drugStore in displayedDrugStores" :key="drugStore.id">
        <DrugStoreContainer
          :data="drugStore"
          class="drug-store"
          @selectDrugStore="selectDrugStore"
        />
      </div>
    </div>
    <div v-if="isLoaded && drugStoresData.length" class="pagination">
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
import { mapState, mapActions } from 'vuex'
import DrugStoreContainer from '~/components/DrugStoreContainer.vue'
import SearchBar from '~/components/SearchBar.vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    DrugStoreContainer,
    SearchBar,
  },
  data() {
    return {
      drugStores: [],
      drugStoresFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
  computed: {
    ...mapState('drugStores', { drgStores: 'drugStores' }),
    displayedDrugStores() {
      return this.paginate(this.drugStoresData)
    },
    drugStoresData() {
      if (this.drugStoresFromSearch.length) {
        return this.drugStoresFromSearch
      } else {
        return this.drugStores
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug_store') as string
    },
  },
  watch: {
    drugStores() {
      this.setPages()
    },
  },
  mounted() {
    if (this.drgStores && this.drgStores.length) {
      this.drugStores = this.drgStores.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadDrugStores()
      this.loadDrugs()
    }
  },
  methods: {
    ...mapActions('drugStores', [
      'dispatchSelectDrugStore',
      'dispatchDrugStores',
    ]),
    ...mapActions('drugs', ['dispatchDrugs']),
    selectDrugStore(data) {
      this.dispatchSelectDrugStore(data)
    },
    async loadDrugStores() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchDrugStores()
        this.drugStores = this.drgStores.map((x) => {
          return x
        })
        this.isLoaded = true
      } catch (e) {
        this.$notify('', e, 'error', 5000)
        this.isLoaded = false
      } finally {
        this.isLoading = false
        loader.hide()
      }
    },
    search(searchingValue) {
      if (searchingValue === undefined || searchingValue === '') {
        this.drugStoresFromSearch = this.drugStores
        this.setPages()
      } else {
        this.page = 1
        const drugStoresFromSearch = this.drgStores.filter((x) =>
          x.zipCode.startsWith(searchingValue)
        )
        if (drugStoresFromSearch.length) {
          this.drugStoresFromSearch = drugStoresFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    loadDrugs() {
      this.dispatchDrugs()
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.drugStoresData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(drugStores) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return drugStores.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .drug-stores-container {
    display: flex;
    flex-wrap: wrap;
    .drug-store {
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
    .drug-stores-container {
      justify-content: center;
    }
  }
}
</style>
