import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Input, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolBar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../service/question'
const { Title } = Typography

const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const disptch = useDispatch()

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value.trim()
    if (!newVal) return
    disptch(changePageTitle(newVal))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleTitleChange}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存
const SaveButton: FC = () => {
  // pageInfo 和 componentList
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const {
    run: save,
    loading,
    error,
  } = useRequest(
    async () => {
      if (!id) return
      const res = await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功！')
      },
    }
  )

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button onClick={() => save()} loading={loading}>
      保存
    </Button>
  )
}

// 发布
const PublishButton: FC = () => {
  // pageInfo 和 componentList
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const nav = useNavigate()

  const {
    run: pub,
    loading,
    error,
  } = useRequest(
    async () => {
      if (!id) return
      const res = await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功！')
        nav('/question/stat/' + id)
      },
    }
  )

  return (
    <Button type="primary" onClick={() => pub()} loading={loading}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles['main']}>
          <EditToolbar />
        </div>
        <div className={styles['right']}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
