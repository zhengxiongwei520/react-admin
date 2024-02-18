import React, { useEffect } from "react";
import { Button } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import './index.scss'

interface TagProps {
  children?: React.ReactNode,
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tagClick?: () => void;
  canClose?: boolean
  // url是用来判断是否当前路由
  url: string
}

const Tag: React.FC<TagProps> = (props) => {
  const location = useLocation()
  const pathname = location.pathname
  // console.log(props, props.url, pathname, 'props.keyprops.keyprops.key')

  return (
    <div className={['tag', props.url === pathname ? 'active' : ''].join(' ')} onClick={props.tagClick}>
      {props.children}
      {props.canClose
        ?
        <span className="close-icon" onClick={props.onClose}>
          <CloseOutlined />
        </span>
        :
        <></>}
    </div>
  )
}

Tag.defaultProps = {
  canClose: true
}
export default Tag