<template>
  <div id="layoutContainer">
    <header>
      <Toolbar
        :drug-store-name="drugStoreName"
        :is-connected="isConnected"
        :user-id="user ? user.id : 0"
        :user="user ? user : undefined"
        @deleteDrugStoreName="removeDrugStore"
        @connect="connect"
        @disconnect="disconnect"
      />
    </header>
    <div id="bodyContainer">
      <div id="menuContainer">
        <NavBar />
      </div>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import NavBar from '~/components/NavBar.vue'
import Notification from '~/components/Notification.vue'
import Toolbar from '~/components/Toolbar.vue'
import { D, M, C, P } from '~/types/layouts/default.types'

export default Vue.extend<D, M, C, P>({
  components: {
    NavBar,
    Notification,
    Toolbar,
  },
  computed: {
    ...mapState('notifications', ['notifications']),
    ...mapState('drugStores', ['drugStore']),
    ...mapState('user', ['isConnected', 'user']),
    drugStoreName() {
      if (this.drugStore) {
        return this.drugStore.name
      }
      return undefined
    },
  },
  methods: {
    ...mapMutations('notifications', ['deleteNotification']),
    ...mapActions('drugs', ['clearCart']),
    ...mapActions('drugStores', ['removeDrugStore']),
    ...mapActions('user', ['dispatchLogin', 'dispatchLogout']),
    connect() {
      const strLogin = this.$t('miscellaneous.enter_login') as string
      const login = prompt(strLogin)
      this.dispatchLogin(login!)
    },
    disconnect() {
      this.dispatchLogout()
      this.clearCart()
      this.$router.replace('/')
    },
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
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0px;
  #__nuxt,
  #__layout {
    height: 100%;
    width: 100%;
  }
}
#layoutContainer {
  height: 100%;
  header {
    position: absolute;
    background-color: $toolbar-background-color;
    height: $header-height;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    color: $white;
  }
  #bodyContainer {
    #mainContainer {
      height: 100%;
      overflow-y: auto;
      background-color: $background-color;
      #mainContainerScrollable {
        position: relative;
        // height: 100%;
      }
    }
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
}
@include window-up(lg) {
  #layoutContainer {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50px;
    grid-template-areas: 'header';
    #bodyContainer {
      display: grid;
      grid-template-columns: 160px auto;
      grid-template-rows: 80px auto;
      grid-template-areas: 'menuContainer mainContainer';
      overflow-y: auto;
      background-color: rgba(112, 112, 112, 0.1);
      position: absolute;
      top: $header-height;
      width: 100%;
      height: calc(100% - 80px);
      #mainContainer {
        position: absolute;
        left: 160px;
        width: calc(100% - 160px);
      }
      #menuContainer {
        background-color: $navbar-background-color;
        height: 100%;
        color: $black;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 160px;
      }
    }
    #notifsContainer {
      position: fixed;
      bottom: 75px;
      right: 35px;
      z-index: 1000;
      .notifs-container {
        margin-top: 10px;
      }
    }
  }
}
@include window-down(lg) {
  #layoutContainer {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 80px auto 61px;
    grid-template-areas: 'header';
    #bodyContainer {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto 61px;
      grid-template-areas:
        'mainContainer'
        'menuContainer';
      position: absolute;
      top: $header-height;
      height: calc(100% - #{$header-height});
      width: 100%;
      #mainContainer {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        grid-row-start: 1;
      }
      #menuContainer {
        grid-row-start: 2;
        background-color: $navbar-background-color;
        position: absolute;
        width: 100%;
        z-index: 200;
        bottom: 0;
        height: 61px;
      }
    }
    #notifsContainer {
      position: fixed;
      bottom: 61px;
      right: 0;
      z-index: 1000;
      .notifs-container {
        margin-top: 10px;
      }
    }
  }
  .page-container {
    height: 100%;
    padding: 15px 5px;
    overflow-y: auto;
    h1 {
      margin: 0 0 15px 10px;
    }
  }
}
@include window-up(md) {
  .page-container {
    height: 100%;
    padding: 15px 15px;
    overflow-y: auto;
    h1 {
      margin: 0 0 15px 10px;
    }
  }
}
@include window-down(md) {
  #layoutContainer {
    #notifsContainer {
      width: 100%;
    }
  }
}
</style>
