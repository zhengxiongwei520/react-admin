import React, { useState } from "react"
import { Breadcrumb } from 'antd';
import { useLocation } from "react-router-dom";
import { treeToList, listToTree } from '@/utils/utils'

// 获取菜单列表
import { MenuType } from '@/types/menu'
import { menuList as getMenuList, menuList } from '@/api/menu'
let menusList: MenuType[] = []
async function fetchMenuList(): Promise<{ menus: MenuType[] }> {
  const res = await getMenuList()
  menusList = treeToList(res.menus)
  return res.menus
}
await fetchMenuList()


const View: React.FC = () => {
  const location = useLocation()
  // 根据/system/userCenter找到 /system和/system/userCenter对应的中文名
  // console.log(location, '面包屑的')
  const pathname = location.pathname
  const pathslit = pathname.split('/').filter(e => e)  // [system, userCenter]
  const breads = pathslit.map((_, i) => {
    const url = `/${pathslit.slice(0, i + 1).join('/')}`
    const index = menusList.findIndex(e => e.url === url)
    const title = menusList[index].title
    return (
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
    )
  })
  // console.log(breads)
  menusList.filter(e => {
    e.url
  })
  return (
    <>
      <Breadcrumb style={{ marginLeft: '0' }}>
        {...breads}
      </Breadcrumb>
    </>
  )
}

export default View