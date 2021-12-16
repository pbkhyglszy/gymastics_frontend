<script setup lang="ts">
import {DataTableColumn, NButton, NDataTable, useDialog} from "naive-ui";
import {createDefaultActionColumn} from "../../utils";
import {ref} from "vue";

const dialog = useDialog()

const ageGroups: Array<AgeGroup> = [
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
];

const competitionEvents: Array<EventType> = [
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
  }, {
    id: 4,
    eventName: '自由体操',
    gender: 'female',
  },
]


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
      () => {

      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除 '${row.eventName} （${row.gender === 'male' ? '男' : '女'}）'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {

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
      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除年龄组 '${row.name || `${row.minAge}-${row.maxAge}岁组`}'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {

          }
        })
      }
  )
]


</script>

<template>
  <div class="wrapper">
    <div class="table-header">
      <div class="empty"></div>
      <n-button class="add-button" type="primary">添加比赛项目</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="eventsColumns"
          :data="competitionEvents"
          :single-line="false"
          flex-height
      />
    </div>
    <div class="table-header">
      <div class="empty"></div>
      <n-button class="add-button" type="primary">添加年龄组</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="ageGroupsColumns"
          :data="ageGroups"
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
