import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
import axios from 'axios'
import '../_mock/index.ts'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    // axios.get('/api/test').then(data => console.log(data))
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className={styles.container}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
      <div className={styles.info}>
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
