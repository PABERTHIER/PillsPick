<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="advices && advices.length" class="advices-container">
      <div v-for="advice in displayedAdvices" :key="advice.id" class="advices">
        <PillContainer :drug="advice" :picture-name="'advice'" class="advice" />
      </div>
    </div>
    <div v-if="isLoaded && advicesData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/advices/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      advices: [],
      advicesFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', { prescriptions: 'advices' }),
    displayedAdvices() {
      return this.paginate(this.advicesData)
    },
    advicesData() {
      if (this.advicesFromSearch.length) {
        return this.advicesFromSearch
      } else {
        return this.advices
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    advices() {
      this.setPages()
    },
  },
  mounted() {
    if (this.prescriptions && this.prescriptions.length) {
      this.advices = this.prescriptions.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadAdvices()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchAdvices']),
    async loadAdvices() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchAdvices()
        this.advices = this.prescriptions.map((x) => {
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
        this.advicesFromSearch = this.advices
        this.setPages()
      } else {
        this.page = 1
        const advicesFromSearch = this.prescriptions.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (advicesFromSearch.length) {
          this.advicesFromSearch = advicesFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.advicesData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(advices) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return advices.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .advices-container {
    display: flex;
    flex-wrap: wrap;
    .advices {
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
    .advices-container {
      justify-content: center;
    }
  }
}
</style>
