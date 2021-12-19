<script setup lang="ts">
import {computed, ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NSelect, NSpin, SelectOption, useMessage} from "naive-ui";
import {onBeforeRouteUpdate} from "vue-router";
import {useStore} from "vuex";
import {addCompetition, addEvent, editCompetition, editEvent} from "../../api/competition";

const showModal = ref(false)
const model = ref<Competition>({})
const store = useStore();

const loading = ref(true)
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

  } else {

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
}

function clearModal() {
  model.value = {}
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
      <n-spin :show="loading">
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
      </n-spin>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
