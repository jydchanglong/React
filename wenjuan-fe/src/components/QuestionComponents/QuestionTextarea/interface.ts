export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProp: QuestionTextareaPropsType) => void
  disabled?: boolean
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
}
