import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import useGetUserinfo from './useGetUserinfo'
import { getUserInfoService } from '../service/user'
import { loginReducer } from '../store/userReducer'

function useLoadUserinfo() {
  const [waitingUserData, setWaitingUserData] = useState(false)
  const { username } = useGetUserinfo()
  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: result => {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserinfo
