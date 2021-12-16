<script setup lang="ts">
import {DataTableColumn, NButton, NSwitch, NDataTable, NButtonGroup, DataTableCreateSummary, useDialog} from "naive-ui";
import {computed, h, ref} from "vue";
import {createDefaultActionColumn} from "../../utils";
import CompetitionEdit from "../../components/admin/CompetitionEdit.vue";

const dialog = useDialog()
const editor = ref<any>()

interface GroupedCompetition extends Competition {
  groupSize: number,
}

const exmple: CompetitionEvent = {
  id: 1,
  eventName: '单杠',
  gender: 'male',
  groups: [
    {
      ageGroupId: 1,
      competitionId: 1,
      minAge: 9,
      maxAge: 11,
    },
    {
      ageGroupId: 2,
      competitionId: 2,
      minAge: 11,
      maxAge: 13,
    },
    {
      ageGroupId: 3,
      competitionId: 3,
      minAge: 13,
      maxAge: 15,
    }
  ],
}
const events: Array<CompetitionEvent> = [
  exmple,
  exmple,
  exmple,
  exmple,
  exmple,
  exmple,
  exmple,
  exmple,
  exmple,
]


const competitionData = computed<Array<GroupedCompetition>>(() =>
    events.flatMap(event => {
      let size = event.groups.length;
      return event.groups.map(it => {
        return {
          id: it.competitionId,
          ageGroupId: it.ageGroupId,
          eventId: event.id,
          eventName: event.eventName,
          gender: event.gender,
          minAge: it.minAge,
          maxAge: it.maxAge,
          groupSize: size,
        }
      })
    })
);
const isDetailedTable = ref(true);
const type = ref<'edit' | 'arrange'>('edit');

function calcSimpleName(row: GroupedCompetition) {
  const genderStr = row.gender === 'male' ? '男子' : '女子'
  return `${genderStr}${row.eventName} ${row.minAge}-${row.maxAge}岁组`
}

const columns = computed<Array<DataTableColumn<GroupedCompetition>>>(() => {

  const editActions = createDefaultActionColumn<GroupedCompetition>(
      (row) => {
        editor.value?.edit(row)
      },
      (row) => {
        dialog.warning({
          title: '确认删除',
          content: `是否要删除比赛 '${calcSimpleName(row)}'？`,
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {

          }
        })
      }
  )

  const arrangeActions: DataTableColumn<GroupedCompetition> = {
    title: '操作',
    key: 'actions',
    className: 'action_col',
    width: 180,
    align: 'center',
    render(row) {
      return [
        h(NButton, {
              size: 'small',
              ghost: true,
              type: 'primary',
              onClick: () => {

              }
            },
            {default: () => '赛事安排'}
        ),
      ]
    }
  }


  const signNumberColumn: DataTableColumn<GroupedCompetition> = {
    title: '报名人数',
    key: 'signNumber'
  }

  const detailedColumns: Array<DataTableColumn<GroupedCompetition>> = [
    {
      title: '项目名称',
      key: 'eventName',
      rowSpan(data, index) {
        return data.groupSize;
      },
    },
    {
      title: '需求性别',
      key: 'gender',
      rowSpan(data, index) {
        return data.groupSize;
      },
      render(row) {
        return row.gender === 'male' ? '男' : '女'
      },
    },
    {
      title: '年龄分组',
      key: 'ageGroup',
      render(row) {
        return `${row.minAge}-${row.maxAge}`
      },
    },

  ];


  const simpleColumns: Array<DataTableColumn<GroupedCompetition>> = [
    {
      title: '赛事名称',
      key: 'competitionName',
      render(row) {
        return calcSimpleName(row)
      }
    },
  ];


  if (type.value === 'edit') {
    return [
      ...(isDetailedTable.value ? detailedColumns : simpleColumns),
      editActions,
    ]
  } else {
    return [
      ...(isDetailedTable.value ? detailedColumns : simpleColumns),
      signNumberColumn,
      arrangeActions,
    ]
  }
})
</script>

<template>
  <competition-edit ref="editor"/>
  <div class="wrapper">
    <div class="table-header">
      <n-switch class="display-switch" v-model:value="isDetailedTable">
        <template #checked>详细</template>
        <template #unchecked>简略</template>
      </n-switch>
      <div class="empty"></div>
      <n-button class="add-button" type="primary" @click="editor?.add()">添加</n-button>
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
