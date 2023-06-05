import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { loginService } from '../service/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  const { username, password } = getUserInfoFromStorage()
  const nav = useNavigate()

  const { run, loading } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    const { username, password } = values
    run(username, password)

    if (values.remember) {
      console.log('记住')
      rememberUser(values.username, values.password)
    } else {
      console.log('忘记')
      deleteUserFromStorage()
    }
  }
  useEffect(() => {
    form.setFieldsValue({ username, password })
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '用户名必填' },
              { type: 'string', min: 5, max: 20, message: '字符长度 5 - 20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码必填' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
