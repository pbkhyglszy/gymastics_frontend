<script setup lang="ts">
import {computed, ref} from "vue";
import {
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItemGi,
  NGrid,
  NSelect,
  NSpin,
  NButton,
  NTabs,
  NTabPane,
  NTransfer,
  NSpace,
  SelectOption,
  useDialog,
  useMessage
} from "naive-ui";
import {onBeforeRouteUpdate} from "vue-router";
import {useStore} from "vuex";
import {
  addCompetitionGroup,
  getAthleteByCompetition,
  getCompetitionGroupInfo, getRefereeByCompetition,
  removeCompetitionGroup
} from "../../api/arrangement";

const showModal = ref(false)
const store = useStore();
const dialog = useDialog()

const loading = ref(false)
const submitting = ref(false)

const competitionId = ref(0)


//数据
const availableAthletes = ref<Array<Athlete>>([]);
const availableReferees = ref<Array<Referee>>([]);

const optionsAthletes = computed(() => {
  availableAthletes.value.map(it => {
    return {
      label: `${it.name}（${it.athleteId}）`,
      value: it.id,
    }
  })
})


const optionsReferees = computed(() => {
  availableReferees.value.map(it => {
    return {
      label: it.name,
      value: it.id,
    }
  })
})


const model = ref<Array<ArrangementGroup>>([])


async function refresh() {
  await Promise.all([
    store.dispatch("tryUpdateEvents"),
    getCompetitionGroupInfo(competitionId.value).then(result => {
      if (result.code === 0) {
        model.value = result.data!
        if (model.value.length == 0) {
          handleAdd()
        }
      } else {
        message.error(`获取信息失败：${result.msg}`)
      }
    }),
    getAthleteByCompetition(competitionId.value).then(result => {
      if (result.code === 0) {
        availableAthletes.value = result.data!
      } else {
        message.error(`获取信息失败：${result.msg}`)
      }
    }),
    getRefereeByCompetition(competitionId.value).then(result => {
      if (result.code === 0) {
        availableReferees.value = result.data!
      } else {
        message.error(`获取信息失败：${result.msg}`)
      }
    })
  ])
}

onBeforeRouteUpdate(() => refresh())
refresh()


const message = useMessage()

const emit = defineEmits<{
  (e: 'submitted', succeed: boolean): void
}>()

function submit() {
  submitting.value = true
}

function arrange(id: number) {
  competitionId.value = id
  refresh()
  showModal.value = true

}

function clearModal() {
  model.value = []
}

function exitAlert() {
  return dialog.warning({
    title: '确认退出？',
    content: '你还未提交赛事安排，确认退出？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      clearModal()
      showModal.value = false
    }
  })
}


defineExpose({
  arrange
})

const currentTab = ref<number>()

function handleAdd() {
  addCompetitionGroup(competitionId.value).then(result => {
    if (result.code === 0) {
      refresh()
    } else {
      message.error(`获取信息失败：${result.msg}`)
    }
  })
}


function handleClose(id: number) {
  removeCompetitionGroup(id).then(result => {
    if (result.code === 0) {
      refresh()
    } else {
      message.error(`获取信息失败：${result.msg}`)
    }
  })
}

</script>

<template>
  <n-drawer
      v-model:show="showModal"
      placement="bottom"
      height="90%"
      :on-mask-click="exitAlert"
      :mask-closable="false"
  >
    <n-drawer-content>
      <template #header>编辑赛事安排</template>
      <template #footer>
        <n-button type="primary" @click="submit">提交</n-button>
      </template>
      <n-spin :show="loading" class="full">
        <n-tabs
            v-model:value="currentTab"
            type="card"
            :addable="true"
            :closable="true"
            @close="handleClose"
            @add="handleAdd"
            tab-style="min-width: 80px;"
        >
          <n-tab-pane v-for="group in model" :tab="group.groupName" :name="group.groupId" :key="group.groupId">
            <div class="transfer">
              <n-transfer
                  :options="optionsAthletes"
                  source-title="报名的运动员"
                  target-title="分配到本组的运动员"
                  size="large"
              />
              <n-transfer
                  :options="optionsReferees"
                  source-title="可选的裁判"
                  target-title="本组的裁判"
                  size="large"
              />
            </div>
          </n-tab-pane>
          <template #prefix>竞赛分组：</template>
        </n-tabs>
      </n-spin>
    </n-drawer-content>
  </n-drawer>
</template>


<style scoped lang="stylus">
.transfer
  display flex
  justify-content space-around
  height 100%

  :deep(.n-transfer-list)
    display flex
    flex-direction column

    .n-transfer-list-body
      flex 1 1 auto

  :deep(&>div)
    flex 1 1 auto
    margin 0 24px

:deep(.full)
  height 100%

  .n-spin-content
    height 100%

    .n-tabs
      height 100%
      display flex
      flex-direction column

      .n-tab-pane
        flex 1 1 auto

</style>
