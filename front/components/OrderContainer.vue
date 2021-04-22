<template>
  <div class="order-container">
    <div class="order">
      <div class="header">
        <div v-t="status" class="status" />
        <div class="order-number">
          {{ data.idOrder }}
        </div>
      </div>
      <div class="drug-store-name">
        {{ data.drugStoreName }}
      </div>
      <div class="drugs-container">
        <div v-for="drug in data.orderData" :key="drug.id" class="drug">
          <div class="name">
            <div v-t="'miscellaneous.name'" class="label" />
            <div>{{ drug.name }}</div>
          </div>
          <div class="quantity">
            <div v-t="'miscellaneous.quantity'" class="label" />
            <div>{{ drug.quantity }}</div>
          </div>
          <div class="price">
            <div v-t="'miscellaneous.price'" class="label" />
            <div>{{ drug.price }} {{ ` € ` }}</div>
          </div>
        </div>
      </div>
      <div class="total-amount">
        <div v-t="'miscellaneous.total_amount'" class="label" />
        <div class="amount">
          {{ totalAmount }}
        </div>
      </div>
    </div>
    <div v-if="userType === 'chemist'" class="icon-actions">
      <div v-if="showIcon" class="icon-action-validate">
        <icon name="validate" @click="validate()" />
      </div>
      <div v-if="showIcon" class="icon-action-cancel">
        <icon name="cancel" @click="cancel()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IStatusOrder } from '~/api/api.type'
import { D, M, C, P } from '~/components/OrderContainer.types'

export default Vue.extend<D, M, C, P>({
  props: {
    data: {
      type: Object,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    status() {
      switch (this.data.status) {
        case IStatusOrder.Canceled:
          return 'order-status.canceled'
        case IStatusOrder.Pending:
          return 'order-status.pending'
        case IStatusOrder.InProgress:
          return 'order-status.in_progress'
        case IStatusOrder.Done:
          return 'order-status.done'
        case IStatusOrder.Collected:
          return 'order-status.collected'
        default:
          return 'order-status.no_status'
      }
    },
    showIcon() {
      if (
        this.data.status !== IStatusOrder.Canceled &&
        this.data.status !== IStatusOrder.Done
      ) {
        return true
      }
      return false
    },
    totalAmount() {
      let amount = 0
      for (let i = 0; i < this.data.orderData.length; i++) {
        amount += this.data.orderData[i].price * this.data.orderData[i].quantity
      }
      return `${(Math.round(amount * 100) / 100).toFixed(2)} €`
    },
  },
  methods: {
    validate() {
      this.$emit('validateOrder', this.data.idOrder)
    },
    cancel() {
      this.$emit('cancelOrder', this.data.idOrder)
    },
  },
})
</script>

<style lang="scss" scoped>
.order-container {
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  .order {
    border: solid 1px;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      .status {
        text-transform: uppercase;
      }
      .order-number {
        position: absolute;
        border: solid 1px;
        border-radius: 4px;
        border-color: $primary-color-light;
        top: -10px;
        right: -10px;
        height: 20px;
        padding-top: 4px;
        width: 50px;
        text-align: center;
      }
    }
    .drug-store-name {
      text-align: center;
      margin-bottom: 20px;
      color: $green;
    }
    .drugs-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .drug {
        margin-bottom: 15px;
        margin-right: 5px;
        border: solid 1px;
        border-radius: 2px;
        padding: 5px;
        .name,
        .quantity,
        .price {
          display: flex;
          .label {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .total-amount {
    display: flex;
    justify-content: flex-end;
    .label {
      margin-right: 5px;
    }
  }
  .icon-actions {
    height: 50px;
    .icon-action-validate,
    .icon-action-cancel {
      position: absolute;
      bottom: -10px;
    }
    .icon-action-validate {
      right: 100px;
      fill: $green;
    }
    .icon-action-cancel {
      left: 100px;
      fill: $red;
    }
    .svg-icon {
      cursor: pointer;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
