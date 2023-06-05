import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNeedLogin } from '../router'
import { useEffect } from 'react'
import useGetUserinfo from './useGetUserinfo'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserinfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    // 已登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录
    if (isNeedLogin(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, pathname, username])
}

export default useNavPage
