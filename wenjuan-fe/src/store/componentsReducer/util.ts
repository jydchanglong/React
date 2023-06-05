import { ComponentInfoType, ComponentStateType } from './index'
export const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  let newSelectedId = ''
  const visibleComplist = componentList.filter(c => !c.isHidden)
  const curIndex = visibleComplist.findIndex(item => item.fe_id === fe_id)
  if (curIndex < 0) return newSelectedId
  const length = visibleComplist.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (curIndex + 1 === length) {
      newSelectedId = visibleComplist[curIndex - 1].fe_id
    } else {
      newSelectedId = visibleComplist[curIndex + 1].fe_id
    }
  }
  return newSelectedId
}

export function insertNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
  if (selectedIndex > -1) {
    // 如果当前画布有选中的组件，则在它后面添加
    draft.componentList.splice(selectedIndex + 1, 0, newComponent)
  } else {
    // 如果当前画布没有选中的组件，则在最后面添加
    draft.componentList.push(newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
