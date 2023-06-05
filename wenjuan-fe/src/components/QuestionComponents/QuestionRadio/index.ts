import { QuestionRadioDefaultProps } from './interface'
import Component from './Component'
import StatComponent from './StatComponent'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '单选框',
  type: 'questionRadio', // 和后端统一好
  Component, // 画布显示
  PropsComponent, // 修改属性显示
  defaultProps: QuestionRadioDefaultProps,
  StatComponent, // 统计组件
}
