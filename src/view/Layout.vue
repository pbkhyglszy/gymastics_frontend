<script setup lang="ts">
import {NButton, NLayout, NLayoutContent, NDropdown, NLayoutHeader, NIcon} from "naive-ui";
import {computed, ref} from "vue";
import {ArrowBack} from "@vicons/ionicons5";
import {useStore} from "vuex";
import router from "../router";
import {onBeforeRouteUpdate} from "vue-router";

const store = useStore();
function loadUsers() {
  if(!store.state.userName) {
    router.push({name: 'Login'})
  }
}

onBeforeRouteUpdate(() => loadUsers())
loadUsers()

const welcomeMsg = computed(() => {
  return `Welcome，${store.state.loginName}`
})
const user = computed(() => {
  return store.state.userName
})

const options = [{
  label: '退出登录',
  key: 1
}]

function handleSelect(key: number) {
  if (key === 1) {
    store.commit('clearToken')
    router.push({name: 'Login'})
  }
}

</script>

<template>

  <n-layout
      embedded
      class="layout-wrapper"
      position="absolute"
      :native-scrollbar="false"
  >
    <n-layout-header bordered class="layout-header">
      <div class="header">
        <n-button text class="back" @click="$router.back()">
          <n-icon size="24">
            <arrow-back/>
          </n-icon>
        </n-button>
        <div class="welcome">{{ welcomeMsg }}</div>
        <div class="empty"/>
        <n-dropdown @select="handleSelect" trigger="click" :options="options">
          <n-button class="user" text>{{ user }}</n-button>
        </n-dropdown>
      </div>
    </n-layout-header>
    <router-view/>
  </n-layout>
</template>


<style scoped lang="stylus">
.layout-header
  height 60px

  & + div
    top 60px

.layout-wrapper
  height 100%

.header
  display flex
  height 100%
  flex-direction row
  padding 10px 20px
  align-items center

  & > div, & > button
    margin 0 10px

  .empty
    flex 1 1 0

  .welcome
    font-size 24px

</style>
