<script setup lang="ts">
import {computed, ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NSelect, NSpin, SelectOption, useMessage} from "naive-ui";
import {onBeforeRouteUpdate} from "vue-router";
import {useStore} from "vuex";
import {addCompetition, addEvent, editCompetition, editEvent} from "../../api/competition";

const showModal = ref(false)
const model = ref<Competition>({})
const store = useStore();

const optionsEventRef = computed(() => store.state.competitionEvents.map((it: EventType) => {
      return {
        label: `${it.eventName} （${it.gender === 'male' ? '男' : '女'}）`,
        value: it.id || 0,
      }
    })
)

const optionsAgeGroupRef = computed(() => store.state.ageGroups.map((it: AgeGroup) => {
      return {
        label: it.name || `${it.minAge}-${it.maxAge}岁组`,
        value: it.id || 0,
      }
    })
)
const submitting = ref(false)


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
    return editCompetition(editingId.value, model.value)
        .then(result => {
          if (result.code === 0) {
            message.success("编辑成功")
            store.commit("invalidateEvents")
            store.dispatch("updateEvents")
            emit('submitted', true)
          } else {
            message.error(`编辑失败：${result.msg}`)
            emit('submitted', false)
          }
        })
        .finally(() => {
          submitting.value = false
          showModal.value = false
        })
  } else {
    return addCompetition(model.value)
        .then(result => {
          if (result.code === 0) {
            message.success("添加成功")
            emit('submitted', true)
          } else {
            message.error(`添加失败：${result.msg}`)
            emit('submitted', false)
          }
        })
        .finally(() => {
          submitting.value = false
          showModal.value = false
        })
  }
}

function add() {
  refresh()
  showModal.value = true
}

function edit(data: Competition) {
  refresh()
  showModal.value = true
  model.value = data;
  editingId.value = data.id!
}

function clearModal() {
  model.value = {}
  editingId.value = -1
}

defineExpose({
  edit, add
})


</script>

<template>
  <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="编辑"
      positive-text="确认"
      @positive-click="submit"
      negative-text="取消"
      :loading="submitting"
      @after-leave="clearModal"
  >
    <template #default>
      <n-form :model="model">
        <n-grid :cols="24" :x-gap="12">
          <n-form-item-gi :span="12" label="项目" path="eventValue">
            <n-select v-model:value="model.eventId" :options="optionsEventRef" filterable/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="年龄组" path="ageGroupValue">
            <n-select v-model:value="model.ageClassId" :options="optionsAgeGroupRef" filterable/>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
