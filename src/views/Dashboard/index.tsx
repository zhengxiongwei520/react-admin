import React, { useState } from "react"
import './index.scss'
import { Card, Tag } from 'antd'


const Dashboard: React.FC = () => {
  const tags = [
    'React 18.x',
    'Vite 4.x',
    'reduxjs/toolkit 2.x',
    'react-router-dom 6.x',
    'Typescript',
  ].map(v => {
    return (
      <Tag color="#108ee9">
        {v}
      </Tag>
    )
  })

  return (
    <div>
      <Card>
        恭喜你成功登陆~欢迎你
      </Card>
      {/* <Card title="时间格式化" style={{marginTop: '32px'}} bordered={false}>
        做一个时间格式化
        模仿对象是day.js

      </Card> */}
      <Card title="项目介绍" style={{ marginTop: '32px' }} bordered={false}>
        <div>技术栈</div>
        <div style={{ marginTop: '32px' }}>
          {...tags}
        </div>
        <div style={{ marginTop: '32px' }}>
          <p>
            使用 React 相关技术栈，本地模拟数据的后台项目
          </p>
          主要是为了熟悉react相关的开发流程 采用的是函数组件JSX
          <p>
            会逐渐添加新功能和开发
          </p>
        </div>
      </Card>

    </div>
    // <div className="dashboard">
    //   <div className="card">
    //     asdas
    //   </div>
    // </div>
  )
}
export default Dashboard