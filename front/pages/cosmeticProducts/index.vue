<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div
      v-if="cosmeticBeauty && cosmeticBeauty.length"
      class="cosmetic-beauty-container"
    >
      <div
        v-for="cb in displayedCosmeticBeauty"
        :key="cb.id"
        class="cosmetic-beauty"
      >
        <PillContainer
          :drug="cb"
          :picture-name="'cosmetic-products'"
          class="cb"
        />
      </div>
    </div>
    <div v-if="isLoaded && cosmeticBeautyData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/cosmeticProducts/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      cosmeticBeauty: [],
      cosmeticBeautyFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', ['cosmeticProducts']),
    displayedCosmeticBeauty() {
      return this.paginate(this.cosmeticBeautyData)
    },
    cosmeticBeautyData() {
      if (this.cosmeticBeautyFromSearch.length) {
        return this.cosmeticBeautyFromSearch
      } else {
        return this.cosmeticBeauty
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    cosmeticBeauty() {
      this.setPages()
    },
  },
  mounted() {
    if (this.cosmeticProducts && this.cosmeticProducts.length) {
      this.cosmeticBeauty = this.cosmeticProducts.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadCosmeticBeauty()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchCosmeticProducts']),
    async loadCosmeticBeauty() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchCosmeticProducts()
        this.cosmeticBeauty = this.cosmeticProducts.map((x) => {
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
        this.cosmeticBeautyFromSearch = this.cosmeticBeauty
        this.setPages()
      } else {
        this.page = 1
        const cosmeticBeautyFromSearch = this.cosmeticProducts.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (cosmeticBeautyFromSearch.length) {
          this.cosmeticBeautyFromSearch = cosmeticBeautyFromSearch
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
        this.cosmeticBeautyData.length / this.perPage
      )
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(cosmeticBeauty) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return cosmeticBeauty.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .cosmetic-beauty-container {
    display: flex;
    flex-wrap: wrap;
    .cosmetic-beauty {
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
    .cosmetic-beauty-container {
      justify-content: center;
    }
  }
}
</style>
