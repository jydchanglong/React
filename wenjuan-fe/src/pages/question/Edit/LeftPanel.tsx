import React, { FC } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: (
        <div>
          <ComponentLib />
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: (
        <div>
          <Layers />
        </div>
      ),
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default LeftPanel
