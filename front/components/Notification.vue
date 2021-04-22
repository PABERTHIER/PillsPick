<template>
  <div class="notification">
    <div class="notification-icon">
      <icon
        v-if="type === 'success'"
        :fill="true"
        name="success-notif"
        original
      />
      <icon v-if="type === 'error'" :fill="true" name="error-notif" original />
      <icon v-if="type === 'info'" :fill="true" name="info" original />
    </div>
    <div class="notification-body">
      <h2 class="title">{{ title }}</h2>
      <div class="notification-body-message">
        {{ msg }}
      </div>
    </div>
    <div class="notification-close" @click="close()">
      <icon :fill="true" name="close" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/Notification.types'

export default Vue.extend<D, M, C, P>({
  props: {
    title: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    type: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
@include window-up(md) {
  .notification {
    position: relative;
    overflow: hidden;
    height: 150px;
    width: 500px;
    background-color: $white;
    border: 1px solid #f2f2f2;
    @include shadow-default;
  }
  .notification-body {
    margin: 25px 25px 0px 70px;
    h3 {
      text-transform: uppercase;
    }
    .notification-body-message {
      opacity: 0.5;
    }
  }
}
@include window-down(md) {
  .notification {
    position: relative;
    overflow: hidden;
    background-color: $white;
    border: 1px solid #f2f2f2;
    .notification-close {
      .svg-icon {
        height: 20px;
        width: 20px;
      }
    }
  }
  .notification-body {
    .title {
      text-align: center;
      margin: 75px 15px 0px 15px;
    }
    h3 {
      text-transform: uppercase;
    }
    .notification-body-message {
      opacity: 0.5;
      margin: 25px 15px 40px 15px;
    }
  }
}
.notification-icon {
  position: absolute;
  top: 15px;
  left: 15px;
  .svg-icon {
    height: 38px;
    width: 38px;
  }
}
.notification-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  .svg-icon {
    height: 14px;
    width: 14px;
    fill: #a4afb7;
  }
}
</style>
