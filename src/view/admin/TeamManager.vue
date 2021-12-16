<script setup lang="ts">
import {DataTableColumn, NButton, NDataTable, useDialog} from "naive-ui";
import {createDefaultActionColumn} from "../../utils";

const dialog = useDialog()
const competitionData: Array<Team> = [
  {
    id: 1,
    name: "你塔喵是什么队",
    userName: "2021120001",
  },
  {
    id: 1,
    name: "就是这么队",
    userName: "2021120002",
  },
  {
    id: 1,
    name: "小兔崽子队",
    userName: "2021120003",
  },


];

const columns: Array<DataTableColumn<Team>> = [
  {
    title: '代表队名称',
    key: 'name',
  },
  {
    title: '账号',
    key: 'userName',
  },
  {
    title: '密码',
    key: 'password',
    render(row) {
      return row.password || '**********'
    },
  },
  createDefaultActionColumn(
      () => {

      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除代表队 '${row.name}'？`,
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
      <n-button class="add-button" type="primary">添加</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="columns"
          :data="competitionData"
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
      width 100px

  .table-content
    flex 1 1 auto
</style>
