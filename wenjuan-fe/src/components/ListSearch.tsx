import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { Search } = Input
  const [value, setVal] = useState('')
  const handleSearch = (val: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value)
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setVal(curValue)
  }, [searchParams])
  return (
    <p>
      <Search
        value={value}
        onChange={handleChange}
        placeholder="请输入关键词"
        onSearch={handleSearch}
        style={{ width: '260px' }}
        allowClear
      />
    </p>
  )
}

export default ListSearch
