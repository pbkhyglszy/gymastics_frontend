<script setup lang="ts">
import {NCard} from 'naive-ui'
</script>

<template>
  <div class="container">
    <n-card title="卡片">

    </n-card>
    <n-card title="卡片">

    </n-card>
  </div>
</template>


<style scoped lang="stylus">
.container
  display flex
  flex-direction column
  height 100%

  :deep(&>div)
    flex 1 1 auto

</style>
