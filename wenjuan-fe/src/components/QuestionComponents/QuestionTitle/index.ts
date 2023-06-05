import { QuestionTitleDefaultProps } from './interface'
import Component from './Component'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle', // 和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionTitleDefaultProps,
}
