import React, { FC } from 'react'
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './interface'
import { Typography, Space, Checkbox } from 'antd'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(item => {
          const { value, text, checked } = item
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
