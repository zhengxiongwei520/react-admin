import React, { useState } from "react"
import BearerButton from "./components"
import { Space } from "antd"
import { ButtonSize } from './components'

const ButtonView: React.FC = function (props) {
  const [size, setSize] = useState<ButtonSize>('lg')
  const [loading1, setLoading1] = useState<boolean>(true)
  const [loading2, setLoading2] = useState<boolean>(false)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading1(false)
    }, 3000)

  }, [])

  return (
    <>
      <div className="contetn-item">
        <h2>按钮类型</h2>
        <Space>
          <BearerButton type="primary">Primary BearerButton</BearerButton>
          <BearerButton>Default BearerButton</BearerButton>
          <BearerButton type="dashed">Dashed BearerButton</BearerButton>
          <BearerButton type="text">Text BearerButton</BearerButton>
          <BearerButton type="link">Link BearerButton</BearerButton>
        </Space>
      </div>

      <div className="contetn-item">
        <h2>改变尺寸</h2>
        <Space style={{ marginBottom: '20px' }}>
          <BearerButton onClick={e => setSize('lg')}>large-lg</BearerButton>
          <BearerButton onClick={e => setSize('md')}>middle-md</BearerButton>
          <BearerButton onClick={e => setSize('sm')}>small-sm</BearerButton>
        </Space>
        <div>
          <Space wrap>
            <BearerButton size={size} type="primary">primary</BearerButton>
            <BearerButton size={size}>default</BearerButton>
            <BearerButton size={size} type="dashed">dashed</BearerButton>
          </Space>
        </div>
      </div>

      <div className="contetn-item">
        <h2>加载中的按钮</h2>
        <Space>
          <BearerButton type="primary" loading>Primary BearerButton</BearerButton>
          <BearerButton loading>Default BearerButton</BearerButton>
          <BearerButton type="dashed" loading>Dashed BearerButton</BearerButton>
          <BearerButton type="text" loading={loading1}>Text BearerButton</BearerButton>
          <BearerButton type="link" loading={loading2} onClick={e => {
            setLoading2(true)
            setTimeout(() => {
              setLoading2(false)
            }, 6000)
          }}>Link BearerButton</BearerButton>
        </Space>
      </div>

      <div className="contetn-item">
        <h2>幽灵按钮 ghost button</h2>
        <Space>
          <BearerButton ghost type="primary">Primary BearerButton</BearerButton>
          <BearerButton ghost>Default BearerButton</BearerButton>
          <BearerButton ghost type="dashed">Dashed BearerButton</BearerButton>
        </Space>
      </div>

      <div className="contetn-item">
        <h2>警告按钮 danger button</h2>
        <Space>
          <BearerButton danger type="primary">Primary BearerButton</BearerButton>
          <BearerButton danger>Default BearerButton</BearerButton>
          <BearerButton danger type="dashed">Dashed BearerButton</BearerButton>
          <BearerButton danger type="text">Text BearerButton</BearerButton>
          <BearerButton danger type="link">Link BearerButton</BearerButton>
        </Space>
      </div>


      <div className="contetn-item">
        <h2>禁止按钮 disabled button</h2>
        <Space>
          <BearerButton disabled type="primary">Primary BearerButton</BearerButton>
          <BearerButton disabled>Default BearerButton</BearerButton>
          <BearerButton disabled type="dashed">Dashed BearerButton</BearerButton>
          <BearerButton disabled type="text">Text BearerButton</BearerButton>
          <BearerButton disabled type="link">Link BearerButton</BearerButton>
        </Space>
      </div>
    </>
  )
}

export default ButtonView