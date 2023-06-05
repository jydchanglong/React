import { FC } from 'react'
import { QuestionTitlePropsType } from './QuestionTitle/interface'
import QuestionTitle from './QuestionTitle'
import QuestionInput, { QuestionInputPropsType } from './QuestionInput'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType,
} from './QuestionRadio'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from './QuestionCheckbox'

export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 统一各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

export type ComponentConfType = {
  title: string
  type: string // 和后端统一好
  Component: FC<ComponentPropsType>
  PropsComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatComponent?: FC<ComponentStatPropsType>
}

const componentConfList: ComponentConfType[] = [
  QuestionInput,
  QuestionTitle,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitle, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInput, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentByType(type: string) {
  return componentConfList.find(item => item.type === type)
}
