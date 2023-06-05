import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { updateQuestionService, duplicateQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

type PropsType = {
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStateLoading, run: changeState } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const nav = useNavigate()
  const { confirm } = Modal

  // 复制

  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('操作成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  // 删除
  const [isDeleted, setIsDeleted] = useState(false)
  const { loading: deleteLoading, run: handleDelete } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('操作成功')
        setIsDeleted(true)
      },
    }
  )

  const del = () => {
    confirm({
      title: '确定删除吗？',
      icon: <DeleteOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        handleDelete()
      },
    })
  }

  if (isDeleted) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              loading={changeStateLoading}
              onClick={changeState}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="是否复制此问卷"
              cancelText="取消"
              okText="确认"
              onConfirm={handleDuplicate}
            >
              <Button type="text" icon={<CopyOutlined />} loading={duplicateLoading} size="small">
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              loading={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
