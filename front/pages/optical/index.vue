<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="optical && optical.length" class="optical-container">
      <div v-for="opt in displayedOptical" :key="opt.id" class="optical">
        <PillContainer :drug="opt" :picture-name="'eye'" class="opt" />
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
import { mapState, mapActions } from 'vuex'
import SearchBar from '~/components/SearchBar.vue'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/optical/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
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
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', { opticals: 'optical' }),
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
    if (this.opticals && this.opticals.length) {
      this.optical = this.opticals.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadOptical()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchOptical']),
    async loadOptical() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchOptical()
        this.optical = this.opticals.map((x) => {
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
        this.opticalFromSearch = this.optical
        this.setPages()
      } else {
        this.page = 1
        const opticalFromSearch = this.opticals.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (opticalFromSearch.length) {
          this.opticalFromSearch = opticalFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
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
