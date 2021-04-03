<template>
  <div class="navbar">
    <nuxt-link :to="'pills'">
      <div class="icon-container">
        <icon name="pill" :original="true" />
        <div v-t="'icons.pills'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'advices'">
      <div class="icon-container">
        <icon name="advice" :original="true" />
        <div v-t="'icons.advices'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'dressings'">
      <div class="icon-container">
        <icon name="dressing" :original="true" />
        <div v-t="'icons.dressings'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'naturalCare'">
      <div class="icon-container">
        <icon name="medicinal-herb" :original="true" />
        <div v-t="'icons.medicinal-herb'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'nutrition'">
      <div class="icon-container">
        <icon name="body" :original="true" />
        <div v-t="'icons.nutrition'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'cosmeticProducts'">
      <div class="icon-container">
        <icon name="cosmetic-products" :original="true" />
        <div v-t="'icons.cosmetic-products'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'healthProducts'">
      <div class="icon-container">
        <icon name="health-products" :original="true" />
        <div v-t="'icons.health-products'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'motherhood'">
      <div class="icon-container">
        <icon name="baby" :original="true" />
        <div v-t="'icons.motherhood'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'optical'">
      <div class="icon-container">
        <icon name="eye" :original="true" />
        <div v-t="'icons.optical'" class="title" />
      </div>
    </nuxt-link>
    <nuxt-link :to="'orthopedic'">
      <div class="icon-container">
        <icon name="orthopedic" :original="true" />
        <div v-t="'icons.orthopedic'" class="title" />
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/NavBar.types'

export default Vue.extend<D, M, C, P>({
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  .icon-container {
    cursor: pointer;
  }
}
@include window-up(lg) {
  .navbar {
    .icon-container {
      display: flex;
      align-items: center;
      margin-left: 5px;
      margin-top: 15px;
      &:hover {
        .title {
          text-shadow: $orange 1px 0 10px;
        }
      }
      .title {
        margin-left: 10px;
        color: $white;
        max-width: 85px;
      }
    }
    .svg-icon {
      height: 40px;
      width: 40px;
    }
  }
}
@include window-down(lg) {
  .navbar {
    display: flex;
    justify-content: space-around;
    a {
      width: 100%;
      text-align: center;
      height: 100%;
      padding-top: 15px;
    }
    .icon-container {
      .title {
        display: none;
      }
    }
    .svg-icon {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
