<template>
  <div class="pill-container">
    <div class="picture-container">
      <div class="toto">
        <icon :name="pictureName" :original="true" class="picture" />
      </div>
      <div class="icon-add">
        <icon name="add" />
      </div>
    </div>
    <div class="icon-info">
      <icon name="info" />
    </div>
    <div class="infos">
      <div class="name">
        {{ drug.name }}
      </div>
      <div class="type">
        {{ drug.type }}
      </div>
      <div class="route-administration">
        {{ drug.routeAdministration }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/components/PillContainer.types'

export default Vue.extend<D, M, C, P>({
  props: {
    drug: {
      type: Object,
      required: true,
    },
    pictureName: {
      type: String,
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
.pill-container {
  .picture-container {
    border: 1px solid $grey-blue;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    .toto {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      .picture {
        width: 50px;
        height: 50px;
        text-align: center;
      }
    }
    .icon-add {
      text-align: right;
      width: 100%;
    }
  }
  .icon-info {
  }
  .infos {
    margin-left: 15px;
    overflow-y: hidden;
    max-height: 82px;
    .name {
      overflow-x: hidden;
    }
    .type {
      overflow-x: hidden;
    }
    .route-administration {
      overflow-x: hidden;
    }
  }
}
.svg-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
