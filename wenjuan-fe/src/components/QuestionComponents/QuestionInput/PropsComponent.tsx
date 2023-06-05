import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface'
import { Form, Input } from 'antd'

const PropsComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  function handleChange() {
    onChange && onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleChange}
      initialValues={{ title, placeholder }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
