import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
// import QustionInput from '../../../components/QuestionComponents/QuestionInput/Component'
// import QustionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, moveComponent } from '../../../store/componentsReducer'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  const componentListWithId = componentList.map(item => {
    return { ...item, id: item.fe_id }
  })
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    console.log('handleDragEnd: ', oldIndex, newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(item => {
            const { fe_id, type, isLocked } = item
            const wrapperDefaultClassNames = styles['component-wrapper']
            const wrapperSelected = styles.selected
            const wrapperLocked = styles.locked
            const wrapperClassNames = classNames({
              [wrapperDefaultClassNames]: true,
              [wrapperSelected]: selectedId === fe_id,
              [wrapperLocked]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassNames} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
