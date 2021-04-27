<template>
  <div class="page-container">
    <div v-if="cart && cart.length" class="cart-container">
      <div v-for="drug in cart" :key="drug.id" class="cart">
        <PillContainer
          :drug="drug"
          :picture-name="'pill'"
          :can-add="false"
          :can-remove="true"
        />
      </div>
    </div>
    <div v-else v-t="'miscellaneous.cart_empty'" />
    <div class="action">
      <button
        v-t="'miscellaneous.validate_cart'"
        :class="[!cart.length ? 'disabled' : '']"
        :disabled="!cart.length"
        class="button"
        @click="validate()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import ordersClient from '~/api/ordersClient'
import PillContainer from '~/components/PillContainer.vue'
import { D, M, C, P } from '~/pages/cart/_id.types'

export default Vue.extend<D, M, C, P>({
  components: {
    PillContainer,
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('drugs', ['cart']),
    ...mapState('drugStores', ['drugStore']),
    ...mapState('user', ['isConnected', 'user']),
  },
  mounted() {
    if (!this.isConnected) {
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapActions('drugs', ['clearCart']),
    async validate() {
      try {
        const msgInfo = this.$t(
          'miscellaneous.validation_in_progress'
        ) as string
        this.$notify('', msgInfo, 'info', 2000)
        const drugIds = this.cart.map((x) => {
          return x.id
        })
        const order = {
          idUser: this.user.id,
          idDrugStore: this.drugStore.id - 1,
          drugIds,
        }
        await ordersClient(this.$axios).postOrder(order)
        const msg = this.$t('miscellaneous.order_validated') as string
        this.$notify('', msg, 'success', 5000)
        this.clearCart()
        this.$router.replace(`/orders/${this.user.id}`)
      } catch (e) {
        this.$notify('', e, 'error', 5000)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .cart-container {
    display: flex;
    flex-wrap: wrap;
    .cart {
      margin-right: 10px;
      width: 200px;
      height: 200px;
    }
  }
  .action {
    margin-top: 50px;
    .button {
      height: 30px;
      width: 150px;
      display: inline-block;
      color: $white;
      background-color: $blue;
      border: 1px solid $white;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      &.disabled {
        background-color: $white;
        cursor: not-allowed;
        color: $grey;
        border: 1px solid $grey;
      }
    }
  }
}
@include window-down(md) {
  .page-container {
    .cart-container {
      justify-content: center;
    }
  }
}
</style>
