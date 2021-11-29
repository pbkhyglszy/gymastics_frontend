<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';

</script>

<template>
  <n-config-provider>
    <router-view />
  </n-config-provider>
</template>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
