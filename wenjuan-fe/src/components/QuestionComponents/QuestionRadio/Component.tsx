import React, { FC } from 'react'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'
import { Input, Typography, Radio, Space, RadioChangeEvent } from 'antd'

const { Paragraph } = Typography

const QustionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title = '',
    isVertical = false,
    options = [],
    value = '',
    onChange,
  } = { ...QuestionRadioDefaultProps, ...props }

  // const onChange = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value)
  //   onChange(e.target.value)
  // }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Radio.Group value={value}>
          <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {options.map(item => (
              <Radio key={item.value} value={item.value}>
                {item.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default QustionRadio
