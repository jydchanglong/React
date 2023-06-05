import React, { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const QustionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  // 尽量不使用 dangerouslySetInnerHTML
  const textList = text.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}

export default QustionParagraph
