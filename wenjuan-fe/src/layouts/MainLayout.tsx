import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserinfo from '../hooks/useLoadUserinfo'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

function MainLayout() {
  const { waitingUserData } = useLoadUserinfo()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
        <div></div>
      </Header>
      <Content className={styles.main}>{!waitingUserData && <Outlet />}</Content>
      <Footer className={styles.footer}>MainLayout Footer</Footer>
    </Layout>
  )
}

export default MainLayout
