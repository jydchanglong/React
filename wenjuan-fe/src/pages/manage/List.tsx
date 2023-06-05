import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../service/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'

const { Title } = Typography

const List: FC = () => {
  useTitle('在线问卷 - 我的问卷')
  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)

  // useEffect(() => {
  //   async function load() {
  //     const { list, total } = await getQuestionListService()
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  const [started, setStarted] = useState(false)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const hasMoreList = total > list.length

  const [useParam] = useSearchParams()
  const keyword = useParam.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result)
        const { list: l = [], total: t = 0 } = result
        setList(list.concat(l))
        setTotal(t)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return
      const eleRec = ele.getBoundingClientRect()
      if (eleRec == null) return
      const { bottom } = eleRec
      console.log('load more ...', bottom)
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [useParam])

  useEffect(() => {
    if (hasMoreList) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [useParam, hasMoreList])

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!hasMoreList) return <span>没有更多数据了...</span>
    return <span>开始加载下一页...</span>
  }, [started, loading, hasMoreList])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
