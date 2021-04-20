<template>
  <div class="drug-store-container">
    <div class="picture-container">
      <div class="toto" @click="select()">
        <img class="picture" :src="`drugStore.png`" />
      </div>
    </div>
    <div class="icon-info">
      <icon name="info" @click="openDrugStore()" />
    </div>
    <div class="infos">
      <div class="name">
        {{ data.name }}
      </div>
      <div class="type">
        {{ data.address }}
      </div>
      <div class="zip-code">
        {{ data.zipCode }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/DrugStoreContainer.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    openDrugStore() {
      window.open('//' + this.data.url, '_blank')
    },
    select() {
      this.$emit('selectDrugStore', this.data)
    },
  },
})
</script>

<style lang="scss" scoped>
.drug-store-container {
  .picture-container {
    border: 1px solid $grey-blue;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    .toto {
      width: 100%;
      text-align: center;
      cursor: pointer;
      .picture {
        width: 50px;
        height: 50px;
        text-align: center;
      }
    }
  }

  .infos {
    margin-left: 15px;
    .name {
      overflow-x: hidden;
    }
    .address {
      overflow-x: hidden;
    }
    .zip-code {
      overflow-x: hidden;
    }
  }
}
.svg-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
