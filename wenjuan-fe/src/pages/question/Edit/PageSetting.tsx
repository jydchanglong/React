import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValueChange() {
    const newVal = form.getFieldsValue()
    dispatch(resetPageInfo(newVal))
  }

  return (
    <Form layout="vertical" form={form} initialValues={pageInfo} onChange={handleValueChange}>
      <Form.Item label="页面标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="请输入描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入css" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入js" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
