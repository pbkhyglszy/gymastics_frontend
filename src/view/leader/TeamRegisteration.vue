<script setup lang="ts">
import {
  NForm,
  NCard,
  NDynamicInput,
  NFormItem,
  NDivider,
  NInput,
  NSelect,
  NButton,
  FormRules,
  useMessage
} from 'naive-ui'
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {getTeamDetail, updateTeamDetail} from "../../api/team";
import {onBeforeRouteUpdate} from "vue-router";

const message = useMessage()
const store = useStore();

interface TeamFromData {
  id: number,
  name: string,
  leader: TeamMember,
  teamDoctor: TeamMember,
  referee: Referee & { reenteredPassword?: string },
  coaches: Array<TeamMember>,
  athletes: Array<Athlete>,
}

// const competitionEvents: Array<EventType> = [
//   {
//     id: 1,
//     eventName: '单杠',
//     gender: 'male',
//   },
//   {
//     id: 2,
//     eventName: '双杠',
//     gender: 'male',
//   },
//   {
//     id: 3,
//     eventName: '自由体操',
//     gender: 'male',
//   }, {
//     id: 4,
//     eventName: '自由体操',
//     gender: 'female',
//   },
// ]

function refresh() {
  store.dispatch("tryUpdateEvents")
  getTeamDetail().then(result => {
    if (result.code === 0) {
      teamFormDataRef.value = toFormData(result.data!)
    } else {
      message.error(`获取队伍信息失败：${result.msg}`)
    }
  })
}

onBeforeRouteUpdate(() => refresh())
refresh()


const teamFormDataRef = ref<TeamFromData>({
  id: -1,
  name: '',
  leader: {
    name: '',
    type: 'team_leader',
    idNumber: '',
    phone: '',
  },
  teamDoctor: {
    name: '',
    type: 'team_doctor',
    idNumber: '',
    phone: '',
  },
  referee: {
    name: '',
    type: 'referee',
    idNumber: '',
    phone: '',
  },
  coaches: [],
  athletes: [],
})

// const optionsEvent = computed(() => {
//   return store.state.competitionEvents
//       .map((it: EventType) => {
//         return {
//           label: it.eventName,
//           value: it.id,
//         }
//       })
// })

function filterOptionsEvent(gender: 'male' | 'female') {
  return store.state.competitionEvents
      .filter((it: EventType) => it.gender === gender)
      .map((it: EventType) => {
        return {
          label: it.eventName,
          value: it.id,
        }
      })
}

function toFormData(detail: TeamDetail): TeamFromData {
  const leader = (detail.members
          .find(it => it.type === 'team_leader') ?? {type: 'team_leader'}
  ) as TeamMember
  const teamDoctor = (detail.members
          .find(it => it.type === 'team_doctor') ?? {type: 'team_doctor'}
  ) as TeamMember
  const referee = (detail.members
          .find(it => it.type === 'referee') ?? {type: 'team_doctor'}
  ) as Referee
  const coaches = detail.members
      .filter(it => it.type === 'coach') as Array<TeamMember>

  const athletes = detail.members
      .filter(it => it.type === 'athlete') as Array<Athlete>
  return {
    id: detail.id!,
    name: detail.name || '',
    leader,
    teamDoctor,
    referee,
    coaches,
    athletes
  }
}

function toDetail(formData: TeamFromData): TeamDetail {
  formData.leader.type = 'team_leader'
  formData.teamDoctor.type = 'team_doctor'
  formData.referee.type = 'referee'
  formData.coaches.forEach(it => it.type = 'coach')
  formData.athletes.forEach(it => it.type = 'athlete')
  return {
    id: formData.id!,
    name: formData.name,
    members: [
      formData.leader,
      formData.teamDoctor,
      formData.referee,
      ...formData.coaches,
      ...formData.athletes,
    ]
  }
}

function createCoach(): TeamMember {
  return {
    name: '',
    type: 'coach',
    idNumber: '',
    phone: '',
  }
}

function createAthlete(): Athlete {
  return {
    name: '',
    type: 'athlete',
    idNumber: '',
    phone: '',
    eventIds: [],
  }
}

const emit = defineEmits<{
  (e: 'submitted', succeed: boolean): void
}>()

const rPasswordFormItemRef = ref<any>(null)
const formRef = ref<any>(null)

function handlePasswordInput() {
  if (teamFormDataRef.value.referee.password) {
    rPasswordFormItemRef.value.validate({trigger: 'password-input'})
  }
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value.validate((errors: any) => {
    if (!errors) {
      const detail = toDetail(teamFormDataRef.value)
      updateTeamDetail(detail).then((result) => {
        if (result.code === 0) {
          message.success("提交成功")
          emit('submitted', true)
        } else {
          message.error(`提交失败：${result.msg}`)
          emit('submitted', false)
        }
      })
    } else {
      message.error('报名表验证失败！')
    }
  })
}


const genderSelectOptions = [
  {value: 'male', label: '男'},
  {value: 'female', label: '女'}
]

const basicTeamMemberRule: FormRules = {
  name: [{
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入姓名',
  }],
  idNumber: [{
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入身份证号',
  }],
  phone: [{
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入联系方式',
  }],
}

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入队伍名称',
  },
  leader: {
    ...basicTeamMemberRule
  },
  teamDoctor: {
    ...basicTeamMemberRule
  },
  referee: {
    ...basicTeamMemberRule,
    userName: [{
      required: true,
      trigger: ['input', 'blur'],
      message: '请输入用户名',
    }],
    reenteredPassword: [
      {
        validator: (rule, value) => {
          const pwd = teamFormDataRef.value.referee.password;
          return !value || value === pwd
        },
        message: '两次密码输入不一致',
        trigger: ['blur', 'input', 'password-input']
      }
    ]
  },
}
const coachRules = {
  ...basicTeamMemberRule,
  gender: [{
    required: true,
    trigger: ['change', 'blur'],
    message: '请选择性别',
  }]
}


const athleteRules = {
  ...basicTeamMemberRule,
  gender: [{
    required: true,
    trigger: ['change', 'blur'],
    message: '请选择性别',
  }],
  age: [{
    required: true,
    trigger: ['change', 'blur'],
    message: '请输入年龄',
  }],
  eventIds: [
    {
      validator(rule: any, value: Array<number>) {
        return value.length > 0
      },
      message: '至少报名参加一个项目！',
      trigger: ['change', 'blur'],
    }
  ]
}


</script>

<template>
  <n-card class="form-container">
    <n-form label-placement="top" :model="teamFormDataRef" :rules="formRules" ref="formRef">
      <n-divider class="divider first" title-placement="left">队伍基本信息</n-divider>
      <n-form-item class="input-top" path="name" label="队伍名称">
        <n-input v-model:value="teamFormDataRef.name"/>
      </n-form-item>
      <div class="input-line">
        <n-form-item class="size-1" path="leader.name" label="领队姓名">
          <n-input v-model:value="teamFormDataRef.leader.name"/>
        </n-form-item>
        <n-form-item class="size-3" path="leader.idNumber" label="领队身份证">
          <n-input v-model:value="teamFormDataRef.leader.idNumber"/>
        </n-form-item>
        <n-form-item class="size-2" path="leader.phone" label="领队联系方式">
          <n-input v-model:value="teamFormDataRef.leader.phone"/>
        </n-form-item>
      </div>
      <div class="input-line">
        <n-form-item class="size-1" path="teamDoctor.name" label="队医姓名">
          <n-input v-model:value="teamFormDataRef.teamDoctor.name"/>
        </n-form-item>
        <n-form-item class="size-3" path="teamDoctor.idNumber" label="队医身份证">
          <n-input v-model:value="teamFormDataRef.teamDoctor.idNumber"/>
        </n-form-item>
        <n-form-item class="size-2" path="teamDoctor.phone" label="队医联系方式">
          <n-input v-model:value="teamFormDataRef.teamDoctor.phone"/>
        </n-form-item>
      </div>
      <div class="input-line">
        <n-form-item class="size-1" path="referee.name" label="裁判员姓名">
          <n-input v-model:value="teamFormDataRef.referee.name"/>
        </n-form-item>
        <n-form-item class="size-3" path="referee.idNumber" label="裁判员身份证">
          <n-input v-model:value="teamFormDataRef.referee.idNumber"/>
        </n-form-item>
        <n-form-item class="size-2" path="referee.phone" label="裁判员联系方式">
          <n-input v-model:value="teamFormDataRef.referee.phone"/>
        </n-form-item>
      </div>
      <div class="input-line">
        <n-form-item path="referee.userName" label="裁判员账号">
          <n-input v-model:value="teamFormDataRef.referee.userName"/>
        </n-form-item>
        <n-form-item path="referee.password" label="裁判员密码">
          <n-input type="password" show-password-on="click" v-model:value="teamFormDataRef.referee.password"
                   @input="handlePasswordInput"/>
        </n-form-item>
        <n-form-item path="referee.reenteredPassword" label="确认密码" ref="rPasswordFormItemRef">
          <n-input type="password" show-password-on="click" v-model:value="teamFormDataRef.referee.reenteredPassword"/>
        </n-form-item>
      </div>
      <n-divider class="divider" title-placement="left">教练员信息</n-divider>
      <n-dynamic-input :on-create="createCoach" class="dynamic" v-model:value="teamFormDataRef.coaches"
                       #="{ index, value }">
        <div class="input-line">
          <n-form-item class="size-4" ignore-path-change :path="`coaches[${index}].name`" :rule="coachRules.name"
                       label="姓名">
            <n-input v-model:value="teamFormDataRef.coaches[index].name"/>
          </n-form-item>
          <n-form-item class="size-5" ignore-path-change :path="`coaches[${index}].gender`" :rule="coachRules.gender"
                       label="性别">
            <n-select v-model:value="teamFormDataRef.coaches[index].gender" :options="genderSelectOptions"/>
          </n-form-item>
          <n-form-item class="size-3" ignore-path-change :path="`coaches[${index}].idNumber`"
                       :rule="coachRules.idNumber"
                       label="身份证">
            <n-input v-model:value="teamFormDataRef.coaches[index].idNumber"/>
          </n-form-item>
          <n-form-item class="size-2" ignore-path-change :path="`coaches[${index}].phone`" :rule="coachRules.phone"
                       label="联系方式">
            <n-input v-model:value="teamFormDataRef.coaches[index].phone"/>
          </n-form-item>
        </div>
      </n-dynamic-input>
      <n-divider class="divider" title-placement="left">运动员信息</n-divider>
      <n-dynamic-input :on-create="createAthlete" class="dynamic" v-model:value="teamFormDataRef.athletes"
                       #="{ index, value }">
        <div class="input-block">
          <div class="input-line">
            <n-form-item class="size-1" ignore-path-change :path="`athletes[${index}].name`" :rule="athleteRules.name"
                         label="姓名">
              <n-input v-model:value="teamFormDataRef.athletes[index].name"/>
            </n-form-item>
            <n-form-item class="size-3" ignore-path-change :path="`athletes[${index}].idNumber`"
                         :rule="athleteRules.idNumber" label="身份证">
              <n-input v-model:value="teamFormDataRef.athletes[index].idNumber"/>
            </n-form-item>
            <n-form-item class="size-2" ignore-path-change :path="`athletes[${index}].phone`" :rule="athleteRules.phone"
                         label="联系方式">
              <n-input v-model:value="teamFormDataRef.athletes[index].phone"/>
            </n-form-item>
          </div>

          <div class="input-line">
            <n-form-item class="size-5" ignore-path-change :path="`athletes[${index}].gender`"
                         :rule="athleteRules.gender"
                         label="性别">
              <n-select v-model:value="teamFormDataRef.athletes[index].gender" :options="genderSelectOptions"
                        @update:value="teamFormDataRef.athletes[index].eventIds = []"/>
            </n-form-item>
            <n-form-item class="size-5" ignore-path-change :path="`athletes[${index}].age`"
                         :rule="athleteRules.age"
                         label="年龄">
              <n-input v-model:value="teamFormDataRef.athletes[index].age" :options="genderSelectOptions" />
            </n-form-item>
            <n-form-item class="size-6" ignore-path-change :path="`athletes[${index}].eventIds`"
                         :rule="athleteRules.eventIds" label="报名的比赛项目">
              <n-select multiple v-model:value="teamFormDataRef.athletes[index].eventIds"
                        :options="filterOptionsEvent(teamFormDataRef.athletes[index].gender)"/>
            </n-form-item>
          </div>
        </div>
      </n-dynamic-input>
      <div class="action-line">
        <n-button
            @click="handleSubmit"
            round
            type="primary"
        >
          提交报名表
        </n-button>
      </div>
    </n-form>
  </n-card>
</template>


<style scoped lang="stylus">
.divider
  padding 0
  margin 0 0 16px

  &.first
    margin-top 12px

.input-top
  margin 0 16px

.action-line
  display flex
  flex-direction row-reverse
  margin 16px 24px

.input-line
  display flex

  & > div
    margin 0 16px
    flex auto

    &.size-1
      flex 6 6 0

    &.size-2
      flex 10 10 0

    &.size-3
      flex 8 8 0

    &.size-4
      flex 4 4 0

    &.size-5
      flex 3 3 0

    &.size-6
      flex 16 16 0

.dynamic
  :deep(div.n-dynamic-input-item__action)
    align-self center
    margin 0 16px

  .input-line
  .input-block
    flex 1 1 auto
    margin-left 4px

  .input-line > div
    margin 0 12px

.form-container
  max-width 1200px
</style>
