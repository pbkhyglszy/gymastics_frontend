<script setup lang="ts">
import {DataTableColumn, NButton, NDataTable, useDialog, useMessage} from "naive-ui";
import {createDefaultActionColumn} from "../../utils";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import AgeGroupEdit from "../../components/admin/AgeGroupEdit.vue";
import EventEdit from "../../components/admin/EventEdit.vue";
import {deleteAgeGroup, deleteEvent} from "../../api/competition";
import {onBeforeRouteUpdate} from "vue-router";

const dialog = useDialog()
const store = useStore();
const message = useMessage()

const ageGroupEditor = ref<any>()
const eventEditor = ref<any>()

const ageGroupsRef = computed(() => store.state.ageGroups)
const competitionEventsRef = computed(() => store.state.competitionEvents)


onBeforeRouteUpdate(() => store.dispatch("tryUpdateEvents"))
store.dispatch("tryUpdateEvents")

const eventsColumns: Array<DataTableColumn<EventType>> = [
  {
    title: '项目名称',
    key: 'eventName',
  },
  {
    title: '需求性别',
    key: 'gender',
    render(row) {
      return row.gender === 'male' ? '男' : '女'
    },
  },
  createDefaultActionColumn(
      (row) => {
        eventEditor.value?.edit(row)
      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除 '${row.eventName} （${row.gender === 'male' ? '男' : '女'}）'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            return deleteEvent(row.id!)
                .then(result => {
                  if (result.code === 0) {
                    message.success("删除成功")
                    store.commit("invalidateEvents")
                    store.dispatch("updateEvents")
                  } else {
                    message.error(`删除失败：${result.msg}`)
                  }
                })
          }
        })
      }
  )
]


const ageGroupsColumns: Array<DataTableColumn<AgeGroup>> = [
  {
    title: '年龄组',
    key: 'name',
    render(row) {
      return row.name || `${row.minAge}-${row.maxAge}岁组`
    },
  },
  {
    title: '最小年龄',
    key: 'minAge',
  },
  {
    title: '最大年龄',
    key: 'maxAge',
  },
  createDefaultActionColumn(
      (row) => {
        ageGroupEditor.value?.edit(row)
      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除年龄组 '${row.name || `${row.minAge}-${row.maxAge}岁组`}'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            return deleteAgeGroup(row.id!)
                .then(result => {
                  if (result.code === 0) {
                    message.success("删除成功")
                    store.commit("invalidateEvents")
                    store.dispatch("updateEvents")
                  } else {
                    message.error(`删除失败：${result.msg}`)
                  }
                })
          }
        })
      }
  )
]


</script>

<template>
  <age-group-edit ref="ageGroupEditor"/>
  <event-edit ref="eventEditor"/>
  <div class="wrapper">
    <div class="table-header">
      <div class="empty"></div>
      <n-button class="add-button" type="primary" @click="eventEditor?.add()">添加比赛项目</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="eventsColumns"
          :data="competitionEventsRef"
          :single-line="false"
          flex-height
      />
    </div>
    <div class="table-header">
      <div class="empty"></div>
      <n-button class="add-button" type="primary" @click="ageGroupEditor?.add()">添加年龄组</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="ageGroupsColumns"
          :data="ageGroupsRef"
          :single-line="false"
          flex-height
      />
    </div>
  </div>
</template>


<style scoped lang="stylus">
.wrapper
  display flex
  flex-direction column
  height 100%

  .table-header
    align-items center
    display flex
    flex-direction row
    padding 5px
    margin 0 30px

    .empty
      flex 1 1 0

    .add-button
      flex none
      width 120px

    .display-switch
      flex none

  .table-content
    flex 1 1 auto


</style>
