<script setup lang="ts">
import {ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NSelect, NSpin, SelectOption} from "naive-ui";

const showModal = ref(false)
const model = ref<CompetitionProto>({})

const optionsEventRef = ref<Array<SelectOption>>([])
const optionsAgeGroupRef = ref<Array<SelectOption>>([])
const loading = ref(true)
const submitting = ref(false)

let ageGroups: Array<AgeGroup> = [];

let competitionEvents: Array<EventType> = []

function submit() {

}


function loadSelections() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ageGroups = [
      {
        id: 1,
        minAge: 7,
        maxAge: 9,
      },
      {
        id: 2,
        minAge: 9,
        maxAge: 11,
      },
      {
        id: 3,
        minAge: 11,
        maxAge: 13,
      },
    ]
    competitionEvents = [
      {
        id: 1,
        eventName: '单杠',
        gender: 'male',
      },
      {
        id: 2,
        eventName: '双杠',
        gender: 'male',
      },
      {
        id: 3,
        eventName: '自由体操',
        gender: 'male',
      },
      {
        id: 4,
        eventName: '自由体操',
        gender: 'female',
      },
    ]

    updateOptionsAgeGroup()
    updateOptionsEvent()
  }, 2000)
}
function add() {
  loadSelections()
  showModal.value = true
}

function edit(data: Competition) {
  loadSelections()
  showModal.value = true
  model.value = data;
  optionsAgeGroupRef.value = [
    {
      label: data.ageGroupName || `${data.minAge}-${data.maxAge}岁组`,
      value: data.ageGroupId,
    },
  ]
  optionsEventRef.value = [
    {
      label: `${data.eventName} （${data.gender === 'male' ? '男' : '女'}）`,
      value: data.ageGroupId,
    },
  ]
}

function clearModal() {
  model.value = {}
}

defineExpose({
  edit, add
})


function updateOptionsEvent() {
  optionsEventRef.value = competitionEvents
      .map(it => {
        return {
          label: `${it.eventName} （${it.gender === 'male' ? '男' : '女'}）`,
          value: it.id,
        }
      })
}

function updateOptionsAgeGroup() {
  optionsAgeGroupRef.value = ageGroups
      .map(it => {
        return {
          label: it.name || `${it.minAge}-${it.maxAge}岁组`,
          value: it.id,
        }
      })
}


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
      <n-spin :show="loading">
        <n-form :model="model">
          <n-grid :cols="24" :x-gap="12">
            <n-form-item-gi :span="12" label="项目" path="eventValue">
              <n-select v-model:value="model.eventId" :options="optionsEventRef" filterable/>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="年龄组" path="ageGroupValue">
              <n-select v-model:value="model.ageGroupId" :options="optionsAgeGroupRef" filterable/>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-spin>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
