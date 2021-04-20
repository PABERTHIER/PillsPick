<template>
  <div class="avatar-container">
    <icon
      name="avatar"
      :original="true"
      class="avatar-icon"
      :class="status"
      @click="togglePopup"
    />
    <Popup v-if="showActions" class="popup">
      <div class="content" @click.stop>
        <div v-if="isConnected" class="orders link">
          <div class="icon">
            <icon name="order" />
          </div>
          <div v-t="'miscellaneous.orders'" />
        </div>
        <div v-if="!isConnected" class="login link" @click="connect()">
          <div class="icon">
            <icon name="power-button" />
          </div>
          <div v-t="'miscellaneous.login'" />
        </div>
        <div v-else-if="isConnected" class="login link" @click="disconnect()">
          <div class="icon">
            <icon name="power-button" />
          </div>
          <div v-t="'miscellaneous.logout'" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from '~/components/Popup.vue'
import { D, M, C, P } from '~/components/Avatar.types'

export default Vue.extend<D, M, C, P>({
  components: {
    Popup,
  },
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showActions: false,
    }
  },
  computed: {
    status() {
      if (this.isConnected) {
        return 'connected'
      }
      return 'not-connected'
    },
  },
  methods: {
    togglePopup() {
      this.showActions = !this.showActions
    },
    connect() {
      this.$emit('connect')
      this.togglePopup()
    },
    disconnect() {
      this.$emit('disconnect')
      this.togglePopup()
    },
  },
})
</script>

<style lang="scss" scoped>
.avatar-container {
  .avatar-icon {
    border-radius: 50%;
  }
  .not-connected {
    border: 2px solid $red;
  }
  .connected {
    border: 2px solid $green;
  }
  .popup {
    right: 0px;
    width: 198px;
    .content {
      padding: 10px;
      color: $black;
      background-color: $white;
      .link {
        cursor: pointer;
        display: flex;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &:hover {
          text-shadow: $orange 1px 0 10px;
        }
        .icon {
          margin-right: 5px;
        }
      }
      .svg-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
  }
}
.svg-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
