import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input

const PropsComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleChange() {
    onChange && onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleChange}
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
