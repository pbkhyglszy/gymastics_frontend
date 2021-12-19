<script setup lang="ts">

import {computed, ref} from "vue";
import {ArrowBack, ArrowForward} from '@vicons/ionicons5'
import {NSpace, NSteps, NStep, NButtonGroup, NButton, NIcon, useMessage} from 'naive-ui'
import {useStore} from "vuex";
import {updateProgress} from "../../api/misc";
import {onBeforeRouteUpdate} from "vue-router";


const store = useStore()
const message = useMessage()

function prev() {
  updateProgress(-1).then(result => {
    if (result.code === 0) {
      message.success("编辑成功")
    } else {
      message.error(`编辑失败：${result.msg}`)
    }
    store.dispatch('updateProgress')
  })
}

function next() {
  updateProgress(1).then(result => {
    if (result.code === 0) {
      message.success("编辑成功")
    } else {
      message.error(`编辑失败：${result.msg}`)
    }
    store.dispatch('updateProgress')
  })
}


store.dispatch('updateProgress')
onBeforeRouteUpdate(() => store.dispatch('updateProgress'))


const progress = computed(() => store.state.progress)

</script>

<template>
  <n-space vertical class="wrapper">
    <n-space class="buttons">
      <n-button-group>
        <n-button @click="prev" :disabled="progress === 0">
          <template #icon>
            <n-icon>
              <arrow-back/>
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next" :disabled="progress === 4">
          <template #icon>
            <n-icon>
              <arrow-forward/>
            </n-icon>
          </template>
        </n-button>
      </n-button-group>
    </n-space>
    <n-steps vertical :current="progress + 1">
      <n-step
          title="准备阶段"
          description="系统管理员为系统添加比赛项目，比赛内容，同时系统管理员为每一个代表队设置代表队名称、账号和缺省密码。"
      />
      <n-step
          title="报名阶段"
          description="每一个代表队登陆进报名系统，录入代表的相关信息，同时选择运动员要报名参加的比赛项目，系统管理员可以查看报名情况。"
      />
      <n-step
          title="项目编排"
          description="报名完成，代表队不能修改代表队相关信息，系统管理员添加预赛赛事表。"
      />
      <n-step
          title="比赛阶段"
          description="比赛编排完成，裁判员此时可以登录进系统进行打分等操作。"
      />
      <n-step
          title="比赛结束"
          description="比赛结束阶段，系统参数不可以再修改，只能查看成绩。"
      />
    </n-steps>
  </n-space>
</template>


<style scoped lang="stylus">
.wrapper
  padding 24px

.buttons
  padding-bottom 24px
</style>
