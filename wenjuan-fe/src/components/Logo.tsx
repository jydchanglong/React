import React, { FC, useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import useGetUserinfo from '../hooks/useGetUserinfo'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserinfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    } else {
      setPathname(HOME_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>在线问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
