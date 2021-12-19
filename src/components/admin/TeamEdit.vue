<script setup lang="ts">
import {ref} from "vue";
import {NModal, NForm, NFormItemGi, NGrid, NInput, NSelect, useMessage, FormRules} from "naive-ui";
import {addEvent, editEvent} from "../../api/competition";
import {useStore} from "vuex";

const showModal = ref(false)
const model = ref<Team & { reenteredPassword?: string }>({
  password: '12345678'
})
const store = useStore();

const submitting = ref(false)


const message = useMessage()
const editingId = ref(-1)

const rPasswordFormItemRef = ref<any>(null)
const formRef = ref<any>(null)

function handlePasswordInput() {
  if (model.value.password) {
    rPasswordFormItemRef.value.validate({trigger: 'password-input'})
  }
}

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入队伍名',
  },
  userName: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入用户名',
  },
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: (rule, value) => {
        const pwd = model.value.password;
        return !value || value === pwd
      },
      message: '两次密码输入不一致',
      trigger: ['blur', 'input', 'password-input']
    }
  ]
}

function submit() {
  formRef.value.validate((errors: any) => {
    if (!errors) {
      submitting.value = true
      if (editingId.value >= 0) {
      } else {

      }
    } else {
      message.error('报名表验证失败！')
    }
  })
}

function add() {
  showModal.value = true
  clearModal()
}

function edit(data: EventType) {
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
      <n-form :model="model" :rule="formRules" ref="formRef">
        <n-grid :cols="24" :x-gap="12">
          <n-form-item-gi :span="12" path="name" label="项目名">
            <n-input v-model:value="model.name"/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="userName" label="用户名">
            <n-input v-model:value="model.userName"/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="password" label="密码">
            <n-input type="password" show-password-on="click" v-model:value="model.password"
                     @input="handlePasswordInput"/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" path="reenteredPassword" label="确认密码" ref="rPasswordFormItemRef">
            <n-input type="password" show-password-on="click" v-model:value="model.reenteredPassword"/>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </template>
  </n-modal>
</template>


<style scoped lang="stylus">

</style>
