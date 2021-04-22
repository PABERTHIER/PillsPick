<template>
  <div class="hey-you">
    <div v-t="'components.hey-you.hello'" class="header" />
    <div class="name">
      <div class="first-name">
        {{ user.name }}
      </div>
      <div class="last-name">
        {{ user.lastName }}
      </div>
    </div>
    <div
      v-if="user.type === 'chemist'"
      v-t="'miscellaneous.chemist'"
      class="user-type chemist"
    />
    <div v-else v-t="'miscellaneous.customer'" class="user-type customer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/HeyYou.types'

export default Vue.extend<D, M, C, P>({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.hey-you {
  .header {
    text-align: center;
    margin-bottom: 5px;
  }
  .name {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 5px;
    .first-name {
      margin-right: 5px;
    }
  }
  .user-type {
    text-align: center;
  }
  .chemist {
    color: $green-light;
  }
  .customer {
    color: $blue;
  }
}
</style>
