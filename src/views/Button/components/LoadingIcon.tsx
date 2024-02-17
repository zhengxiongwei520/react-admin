import React from "react"
import {
  LoadingOutlined
} from '@ant-design/icons';

interface LoadingIconPorps {

}

const LoadingIcon: React.FC<LoadingIconPorps> = function () {
  return (
    <>
      <LoadingOutlined></LoadingOutlined>
    </>
  )
}
export default LoadingIcon