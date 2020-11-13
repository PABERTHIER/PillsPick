<template>
  <div id="layoutContainer">
    <header>
      <h1>{{ header }}</h1>
    </header>
    <div id="bodyContainer">
      <div id="mainContainer">
        <div id="mainContainerScrollable">
          <transition name="page">
            <nuxt />
          </transition>
        </div>
      </div>
    </div>
    <transition-group id="notifsContainer" name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notifs-container"
      >
        <Notification
          :title="notification.title"
          :msg="notification.msg"
          :type="notification.type"
          @close="deleteNotification(notification.id)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Notification from '~/components/Notification.vue'
import { D, M, C, P } from '~/types/layouts/default.types'

export default Vue.extend<D, M, C, P>({
  components: {
    Notification,
  },
  computed: {
    ...mapState('notifications', ['notifications']),
    header() {
      return this.$t('pages.default.title') as string
    },
  },
  methods: {
    ...mapMutations('notifications', ['deleteNotification']),
  },
})
</script>

<style lang="scss">
@import '~/styles/default.scss';

html {
  font-family: Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
}
header {
  text-align: center;
  font-size: 25px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: $background-color-second;
}
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  #__nuxt,
  #__layout {
    height: 100vh;
    width: 100vw;
  }
}
#layoutContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#bodyContainer {
  flex: 1;
  display: flex;
  overflow: hidden;
  background-color: $background-color-second;
}
#mainContainer {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  background-color: $background-color-second;
}
#mainContainerScrollable {
  position: relative;
  height: 100%;
}
#notifsContainer {
  position: fixed;
  bottom: 35px;
  right: 35px;
  z-index: 10;
  .notifs-container {
    margin-top: 10px;
  }
}
.page-container {
  height: 100%;
  padding: 15px 15px;
  h1 {
    margin: 0 0 15px 0;
  }
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
a:-webkit-any-link {
  text-decoration: none;
}
</style>
