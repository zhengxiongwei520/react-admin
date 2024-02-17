import React from "react";
import { Dropdown, Button, message, Modal } from "antd";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import type { MenuProps } from 'antd';
import './index.scss'


const UserInfo: React.FC = () => {
  const navTo = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人信息'
    },
    {
      key: '2',
      label: '退出登录'
    },
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      message.info('哈哈哈哈 没写')
    }
    if (key === '2') {
      Modal.confirm({
        title: '退出登录',
        content: '你个比真的要退出吗？？？？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          Cookies.set('token', '')
          navTo('/login')
        },
      })
    }
  }
  return (
    <div className="userinfo">
      <div className="user-tools">
        
      </div>
      <Dropdown menu={{ items, onClick }} placement="bottomLeft" trigger={['click']}>
        <div className="user">
          <div className="avatar">
            <img src="" alt="" />
          </div>
          <div className="name">admin</div>
        </div>
      </Dropdown>
    </div>

  )
}
export default UserInfo