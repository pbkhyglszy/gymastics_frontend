<script setup lang="ts">
import {NButton, NLayout, NLayoutContent, NLayoutHeader, NIcon} from "naive-ui";
import {ref} from "vue";
import {ArrowBack} from "@vicons/ionicons5";

const welcomeMsg = ref("Welcome! Xxx")
const user = ref("WarmthDawn")

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
        <n-button class="user" text>{{ user }}</n-button>
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
  &>div, &>button
    margin 0 10px
  .empty
    flex 1 1 0
  .welcome
    font-size 24px

</style>
