import React, { useEffect, useState } from "react"
import { Menu } from 'antd';
import { menuList as getMenuList } from '@/api/menu'
import { useNavigate, useLocation } from 'react-router-dom'

import type { MenuProps } from 'antd';
import { MenuType } from '@/types/menu'

type MenuItem = Required<MenuProps>['items'][number];


// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

let menusList: MenuType[] = []
async function fetchMenuList(): Promise<{ menus: MenuType[] }> {
  const res = await getMenuList()
  menusList = res.menus
  return res.menus
}
await fetchMenuList()

function handleMenus(menusList: MenuType[]): MenuItem[] {
  return menusList.map(e => ({
    key: e?.url, icon: undefined, children: e?.children.length > 0
      ? handleMenus(e.children)
      : undefined, label: e?.title
  }))
}
const items = handleMenus(menusList)

const View: React.FC = () => {
  const location = useLocation()
  const [selectKeys, setSelectedKeys] = useState<string[]>([location.key])
  const [openKey, setOpenKey] = useState<string[]>([location.key])
  const navTo = useNavigate()
  const menuClick = (e) => {
    navTo(e.key)
  }
  const onOpenChange = (openKeys: string[]) => {
    setOpenKey(openKeys)
  }
  console.log(location.pathname, location, 'location')
  const key = location.pathname
  const lastIndex = key.lastIndexOf('/')
  const okey = key.slice(0, lastIndex)
  useEffect(() => {
    setSelectedKeys([okey, key])
    setOpenKey([okey])
  }, [key])
  return (
    <>
      <Menu theme="dark"
        selectedKeys={selectKeys}
        openKeys={openKey}
        mode="inline"
        onOpenChange={onOpenChange}
        items={items}
        onClick={menuClick} />
    </>
  )
}

export default View