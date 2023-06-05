import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { getNextSelectedId, insertNewComponent } from './util'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
}

export type ComponentStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
    // 修改 selectId
    changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 新增组件
    addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(draft, newComponent)
    }),
    // 更改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProp: ComponentPropsType }>
      ) => {
        const { fe_id, newProp } = action.payload
        const curComp = draft.componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.props = { ...curComp.props, ...newProp }
        }
      }
    ),
    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const { componentList = [], selectedId } = draft
      const nextId = getNextSelectedId(selectedId, componentList)
      draft.selectedId = nextId
      const deleteIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if (deleteIndex > -1) {
        componentList.splice(deleteIndex, 1)
      }
    }),
    changeComponentHidden: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        let nextId = ''
        if (isHidden) {
          // 要隐藏
          nextId = getNextSelectedId(fe_id, componentList)
        } else {
          // 需要显示
          nextId = fe_id
        }
        draft.selectedId = nextId

        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    toggleComponentLocked: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload
        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 拷贝选中组件
    copySelectdComponent: produce((draft: ComponentStateType) => {
      const { componentList, selectedId } = draft
      const curComp = componentList.find(item => item.fe_id === selectedId)
      if (curComp == null) return
      draft.copiedComponent = cloneDeep(curComp)
    }),
    // 粘贴选中组件
    pasteSelectdComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const curIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if (curIndex > -1) {
        if (curIndex === 0) return
        draft.selectedId = componentList[curIndex - 1].fe_id
      }
    }),
    // 选中下一个
    selectNextComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const curIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if (curIndex > -1) {
        if (curIndex === componentList.length - 1) return
        draft.selectedId = componentList[curIndex + 1].fe_id
      }
    }),
    changeComponentTitle: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const curComp = draft.componentList.find(item => item.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),
    // 移动组件顺序
    moveComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curList } = draft
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(curList, oldIndex, newIndex)
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectdComponent,
  pasteSelectdComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
