import React, { FC } from 'react'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph, Title } = Typography

const QustionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <div>
        <Paragraph>
          {descList.map((item, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {item}
            </span>
          ))}
        </Paragraph>
      </div>
    </div>
  )
}

export default QustionInfo
