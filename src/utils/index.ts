import {h} from "vue";
import {DataTableColumn, NButton} from "naive-ui";

export function createDefaultActionRender(onEdit: (e: MouseEvent) => void, onDelete: (e: MouseEvent) => void) {
    return [
        h(
            NButton,
            {
                size: 'small',
                ghost: true,
                type: 'primary',
                onClick: onEdit
            },
            {default: () => '编辑'}
        ),
        h(
            NButton,
            {
                size: 'small',
                ghost: true,
                type: 'warning',
                onClick: onDelete
            },
            {default: () => '删除'}
        ),
    ]
}

export function createDefaultActionColumn<T>(
    onEdit: (row: T, e: MouseEvent) => void,
    onDelete: (row: T, e: MouseEvent) => void): DataTableColumn<T> {
    return {
        title: '操作',
        key: 'actions',
        className: 'action_col',
        width: 180,
        align: 'center',
        render(row) {
            return createDefaultActionRender(
                (e) => onEdit(row, e),
                (e) => onDelete(row, e)
            )
        },
    }
}


