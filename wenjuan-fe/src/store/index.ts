import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsSlice, { ComponentInfoType } from './componentsReducer'
import pageInfoSlice, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentInfoType> // 增加 undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsSlice, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoSlice,
  },
})
