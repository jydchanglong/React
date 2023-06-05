import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectdComponent,
  pasteSelectdComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'
import { ActionCreators } from 'redux-undo'

function isActiveElement() {
  // 鼠标没有 focus 到 input、select 等输入组件
  const activeEle = document.activeElement
  if (activeEle === document.body) return true
  if (activeEle?.matches('div[role="button"]')) return true

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 删除按钮
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElement()) return
    dispatch(removeSelectedComponent())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElement()) return
    dispatch(copySelectdComponent())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) return
    dispatch(pasteSelectdComponent())
  })

  // 上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElement()) return
    dispatch(selectPrevComponent())
  })

  // 下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElement()) return
    dispatch(selectNextComponent())
  })

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElement()) return
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElement()) return
      dispatch(ActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
