<template>
  <div class="toolbar">
    <nuxt-link :to="'/'">
      <Logo />
    </nuxt-link>
    <div class="toolbar-actions">
      <div class="actions-container">
        <div v-if="drugStoreName" class="drug-store-name">
          {{ drugStoreName }}
        </div>
        <div v-if="drugStoreName" class="close-icon">
          <icon name="close" @click="deleteDrugStoreName()" />
        </div>
        <div class="icons-container">
          <Avatar
            :is-connected="isConnected"
            :user-id="userId"
            :user="user"
            @connect="connect"
            @disconnect="disconnect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from '~/components/Avatar.vue'
import Logo from '~/components/Logo.vue'
import { D, M, C, P } from '~/components/Toolbar.types'

export default Vue.extend<D, M, C, P>({
  components: {
    Avatar,
    Logo,
  },
  props: {
    drugStoreName: {
      type: String,
      required: false,
      default: undefined,
    },
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
    return {}
  },
  computed: {},
  methods: {
    deleteDrugStoreName() {
      this.$emit('deleteDrugStoreName')
    },
    connect() {
      this.$emit('connect')
    },
    disconnect() {
      this.$emit('disconnect')
    },
  },
})
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  height: 100%;
  align-items: center;
  .toolbar-actions {
    display: flex;
    height: 100%;
    align-items: center;
    width: 100%;
    .actions-container {
      display: flex;
      height: 100%;
      align-items: center;
      width: 100%;
      .drug-store-name {
        width: 120%;
        text-align: right;
      }
      .close-icon {
        margin-bottom: 10px;
        margin-left: 5px;
      }
      .icons-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
      }
    }
  }
}
.svg-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
  fill: $white;
}
</style>
