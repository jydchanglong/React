import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { Button, Input, Space, message } from 'antd'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

const Layers: FC = () => {
  const { selectedId, componentList } = useGetComponentInfo()
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(item => item.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    setChangingTitleId(fe_id)
  }

  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value.trim()
    if (!newVal) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newVal }))
    console.log(newVal)
  }

  // 切换隐藏
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换锁定
  function changeLock(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  const componentListWithId = componentList.map(item => {
    return { ...item, id: item.fe_id }
  })

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    console.log('handleDragEnd: ', oldIndex, newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList.map(comp => {
          const { fe_id, title, isHidden, isLocked } = comp

          const defaultTitleClassname = styles.title
          const selectedClassname = styles.selected
          const titleClassName = classNames({
            [defaultTitleClassname]: true,
            [selectedClassname]: selectedId === fe_id,
          })

          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div className={styles.wrapper}>
                <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                  {fe_id === changingTitleId && (
                    <Input
                      value={title}
                      onChange={changeTitle}
                      onPressEnter={() => setChangingTitleId('')}
                      onBlur={() => setChangingTitleId('')}
                    />
                  )}
                  {fe_id !== changingTitleId && title}
                </div>
                <div className={styles.handler}>
                  <Space>
                    <Button
                      className={!isHidden ? styles.btn : ''}
                      icon={<EyeInvisibleOutlined />}
                      type={isHidden ? 'primary' : 'text'}
                      size="small"
                      shape="circle"
                      onClick={() => changeHidden(fe_id, !isHidden)}
                    />
                    <Button
                      className={!isLocked ? styles.btn : ''}
                      icon={<LockOutlined />}
                      type={isLocked ? 'primary' : 'text'}
                      size="small"
                      shape="circle"
                      onClick={() => changeLock(fe_id)}
                    />
                  </Space>
                </div>
              </div>
            </SortableItem>
          )
        })}
      </SortableContainer>
    </>
  )
}

export default Layers
