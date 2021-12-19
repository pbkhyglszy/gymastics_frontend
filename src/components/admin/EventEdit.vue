<script setup lang="ts">
import {ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NInput, NSelect, useMessage} from "naive-ui";
import {addEvent, editEvent} from "../../api/competition";
import {useStore} from "vuex";

const showModal = ref(false)
const model = ref<EventType>({})
const store = useStore();

const submitting = ref(false)


const message = useMessage()
const editingId = ref(-1)


function submit() {

  submitting.value = true
  if (editingId.value >= 0) {
    editEvent(editingId.value, model.value)
        .then(result => {
          if (result.code === 0) {
            message.success("编辑成功")
            store.commit("invalidateEvents")
            store.dispatch("updateEvents")
          } else {
            message.error(`编辑失败：${result.msg}`)
          }
        })
        .finally(() => {
          submitting.value = false
          showModal.value = false
        })
  } else {
    addEvent(model.value)
        .then(result => {
          if (result.code === 0) {
            message.success("添加成功")
            store.commit("invalidateEvents")
            store.dispatch("updateEvents")
          } else {
            message.error(`添加失败：${result.msg}`)
          }
        })
        .finally(() => {
          submitting.value = false
          showModal.value = false
        })
  }
}

function add() {
  showModal.value = true
}

function edit(data: EventType) {
  showModal.value = true
  model.value = data;
}

function clearModal() {
  model.value = {}
}

defineExpose({
  edit, add
})

const genderSelectOptions = [
  {value: 'male', label: '男'},
  {value: 'female', label: '女'}
]

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
            <n-form-item-gi :span="12" label="项目名" path="eventValue">
              <n-input v-model:value="model.eventName"/>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="需求性别" path="ageGroupValue">
              <n-select v-model:value="model.gender" :options="genderSelectOptions" filterable/>
            </n-form-item-gi>
          </n-grid>
        </n-form>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
