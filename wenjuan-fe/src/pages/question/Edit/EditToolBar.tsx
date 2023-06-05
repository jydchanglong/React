import React, { FC } from 'react'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectdComponent,
  pasteSelectdComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const componentLen = componentList.length
  const curIndex = componentList.findIndex(item => item.fe_id === selectedId)
  const isFirst = curIndex <= 0 // 是否为第一个
  const isLast = curIndex + 1 === componentLen // 是否为最后一个

  // 删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  // 隐藏
  function handleHidden() {
    if (selectedId) {
      dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }
  }
  // 锁定
  function handleLock() {
    if (selectedId) {
      dispatch(toggleComponentLocked({ fe_id: selectedId }))
    }
  }
  // 复制
  function handleCopy() {
    dispatch(copySelectdComponent())
  }
  // 粘贴
  function handlePaste() {
    dispatch(pasteSelectdComponent())
  }
  // 上移
  function handleUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: curIndex, newIndex: curIndex - 1 }))
  }
  // 下移
  function handleDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: curIndex, newIndex: curIndex + 1 }))
  }
  // 撤销
  function undo() {
    dispatch(ActionCreators.undo())
  }
  // 重做
  function redo() {
    dispatch(ActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={handleUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
