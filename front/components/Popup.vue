<template>
  <div class="popup-container">
    <div :style="arrowStyle" class="arrow-up" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/Popup.types'

export default Vue.extend<D, M, C, P>({
  props: {
    arrowPosition: {
      type: Number,
      required: false,
      default: 140,
    },
  },
  data() {
    return {}
  },
  computed: {
    arrowStyle() {
      return {
        marginLeft: `${this.arrowPosition}px`,
      }
    },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.popup-container {
  position: absolute;
  top: 80px;
  width: 100%;
  z-index: 200;
  overflow: hidden;
  .arrow-up {
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 13px solid $white;
  }
}
</style>
