<script setup lang="ts">
import {DataTableColumn, NButton, NDataTable, useDialog, useMessage} from "naive-ui";
import {createDefaultActionColumn} from "../../utils";
import {ref} from "vue";
import {onBeforeRouteUpdate} from "vue-router";
import {deleteTeam, getAllTeam} from "../../api/team";
import TeamEdit from "../../components/admin/TeamEdit.vue";

const dialog = useDialog()
const message = useMessage()
const editor = ref<any>()

const teamDataRef = ref<Array<Team>>([])
onBeforeRouteUpdate(() => refreshData())
refreshData()

function refreshData() {
  getAllTeam().then(result => {
    if (result.code === 0) {
      teamDataRef.value = result.data!
    } else {
      message.error(`获取队伍信息失败：${result.msg}`)
    }
  })
}


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
      (row) => {
        editor.value?.edit(row)
      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除代表队 '${row.name}'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            return deleteTeam(row.id!)
                .then(result => {
                  if (result.code === 0) {
                    message.success("删除成功")
                    refreshData()
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
  <team-edit ref="editor" @submitted="$event && refreshData()"/>
  <div class="wrapper">
    <div class="table-header">
      <div class="empty"></div>
      <n-button class="add-button" type="primary" @click="editor?.add()">添加</n-button>
    </div>
    <div class="table-content">
      <n-data-table
          class="data-table"
          :columns="columns"
          :data="teamDataRef"
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
