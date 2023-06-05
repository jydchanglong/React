import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../service/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const {
      title = '',
      desc = '',
      css = '',
      js = '',
      isPublished = false,
      componentList = [],
    } = data

    let selectedId = ''
    // 默认选中第一个
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    // 把 pageInfo 存到 store 中
    dispatch(resetPageInfo({ title, desc, css, js, isPublished }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])
  return {
    loading,
    error,
  }
}

export default useLoadQuestionData
