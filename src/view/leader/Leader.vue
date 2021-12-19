<script setup lang="ts">

import TeamOverview from "../common/TeamOverview.vue";
import TeamRegistration from "./TeamRegisteration.vue";
import {
  useMessage,
  NTabs,
  NTabPane,
} from "naive-ui";
import {useStore} from "vuex";
import {onBeforeRouteUpdate} from "vue-router";
import {ref} from "vue";

const message = useMessage()
const store = useStore()

store.dispatch('updateProgress')
onBeforeRouteUpdate(() => store.dispatch('updateProgress'))

const currentTab = ref("overview")

function handleBeforeLeave(newName: string, oldName: string) {
  if (newName === 'registration') {
    return store.dispatch("updateProgress").then(() => {
      if (store.state.progress !== 1) {
        message.error("当前非报名阶段，无法提交报名表！")
        return false
      }
      return true
    })
  }
  return true
}


</script>

<template>
  <n-tabs
      class="wrapper"
      type="line"
      v-model:value="currentTab"
      @before-leave="handleBeforeLeave"
      size="large"
  >
    <n-tab-pane name="overview" tab="队伍详情">
      <div class="content">
        <team-overview/>
      </div>
    </n-tab-pane>
    <n-tab-pane name="registration" tab="提交报名表">
      <div class="content">
        <team-registration @submitted="currentTab = 'overview'"/>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>


<style scoped lang="stylus">
.wrapper
  padding 16px

  .content
    display flex
    justify-content center

</style>
