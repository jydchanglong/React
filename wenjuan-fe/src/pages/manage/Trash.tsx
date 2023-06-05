import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Table, Tag, Button, Space, Modal, message, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'

import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionService } from '../../service/question'

const { Title } = Typography
const { confirm } = Modal

const List: FC = () => {
  useTitle('在线问卷 - 回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectIds, setSelectIds] = useState<string[]>([])
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 删除
  const { run: handleDel } = useRequest(async () => await deleteQuestionService(selectIds), {
    manual: true,
    debounceWait: 500,
    onSuccess() {
      message.success('操作成功')
      refresh()
      setSelectIds([])
    },
  })
  const del = () => {
    confirm({
      title: '确认删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDel()
      },
    })
  }

  // 恢复
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('操作成功')
        refresh()
        setSelectIds([])
      },
    }
  )

  const TableElem = (
    <>
      <div>
        <Space>
          <Button
            type="primary"
            disabled={selectIds.length === 0}
            loading={recoverLoading}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger onClick={del} disabled={selectIds.length === 0}>
            删除
          </Button>
        </Space>
      </div>

      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRawKeys => {
            setSelectIds(selectedRawKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default List
