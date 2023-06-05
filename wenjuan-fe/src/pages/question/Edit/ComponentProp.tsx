import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()

  if (selectedComponent == null) return <NoProp />

  const { type, props, fe_id, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentByType(type)
  if (componentConf == null) return <NoProp />
  const { PropsComponent } = componentConf

  function handleChange(newPorp: ComponentPropsType) {
    console.log('new: ', newPorp)
    if (selectedComponent == null) return
    dispatch(changeComponentProps({ fe_id, newProp: newPorp }))
  }

  return (
    <div>
      <PropsComponent {...props} onChange={handleChange} disabled={isLocked || isHidden} />
    </div>
  )
}

export default ComponentProp
