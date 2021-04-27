<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="dressings && dressings.length" class="dressings-container">
      <div
        v-for="dressing in displayedDressings"
        :key="dressing.id"
        class="dressings"
      >
        <PillContainer
          :drug="dressing"
          :picture-name="'dressing'"
          class="dressing"
        />
      </div>
    </div>
    <div v-if="isLoaded && dressingsData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/dressings/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      dressings: [],
      dressingsFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', { pads: 'dressings' }),
    displayedDressings() {
      return this.paginate(this.dressingsData)
    },
    dressingsData() {
      if (this.dressingsFromSearch.length) {
        return this.dressingsFromSearch
      } else {
        return this.dressings
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    dressings() {
      this.setPages()
    },
  },
  mounted() {
    if (this.pads && this.pads.length) {
      this.dressings = this.pads.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadDressings()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchDressings']),
    async loadDressings() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchDressings()
        this.dressings = this.pads.map((x) => {
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
        this.dressingsFromSearch = this.dressings
        this.setPages()
      } else {
        this.page = 1
        const dressingsFromSearch = this.pads.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (dressingsFromSearch.length) {
          this.dressingsFromSearch = dressingsFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.dressingsData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(dressings) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return dressings.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .dressings-container {
    display: flex;
    flex-wrap: wrap;
    .dressings {
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
    .dressings-container {
      justify-content: center;
    }
  }
}
</style>
