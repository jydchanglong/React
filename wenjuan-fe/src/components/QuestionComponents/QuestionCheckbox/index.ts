import { QuestionCheckboxDefaultProps } from './interface'
import Component from './Component'
import PropsComponent from './PropComponent'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '多选框',
  type: 'questionCheckbox', // 和后端统一好
  Component, // 画布显示
  PropsComponent, // 修改属性显示
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
}
