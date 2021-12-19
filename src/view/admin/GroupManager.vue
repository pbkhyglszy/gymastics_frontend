<script setup lang="ts">
import {
  DataTableColumn,
  NButton,
  NSwitch,
  NDataTable,
  NButtonGroup,
  DataTableCreateSummary,
  useDialog,
  useMessage
} from "naive-ui";
import {computed, h, Ref, ref} from "vue";
import {createDefaultActionColumn} from "../../utils";
import CompetitionEdit from "../../components/admin/CompetitionEdit.vue";
import {onBeforeRouteUpdate} from "vue-router";
import {Store, useStore} from "vuex";
import {deleteCompetition, getAllGroupedCompetitions} from "../../api/competition";
import {State} from "../../store";
import CompetitionArrangement from "../../components/admin/CompetitionArrangement.vue";

const dialog = useDialog()
const editor = ref<any>()
const arrangement = ref<any>()
const store: Store<State> = useStore()
const message = useMessage()

interface GroupedCompetitionView extends Competition {
  id?: number,
  eventId?: number,
  ageClassId?: number,
  groupSize: number,
  signNumber?: number,
  eventName?: string,
  ageGroupName?: string,
  gender?: 'male' | 'female',
  minAge?: number,
  maxAge?: number,
}

const events: Ref<Array<GroupedCompetition>> = ref([]);

onBeforeRouteUpdate(() => refreshData())
refreshData()

function refreshData() {
  store.dispatch("tryUpdateEvents")
  store.dispatch("updateProgress")
  getAllGroupedCompetitions().then(result => {
    if (result.code === 0) {
      events.value = result.data!
    } else {
      message.error(`获取比赛信息失败：${result.msg}`)
    }
  })
}

const ageGroupsIdMap = computed(() => new Map(store.state.ageGroups!.map(it => [it.id, it])))
const competitionEventsIdMap = computed(() => new Map(store.state.competitionEvents!.map(it => [it.id, it])))

const competitionData = computed<Array<GroupedCompetitionView>>(() =>
    events.value.flatMap(entry => {
      const size = entry.groups.length;
      const eventDetail = competitionEventsIdMap.value.get(entry.id)
      return entry.groups.map(it => {
        const ageGroup = ageGroupsIdMap.value.get(it.ageClassId)
        return {
          id: it.competitionId,
          ageClassId: it.ageClassId,
          eventId: eventDetail?.id,
          eventName: eventDetail?.eventName,
          gender: eventDetail?.gender,
          minAge: ageGroup?.minAge,
          maxAge: ageGroup?.maxAge,
          ageGroupName: ageGroup?.name,
          signNumber: it.signedNumber,
          groupSize: size,
        }
      })
    })
);
const isDetailedTable = ref(true);
// const type = ref<'edit' | 'arrange'>('edit');

const type = computed(()=> store.state.progress === 0 ? 'edit' : 'arrange')


function calcSimpleName(row: GroupedCompetitionView) {
  const genderStr = row.gender === 'male' ? '男子' : '女子'
  return `${genderStr}${row.eventName} ${row.minAge}-${row.maxAge}岁组`
}

const columns = computed<Array<DataTableColumn<GroupedCompetitionView>>>(() => {

  const editActions = createDefaultActionColumn<GroupedCompetitionView>(
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
            return deleteCompetition(row.id!)
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

  const arrangeActions: DataTableColumn<GroupedCompetitionView> = {
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
                arrangement.value?.arrange(row.id)
              }
            },
            {default: () => '赛事安排'}
        ),
      ]
    }
  }


  const signNumberColumn: DataTableColumn<GroupedCompetitionView> = {
    title: '报名人数',
    key: 'signNumber'
  }

  const detailedColumns: Array<DataTableColumn<GroupedCompetitionView>> = [
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
        return row.ageGroupName || `${row.minAge}-${row.maxAge}岁组`
      },
    },

  ];


  const simpleColumns: Array<DataTableColumn<GroupedCompetitionView>> = [
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
  <competition-edit ref="editor" @submitted="$event && refreshData()"/>
  <competition-arrangement ref="arrangement"/>
  <div class="wrapper">
    <div class="table-header">
      <n-switch class="display-switch" v-model:value="isDetailedTable">
        <template #checked>详细</template>
        <template #unchecked>简略</template>
      </n-switch>
      <div class="empty"></div>
      <n-button v-if="type==='edit'" class="add-button" type="primary" @click="editor?.add()">添加</n-button>
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
