import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropsComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValuesChange() {
    const newData = form.getFieldsValue()
    onChange && onChange(newData)
  }

  return (
    <Form
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ text, isCenter }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请填写段落内容' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
