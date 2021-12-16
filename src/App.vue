<script setup lang="ts">
import {NConfigProvider, NDialogProvider} from 'naive-ui';

</script>

<template>
  <n-config-provider class="wrapper">
    <n-dialog-provider>
      <router-view/>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style lang="stylus">
@import './styles/defaults.styl'

html, body, #app, .wrapper
  height 100%


</style>
