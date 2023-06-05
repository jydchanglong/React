import React, { FC } from 'react'
import { QuestionCheckboxPropsType, OptionType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list, onChange, disabled } = props
  const [form] = Form.useForm()

  function handleChange() {
    if (onChange == null) return
    const newVal = form.getFieldsValue() as QuestionCheckboxPropsType
    if (newVal.list) {
      newVal.list = newVal.list.filter(opt => !(opt.text == null))
    }
    const { list = [] } = newVal
    list.forEach(item => {
      if (item.value) return
      item.value = nanoid(5)
    })
    onChange && onChange(newVal)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input />
      </Form.Item>

      <Form.List name="list">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, index) => {
              return (
                <Space key={key} align="baseline">
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox>选中</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, text) => {
                          const { list = [] } = form.getFieldsValue()
                          let num = 0
                          list.forEach((opt: OptionType) => {
                            if (opt.text === text) num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject(new Error('选项重复了'))
                        },
                      },
                    ]}
                  >
                    <Input placeholder="输入选项文字..." />
                  </Form.Item>
                  {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              )
            })}
            <Form.Item>
              <Button
                type="link"
                onClick={() => add({ text: '', value: '', checked: false })}
                icon={<PlusOutlined />}
                block
              >
                添加选项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
