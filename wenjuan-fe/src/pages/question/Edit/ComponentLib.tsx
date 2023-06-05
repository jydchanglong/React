import React, { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { addComponent } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import styles from './ComponentLib.module.scss'
import { Typography } from 'antd'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography

function genComponent(comp: ComponentConfType) {
  const { title, type, Component, defaultProps } = comp
  const dispatch = useDispatch()
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((item, index) => {
        const { groupId, groupName, components } = item

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '' }}>
              {groupName}
            </Title>
            <div>{components.map(comp => genComponent(comp))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
