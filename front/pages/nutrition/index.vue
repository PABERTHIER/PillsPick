<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="dietetic && dietetic.length" class="dietetic-container">
      <div v-for="dt in displayedDietetic" :key="dt.id" class="dietetic">
        <PillContainer :drug="dt" :picture-name="'body'" class="dt" />
      </div>
    </div>
    <div v-if="isLoaded && dieteticData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/nutrition/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      dietetic: [],
      dieteticFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', ['nutrition']),
    displayedDietetic() {
      return this.paginate(this.dieteticData)
    },
    dieteticData() {
      if (this.dieteticFromSearch.length) {
        return this.dieteticFromSearch
      } else {
        return this.dietetic
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    dietetic() {
      this.setPages()
    },
  },
  mounted() {
    if (this.nutrition && this.nutrition.length) {
      this.dietetic = this.nutrition.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadDietetic()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchNutrition']),
    async loadDietetic() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchNutrition()
        this.dietetic = this.nutrition.map((x) => {
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
        this.dieteticFromSearch = this.dietetic
        this.setPages()
      } else {
        this.page = 1
        const dieteticFromSearch = this.nutrition.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (dieteticFromSearch.length) {
          this.dieteticFromSearch = dieteticFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.dieteticData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(dietetic) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return dietetic.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .dietetic-container {
    display: flex;
    flex-wrap: wrap;
    .dietetic {
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
    .dietetic-container {
      justify-content: center;
    }
  }
}
</style>
