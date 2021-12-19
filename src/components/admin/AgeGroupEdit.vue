<script setup lang="ts">
import {ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NInput, NSelect, useMessage} from "naive-ui";
import {addAgeGroup, editAgeGroup} from "../../api/competition";
import {useStore} from "vuex";

const showModal = ref(false)
const model = ref<AgeGroup>({})
const store = useStore();

const submitting = ref(false)

const message = useMessage()
const editingId = ref(-1)


function submit() {

  submitting.value = true
  if (editingId.value >= 0) {
    editAgeGroup(editingId.value, model.value)
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
    addAgeGroup(model.value)
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

function edit(data: AgeGroup) {
  showModal.value = true
  model.value = data;
  editingId.value = data.id!;
}

function clearModal() {
  model.value = {}
  editingId.value = -1;
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
          <n-form-item-gi :span="8" label="名称（可选）" path="eventValue">
            <n-input v-model:value="model.name"/>
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="需求性别" path="ageGroupValue">
            <!--              <n-select v-model:value="model.gender" :options="genderSelectOptions" filterable/>-->
            <n-input
                pair
                separator="-"
                :placeholder="['最小年龄', '最大年龄']"
                clearable
            >
              <template #suffix>岁</template>
            </n-input>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
