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
  SelectOption,
  useDialog,
  useMessage
} from "naive-ui";
import {onBeforeRouteUpdate} from "vue-router";
import {useStore} from "vuex";

const showModal = ref(false)
const store = useStore();
const dialog = useDialog()

const loading = ref(false)
const submitting = ref(false)


//数据
const availableAthletes = [];
const availableReferees = [];

const model = ref<Arrangement>({
  groups: []
})


function refresh() {
  store.dispatch("tryUpdateEvents")
}

onBeforeRouteUpdate(() => refresh())
refresh()


const message = useMessage()
const editingId = ref(-1)

const emit = defineEmits<{
  (e: 'submitted', succeed: boolean): void
}>()

function submit() {

  submitting.value = true
  if (editingId.value >= 0) {

  } else {

  }
}

function arrange(teamId: number) {
  refresh()
  showModal.value = true

}

function clearModal() {
  model.value = {
    groups: []
  }
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

  const group: ArrangementGroup = {
    athletes: [],
    referees: [],
  }

  model.value.groups.push();

}


function handleClose(name: number) {

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
        <n-button type="primary">提交</n-button>
      </template>
      <n-spin :show="loading">
        <n-tabs
            v-model:value="currentTab"
            type="card"
            :addable="true"
            :closable="true"
            @close="handleClose"
            @add="handleAdd"
            tab-style="min-width: 80px;"
        >
          <n-tab-pane v-for="group in model.groups" :name="group.groupName" :key="group.groupId">
            {{ group }}
          </n-tab-pane>
          <template #prefix>竞赛分组：</template>
        </n-tabs>
      </n-spin>
    </n-drawer-content>
  </n-drawer>
</template>


<style scoped lang="stylus">

</style>
