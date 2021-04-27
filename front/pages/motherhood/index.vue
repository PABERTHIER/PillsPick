<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="maternity && maternity.length" class="maternity-container">
      <div v-for="mtn in displayedMaternity" :key="mtn.id" class="maternity">
        <PillContainer :drug="mtn" :picture-name="'baby'" class="mtn" />
      </div>
    </div>
    <div v-if="isLoaded && maternityData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/motherhood/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      maternity: [],
      maternityFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', ['motherhood']),
    displayedMaternity() {
      return this.paginate(this.maternityData)
    },
    maternityData() {
      if (this.maternityFromSearch.length) {
        return this.maternityFromSearch
      } else {
        return this.maternity
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    maternity() {
      this.setPages()
    },
  },
  mounted() {
    if (this.motherhood && this.motherhood.length) {
      this.maternity = this.motherhood.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadMaternity()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchMotherhood']),
    async loadMaternity() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchMotherhood()
        this.maternity = this.motherhood.map((x) => {
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
        this.maternityFromSearch = this.maternity
        this.setPages()
      } else {
        this.page = 1
        const maternityFromSearch = this.motherhood.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (maternityFromSearch.length) {
          this.maternityFromSearch = maternityFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.maternityData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(maternity) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return maternity.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .maternity-container {
    display: flex;
    flex-wrap: wrap;
    .maternity {
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
    .maternity-container {
      justify-content: center;
    }
  }
}
</style>
