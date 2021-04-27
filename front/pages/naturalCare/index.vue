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
import { mapState, mapActions } from 'vuex'
import SearchBar from '~/components/SearchBar.vue'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/naturalCare/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
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
    ...mapState('drugs', { naturalCares: 'naturalCare' }),
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
    if (this.naturalCares && this.naturalCares.length) {
      this.naturalCare = this.naturalCares.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadNaturalCare()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchNaturalCare']),
    async loadNaturalCare() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchNaturalCare()
        this.naturalCare = this.naturalCares.map((x) => {
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
        this.naturalCareFromSearch = this.naturalCare
        this.setPages()
      } else {
        this.page = 1
        const naturalCareFromSearch = this.naturalCares.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (naturalCareFromSearch.length) {
          this.naturalCareFromSearch = naturalCareFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
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
