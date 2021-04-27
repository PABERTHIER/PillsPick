<template>
  <div v-click-outside="closePopup" class="avatar-container">
    <icon
      name="avatar"
      :original="true"
      class="avatar-icon"
      :class="status"
      @click="togglePopup"
    />
    <div v-if="cart && cart.length" class="items-number">
      {{ cart.length }}
    </div>
    <Popup v-if="showActions" class="popup">
      <div class="content">
        <HeyYou v-if="user" :user="user" class="hey" />
        <nuxt-link
          v-if="userId !== 0"
          :to="`/cart/${userId}`"
          class="cart link"
          @click.native="closePopup"
        >
          <div class="icon">
            <icon name="cart" />
          </div>
          <div v-t="'miscellaneous.cart'" />
        </nuxt-link>
        <nuxt-link
          v-if="userId !== 0"
          :to="`/orders/${userId}`"
          class="orders link"
          @click.native="closePopup"
        >
          <div class="icon">
            <icon name="order" />
          </div>
          <div v-t="'miscellaneous.orders'" />
        </nuxt-link>
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
import { mapState } from 'vuex'
import HeyYou from '~/components/HeyYou.vue'
import Popup from '~/components/Popup.vue'
import { D, M, C, P } from '~/components/Avatar.types'

export default Vue.extend<D, M, C, P>({
  components: {
    HeyYou,
    Popup,
  },
  directives: {
    'click-outside': {
      bind(el: any, binding, vNode) {
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        document.addEventListener('click', handler)
      },

      unbind(el: any, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      },
    },
  },
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      showActions: false,
    }
  },
  computed: {
    ...mapState('drugs', ['cart']),
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
    closePopup() {
      this.showActions = false
    },
  },
})
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  .avatar-icon {
    border-radius: 50%;
  }
  .not-connected {
    border: 8px solid $red;
    &.svg-icon {
      fill-opacity: 0.3;
    }
  }
  .connected {
    border: 8px solid $green;
    &.svg-icon {
      fill-opacity: 1;
    }
  }
  .items-number {
    position: absolute;
    top: 43px;
    right: -5px;
    background-color: $white;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: $blue;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
  }
  .popup {
    right: 0px;
    width: 198px;
    .hey {
      margin-bottom: 25px;
    }
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
