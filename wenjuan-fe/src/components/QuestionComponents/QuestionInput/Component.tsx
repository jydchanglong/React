import React, { FC } from 'react'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

const QustionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QustionInput
