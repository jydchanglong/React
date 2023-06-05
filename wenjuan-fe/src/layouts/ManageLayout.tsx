import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { createQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  console.log('pathname: ', pathname)
  const [createLoading, setCreateLoading] = useState(false)

  // async function handleCreateClick() {
  //   // setCreateLoading(true)
  //   // const data = await createQuestionService()
  //   // const { id } = data || {}
  //   // if (id) {
  //   //   nav(`/question/edit/${id}`)
  //   //   message.success('创建成功！')
  //   // }
  //   // setCreateLoading(false)
  // }

  const {
    loading,
    run: handleCreateClick,
    error,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功！')
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={handleCreateClick}
          >
            新建问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
