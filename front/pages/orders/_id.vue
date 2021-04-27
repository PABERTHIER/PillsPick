<template>
  <div class="page-container">
    <div class="orders">
      <div v-for="order in orders" :key="order.id" class="order">
        <OrderContainer
          v-if="order.orderData.length"
          :data="order"
          :user-type="userType"
          class="ord"
          @validateOrder="validateOrder"
          @cancelOrder="cancelOrder"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ordersClient from '~/api/ordersClient'
import OrderContainer from '~/components/OrderContainer.vue'
import { D, M, C, P } from '~/pages/orders/_id.types'

export default Vue.extend<D, M, C, P>({
  components: {
    OrderContainer,
  },
  props: {},
  data() {
    return {
      orders: [],
      isLoading: false,
    }
  },
  computed: {
    ...mapState('user', ['user', 'isConnected']),
    userId() {
      return this.$route.params.id
    },
    drugStoreId() {
      return this.user.drugStoreId
    },
    userType() {
      return this.user ? this.user.type : 'customer'
    },
  },
  mounted() {
    if (this.isConnected) {
      this.loadOrders()
    } else {
      this.$router.replace('/')
    }
  },
  methods: {
    async loadOrders() {
      this.isLoading = true
      const loader = this.$loading.show({
        container: undefined,
      })
      try {
        if (this.userType === 'chemist') {
          this.orders = await ordersClient(this.$axios).getOrdersByDrugStoreId(
            this.drugStoreId
          )
        } else {
          this.orders = await ordersClient(this.$axios).getOrdersByCustomerId(
            this.userId
          )
        }
      } catch (e) {
        this.$notify('', e, 'error', 5000)
      } finally {
        this.isLoading = false
        loader.hide()
      }
    },
    async validateOrder(orderId) {
      try {
        const msgInfo = this.$t(
          'miscellaneous.validation_in_progress'
        ) as string
        this.$notify('', msgInfo, 'info', 2000)
        await ordersClient(this.$axios).validateOrder(orderId)
        const msg = this.$t('miscellaneous.order_validated') as string
        this.$notify('', msg, 'success', 5000)
        this.loadOrders()
      } catch (e) {
        this.$notify('', e, 'error', 5000)
      }
    },
    async cancelOrder(orderId) {
      try {
        const msgInfo = this.$t(
          'miscellaneous.cancellation_in_progress'
        ) as string
        this.$notify('', msgInfo, 'info', 2000)
        await ordersClient(this.$axios).cancelOrder(orderId)
        const msg = this.$t('miscellaneous.order_canceled') as string
        this.$notify('', msg, 'success', 5000)
        this.loadOrders()
      } catch (e) {
        this.$notify('', e, 'error', 5000)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  .orders {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
@include window-up(md) {
  .page-container {
    .orders {
      .ord {
        width: 500px;
        margin-right: 40px;
      }
    }
  }
}
@include window-down(xl) {
  .page-container {
    .orders {
      justify-content: center;
    }
  }
}
@include window-down(md) {
  .page-container {
    .orders {
      .ord {
        max-width: 300px;
      }
    }
  }
}
</style>
