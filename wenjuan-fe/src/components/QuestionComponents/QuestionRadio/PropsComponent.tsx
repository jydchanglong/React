import React, { FC, useEffect } from 'react'
import { OptionType, QuestionRadioPropsType } from './interface'
import { Form, Input, Checkbox, Select, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropsComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  function handleChange() {
    if (onChange == null) return
    const newVal = form.getFieldsValue() as QuestionRadioPropsType
    if (newVal.options) {
      newVal.options = newVal.options.filter(opt => !(opt.text == null))
    }
    const { options = [] } = newVal
    options.forEach(item => {
      if (item.value) return
      item.value = nanoid(5)
    })
    onChange && onChange(newVal)
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleChange}
      initialValues={{ title }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
