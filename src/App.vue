<script setup lang="ts">
import {NConfigProvider, NDialogProvider, NMessageProvider, zhCN, dateZhCN } from 'naive-ui';
import {RouterView} from "vue-router";

</script>

<template>
  <n-config-provider class="wrapper" :locale="zhCN" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <router-view/>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style lang="stylus">
@import './styles/defaults.styl'

html, body, #app, .wrapper
  height 100%


</style>
