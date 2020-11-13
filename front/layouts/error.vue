<template>
  <div class="error-message">
    <h1 v-t="'miscellaneous.error'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {},
  data() {
    return {}
  },
})
</script>

<style lang="scss" scopped>
.error-message {
  margin-top: 300px;
  text-align: center;
  color: $red;
}
</style>
