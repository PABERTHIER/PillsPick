<template>
  <div class="page-container">
    <SearchBar :desc="searchDesc" @search="search" />
    <div v-if="orthopedic && orthopedic.length" class="orthopedic-container">
      <div v-for="opt in displayedOrthopedic" :key="opt.id" class="orthopedic">
        <PillContainer :drug="opt" :picture-name="'orthopedic'" class="ort" />
      </div>
    </div>
    <div v-if="isLoaded && orthopedicData.length" class="pagination">
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
import { D, M, C, P } from '~/pages/orthopedic/index.types'

export default Vue.extend<D, M, C, P>({
  name: 'Index',
  components: {
    PillContainer,
    SearchBar,
  },
  props: {},
  data() {
    return {
      orthopedic: [],
      orthopedicFromSearch: [],
      isLoaded: false,
      isLoading: false,
      page: 1,
      perPage: 40,
      pages: [],
      searchEmpty: false,
    }
  },
  computed: {
    ...mapState('drugs', { orthopedics: 'orthopedic' }),
    displayedOrthopedic() {
      return this.paginate(this.orthopedicData)
    },
    orthopedicData() {
      if (this.orthopedicFromSearch.length) {
        return this.orthopedicFromSearch
      } else {
        return this.orthopedic
      }
    },
    searchDesc() {
      return this.$t('miscellaneous.look_for_drug') as string
    },
  },
  watch: {
    orthopedic() {
      this.setPages()
    },
  },
  mounted() {
    if (this.orthopedics && this.orthopedics.length) {
      this.orthopedic = this.orthopedics.map((x) => {
        return x
      })
      this.isLoaded = true
    } else {
      this.loadOrthopedic()
    }
  },
  methods: {
    ...mapActions('drugs', ['dispatchOrthopedic']),
    async loadOrthopedic() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        await this.dispatchOrthopedic()
        this.orthopedic = this.orthopedics.map((x) => {
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
        this.orthopedicFromSearch = this.orthopedic
        this.setPages()
      } else {
        this.page = 1
        const orthopedicFromSearch = this.orthopedics.filter((x) =>
          x.name.startsWith(searchingValue.toUpperCase())
        )
        if (orthopedicFromSearch.length) {
          this.orthopedicFromSearch = orthopedicFromSearch
          this.searchEmpty = false
        } else {
          this.searchEmpty = true
        }
        this.setPages()
      }
    },
    setPages() {
      this.pages = []
      const numberOfPages = Math.ceil(this.orthopedicData.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(orthopedic) {
      const page = this.page
      const perPage = this.perPage
      const from = page * perPage - perPage
      const to = page * perPage
      return orthopedic.slice(from, to)
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .orthopedic-container {
    display: flex;
    flex-wrap: wrap;
    .orthopedic {
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
    .orthopedic-container {
      justify-content: center;
    }
  }
}
</style>
