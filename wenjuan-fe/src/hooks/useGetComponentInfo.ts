import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components.present) as ComponentStateType

  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find(item => item.fe_id === selectedId)

  return {
    selectedId,
    componentList,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo
