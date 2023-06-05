/**
 * 问卷 -- 段落
 */

import { QuestionParagraphDefaultProps } from './interface'
import Component from './Component'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph', // 和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
