<script setup lang="ts">
import {NTable, useMessage} from "naive-ui";
import {computed, ref, Ref} from "vue";
import {useStore} from "vuex";
import {onBeforeRouteUpdate} from "vue-router";
import {getTeamDetail} from "../../api/team";

const store = useStore();
const message = useMessage()
const teamDetailRef = ref<TeamDetail>({
  members: []
});


function refresh() {
  store.dispatch("tryUpdateEvents")
  getTeamDetail().then(result => {
    if (result.code === 0) {
      teamDetailRef.value = result.data!
    } else {
      message.error(`获取队伍信息失败：${result.msg}`)
    }
  })
}

onBeforeRouteUpdate(() => refresh())
refresh()


const competitionEventsIdMap = computed<Map<number, EventType>>(() => new Map(store.state.competitionEvents.map((it: EventType) => [it.id, it])))


const leader = computed(
    () => teamDetailRef.value.members
            .find(it => it.type === 'team_leader')
        ?? {type: 'team_leader'})
const teamDoctor = computed(
    () => teamDetailRef.value.members
            .find(it => it.type === 'team_doctor')
        ?? {type: 'team_doctor'})
const referee = computed(
    () => teamDetailRef.value.members
            .find(it => it.type === 'referee') as Referee | undefined
        ?? {type: 'referee'})

const coaches = computed(
    () => teamDetailRef.value.members
        .filter(it => it.type === 'coach'))

const athletes = computed(
    () => teamDetailRef.value.members
        .filter(it => it.type === 'athlete') as Athlete[])

const athleteRowNumber = computed(() =>
    athletes.value
        .map(it => Math.ceil(it.eventIds.length / 2) + 3)
        .reduce((a, b) => a + b))

function calcGender(gender: 'male' | 'female') {
  return gender === 'male' ? '男' : '女'
}

function calcCompetition(ids: Array<number>) {
  const result: Array<{
    single: boolean,
    eventA: string,
    eventB?: string,
  }> = []
  const iterLen = Math.ceil(ids.length / 2)
  for (let i = 0; i < iterLen; i++) {
    const eventA = competitionEventsIdMap.value.get(ids[i * 2])
    const single = i * 2 + 1 >= ids.length
    if (single) {
      result.push({
        single: true,
        eventA: eventA?.eventName!,
      })
    } else {
      const eventB = competitionEventsIdMap.value.get(ids[i * 2 + 1])
      result.push({
        single: false,
        eventA: eventA?.eventName ?? '未知比赛项目',
        eventB: eventB?.eventName ?? '未知比赛项目',
      })
    }
  }
  return result;
}

</script>

<template>
  <n-table :single-line="false" class="my-table">
    <colgroup>
      <col class="header"/>
      <col class="label-s"/>
      <col class="content"/>
      <col class="label-s"/>
      <col class="content-small"/>
      <col class="label-l"/>
      <col class="content"/>
      <col class="content-adjust"/>
      <col class="label-l"/>
      <col class="content"/>
    </colgroup>
    <tr>
      <th>团队名：</th>
      <td colspan="9">{{ teamDetailRef.name }}</td>
    </tr>
    <tr>
      <th>领队：</th>
      <td>姓名</td>
      <td colspan="3">{{ leader?.name }}</td>
      <td>身份证号</td>
      <td colspan="2">{{ leader?.idNumber }}</td>
      <td>联系方式</td>
      <td>{{ leader?.phone }}</td>
    </tr>
    <tr>
      <th>队医：</th>
      <td>姓名</td>
      <td colspan="3">{{ teamDoctor?.name }}</td>
      <td>身份证号</td>
      <td colspan="2">{{ teamDoctor?.idNumber }}</td>
      <td>联系方式</td>
      <td>{{ teamDoctor?.phone }}</td>
    </tr>
    <tr>
      <th>裁判员：</th>
      <td>姓名</td>
      <td colspan="3">{{ referee?.name }}</td>
      <td>身份证号</td>
      <td colspan="2">{{ referee?.idNumber }}</td>
      <td>联系方式</td>
      <td>{{ referee?.phone }}</td>
    </tr>
    <template v-if="coaches.length === 0">
      <tr>
        <th>教练员：</th>
        <td colspan="9">[无]</td>
      </tr>
    </template>
    <template v-for="(coach, index) in coaches">
      <tr>
        <th v-if="index === 0" :rowspan="coaches.length">教练员：</th>
        <td>姓名</td>
        <td>{{ coach.name }}</td>
        <td>性别</td>
        <td>{{ calcGender(coach.gender) }}</td>
        <td>身份证号</td>
        <td colspan="2">{{ coach.idNumber }}</td>
        <td>联系方式</td>
        <td>{{ coach.phone }}</td>
      </tr>
    </template>

    <template v-if="athletes.length === 0">
      <tr>
        <th>运动员：</th>
        <td colspan="9">[无]</td>
      </tr>
    </template>
    <template v-for="(athlete, index) in athletes">
      <tr>
        <th v-if="index === 0" :rowspan="athleteRowNumber">运动员：</th>
        <th colspan="9" class="splitter"></th>
      </tr>
      <tr>
        <td>姓名</td>
        <td colspan="3">{{ athlete.name }}</td>
        <td>身份证号</td>
        <td colspan="2">{{ athlete.idNumber }}</td>
        <td>联系方式</td>
        <td>{{ athlete.phone }}</td>
      </tr>
      <tr>
        <td>性别</td>
        <td colspan="3">{{ calcGender(athlete.gender) }}</td>
        <td>年龄</td>
        <td>{{ athlete.age }}</td>
        <td colspan="2">运动员编号</td>
        <td>{{ athlete.athleteId }}</td>
      </tr>
      <tr v-for="(data, index) in calcCompetition(athlete.eventIds)">
        <td v-if="index === 0" :rowspan="Math.ceil(athlete.eventIds.length / 2)" colspan="3">参加的比赛</td>
        <td colspan="3">{{ data.eventA }}</td>
        <td colspan="3" v-if="data.single"></td>
        <td colspan="3" v-else>{{ data.eventB }}</td>
      </tr>
    </template>
  </n-table>
</template>


<style scoped lang="stylus">
.my-table
  table-layout fixed
  max-width 1200px

  .header
    width 80px

  .label-l
    width 100px

  .label-s
    width 60px

  .content
    width 30%

  .content
    width 30%

  .content
    width 30%

  .content-small
    width: 50px;

  .content-adjust
    width: 10%;

  td
    text-align center

  td.align-left
    text-align left

  th.splitter
    height 10px
    padding 0

</style>
