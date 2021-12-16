<script setup lang="ts">
import {NLayout, NLayoutSider, NLayoutContent, NLayoutFooter, NMenu} from "naive-ui";
import {computed, h} from "vue";
import {RouterLink, useRouter} from "vue-router";

const router = useRouter()

const selected = computed(() => router.currentRoute.value.name)


const menuOptions = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'CompetitionManager',
              }
            },
            {default: () => '比赛项目管理'}
        ),
    key: 'CompetitionManager',
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'TeamManager',
              }
            },
            {default: () => '代表队管理'}
        ),
    key: 'TeamManager',
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'GroupManager',
              }
            },
            {default: () => '赛事安排'}
        ),
    key: 'GroupManager',
  },
]

</script>

<template>
  <n-layout has-sider position="absolute" :native-scrollbar="false" content-style="height: 100%">
    <n-layout-sider bordered content-style="padding: 24px 0;">
      <n-menu :value="selected" :options="menuOptions"/>
    </n-layout-sider>
    <n-layout-content>
      <router-view/>
    </n-layout-content>
  </n-layout>
</template>

<style lang="stylus">
.data-table
  padding 0 5px 10px
  height: 100%

  .action_col
    button
      margin 0 10px
</style>

<style scoped lang="stylus">
</style>
