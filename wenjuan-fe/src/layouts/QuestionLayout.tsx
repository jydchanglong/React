import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserinfo from '../hooks/useLoadUserinfo'
import useNavPage from '../hooks/useNavPage'
import { Spin } from 'antd'

function QuestionLayout() {
  // 加载用户信息
  const { waitingUserData } = useLoadUserinfo()
  useNavPage(waitingUserData)
  return <div style={{ height: '100vh' }}>{waitingUserData ? <Spin /> : <Outlet />}</div>
}

export default QuestionLayout
