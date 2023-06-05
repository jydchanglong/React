import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import styles from './Logo.module.scss'
import { LOGIN_PATHNAME } from '../router/index'
import { UserOutlined } from '@ant-design/icons'
// import { useRequest } from 'ahooks'
// import { getUserInfoService } from '../service/user'
import { Button, Space, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserinfo from '../hooks/useGetUserinfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const { username, nickname } = useGetUserinfo()
  const dispatch = useDispatch()
  // const { data = {} } = useRequest(getUserInfoService)
  // const { username, nickname } = data
  const nav = useNavigate()

  function logout() {
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    nav('/login')
  }

  const UserInfo = (
    <Space>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button onClick={logout}>退出</Button>
    </Space>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
