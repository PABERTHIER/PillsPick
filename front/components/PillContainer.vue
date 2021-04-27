<template>
  <div class="pill-container">
    <div class="picture-container">
      <div class="toto">
        <icon :name="pictureName" :original="true" class="picture" />
      </div>
      <div v-if="canAdd" class="icon-add" @click="addToCart()">
        <icon name="add" />
      </div>
      <div v-if="canRemove" class="icon-remove" @click="removeToCart()">
        <icon name="close" />
      </div>
    </div>
    <div class="icon-info">
      <icon name="info" />
    </div>
    <div class="infos">
      <div class="name">
        {{ drug.name }}
      </div>
      <div class="type">
        {{ drug.type }}
      </div>
      <div class="route-administration">
        {{ drug.routeAdministration }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { D, M, C, P } from '~/components/PillContainer.types'

export default Vue.extend<D, M, C, P>({
  props: {
    drug: {
      type: Object,
      required: true,
    },
    pictureName: {
      type: String,
      required: true,
    },
    canAdd: {
      type: Boolean,
      required: false,
      default: true,
    },
    canRemove: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('drugStores', ['drugStore']),
    ...mapState('user', ['isConnected']),
  },
  methods: {
    ...mapActions('drugs', ['addDrugToCart', 'removeDrugToCart']),
    addToCart() {
      try {
        if (this.isConnected && this.drugStore && this.drugStore.name) {
          this.addDrugToCart(this.drug)
          const infoAdded = 'miscellaneous.drug_added_cart'
          const drugName = this.drug.name
          const info = this.$t(infoAdded, {
            drug: drugName,
          }) as string
          this.$notify('', info, 'info', 2000)
        } else if (this.isConnected && !this.drugStore) {
          const drugStoreTitle = this.$t(
            'miscellaneous.drugstore_required'
          ) as string
          this.$notify('', drugStoreTitle, 'error', 5000)
        } else {
          const connectionTitle = this.$t(
            'miscellaneous.connection_required'
          ) as string
          this.$notify('', connectionTitle, 'error', 5000)
        }
      } catch (e) {
        this.$notify('', e, 'error', 5000)
      }
    },
    removeToCart() {
      this.removeDrugToCart(this.drug.id)
    },
  },
})
</script>

<style lang="scss" scoped>
.pill-container {
  .picture-container {
    border: 1px solid $grey-blue;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    .toto {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      .picture {
        width: 50px;
        height: 50px;
        text-align: center;
      }
    }
    .icon-add,
    .icon-remove {
      text-align: right;
      width: 100%;
    }
  }
  .icon-info {
  }
  .infos {
    margin-left: 15px;
    overflow-y: hidden;
    max-height: 82px;
    .name {
      overflow-x: hidden;
    }
    .type {
      overflow-x: hidden;
    }
    .route-administration {
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
