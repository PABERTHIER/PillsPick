<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="heal && heal.length" class="heal-container">
      <div v-for="hl in displayedHeal" :key="hl.id" class="heal">
        <PillContainer
          :drug="hl"
          :picture-name="'health-products'"
          class="hl"
        />
      </div>
    </div>
    <div v-if="isLoaded && healData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/healthProducts/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      heal: [],
      healFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', ['healthProducts']),
    displayedHeal() {
      return this.paginate(this.healData)
    },
    healData() {
      if (this.healFromSearch.length) {
        return this.healFromSearch
      } else {
        return this.heal
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    heal() {
      this.setPages()
    },
  },
  mounted() {
    if (this.healthProducts && this.healthProducts.length) {
      this.heal = this.healthProducts.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadHeal()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchHealthProducts']),
    async loadHeal() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchHealthProducts()
        this.heal = this.healthProducts.map((x) => {
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
        this.healFromSearch = this.heal
        this.setPages()
      } else {
        this.page = 1
        const healFromSearch = this.healthProducts.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (healFromSearch.length) {
          this.healFromSearch = healFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.healData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(heal) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return heal.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .heal-container {
    display: flex;
    flex-wrap: wrap;
    .heal {
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
    .heal-container {
      justify-content: center;
    }
  }
}
</style>
