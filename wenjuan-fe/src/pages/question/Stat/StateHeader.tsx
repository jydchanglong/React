import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, Popover, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import type { InputRef } from 'antd'
import QRCode from 'qrcode.react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
const { Title } = Typography

const StateHeander: FC = () => {
  const nav = useNavigate()

  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const urlRef = useRef<InputRef>(null)

  function copy() {
    const elem = urlRef.current
    if (!elem) return
    elem.select() // 选中 input
    document.execCommand('copy')
    message.success('拷贝成功！')
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return
    // 拼接 C 端路径
    const url = `http://localhost:3000/question/${id}`

    const genQrCode = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} shape="circle" onClick={copy} />
        </Tooltip>
        <Popover placement="bottom" content={genQrCode}>
          <Button icon={<QrcodeOutlined />} shape="circle"></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StateHeander
