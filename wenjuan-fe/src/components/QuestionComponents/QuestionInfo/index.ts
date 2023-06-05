import { QuestionInfoDefaultProps } from './interface'
import Component from './Component'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInfo', // 和后端统一好
  Component, // 画布显示
  PropsComponent, // 修改属性显示
  defaultProps: QuestionInfoDefaultProps,
}
