import React, { FC } from 'react'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'
import { Typography } from 'antd'

const { Title } = Typography

const QustionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
  const genTitleSize = (level: number) => {
    switch (level) {
      case 1:
        return '24px'
        break
      case 2:
        return '20px'
        break
      case 3:
        return '16px'
        break
      default:
        return '16px'
        break
    }
  }

  return (
    <Title
      level={level}
      style={{ textAlign: isCenter ? 'center' : 'start', fontSize: genTitleSize(level) }}
    >
      {text}
    </Title>
  )
}

export default QustionTitle
