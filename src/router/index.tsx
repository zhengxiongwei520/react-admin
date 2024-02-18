import React, { lazy } from 'react'
import { MenuType } from '@/types/menu'
import { menuList as getMenuList } from '@/api/menu'
import { Navigate } from 'react-router-dom'
import path from 'path'
const Home = lazy(() => import("@/views/Home"))
const About = lazy(() => import("@/views/About"))
const Login = lazy(() => import("@/views/Login"))
const Button = lazy(() => import("@/views/Button"))
const Layout = lazy(() => import("@/components/Layout"))
// const User = lazy(() => import("@/views/User"))
// const ButtonView = lazy(() => import("@/views/Button"))

// 有报错 需要添加懒加载模式 Loading组件
// const withLoadingComponent = (comp: JSX.Element) => {
//   <React.Suspense fallback={<div>Loading...</div>}>
//     {comp}
//   </React.Suspense>
// }

const lazyLoad = (eleUrl: string, folderName: string = 'views'): JSX.Element => {
  const Model = lazy(() => import(`../${folderName}/${eleUrl}`))
  // console.log(Model, 'model')
  return <Model />
}

let menusList: MenuType[] = []
async function fetchMenuList(): Promise<{ menus: MenuType[] }> {
  const res = await getMenuList()
  // console.log(res, ' rerererererer')
  menusList = res.menus
  return res.menus
}
await fetchMenuList()

interface RouteType {
  path: string
  element: JSX.Element,
  children: RouteType[]
}

function handleMenus(menusList: MenuType[]): RouteType[] {
  return menusList.map(e => ({
    path: e.url,
    title: e.title,
    element: e.element === 'Layout' ? lazyLoad(e.element || '', 'components') : lazyLoad(e.element || ''),
    children: e?.children.length > 0
      ? handleMenus(e.children)
      : [],
  }))
}
const asyncRoutes: RouteType[] = handleMenus(menusList)

const constantRoutes = [
  {
    path: "/",
    element: <Navigate to="/system/userCenter" />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: '/login',
    element: <Login />
  }
]

const routes = [...constantRoutes, ...asyncRoutes]
export default routes

