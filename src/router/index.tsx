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
const Dashboard = lazy(() => import("@/views/Dashboard"))
// const User = lazy(() => import("@/views/User"))
// const ButtonView = lazy(() => import("@/views/Button"))

// 有报错 需要添加懒加载模式 Loading组件
// const withLoadingComponent = (comp: JSX.Element) => {
//   <React.Suspense fallback={<div>Loading...</div>}>
//     {comp}
//   </React.Suspense>
// }

const lazyLoad = (eleUrl: string, folderName: string = 'views', needLayout: boolean = false): JSX.Element => {
  const Model = lazy(() => import(`../${folderName}/${eleUrl}`))
  return (
    <>
      {needLayout
        ?
        <Layout>
          <Model></Model>
        </Layout>
        :
        <Model></Model>}
    </>
  )
}

let menusList: MenuType[] = []
async function fetchMenuList(): Promise<{ menus: MenuType[] }> {
  const res = await getMenuList()
  menusList = res.menus
  return res.menus
}
await fetchMenuList()

interface RouteType {
  path: string
  element: JSX.Element,
  children: RouteType[]
}

// 需要layout但是element不是layout的组件
const needLayout = [
  'Dashboard'
]
{/* <Layout>
  
  <Layout/> */}
function handleMenus(menusList: MenuType[]): RouteType[] {
  return menusList.map(e => {
    const index = needLayout.findIndex(_ => _ === e.element)
    return {
      path: e.url,
      title: e.title,
      // element: e.element === 'Layout' ? lazyLoad(e.element || '', 'components') : lazyLoad(e.element || ''),
      element: index !== -1
        ? lazyLoad(needLayout[index], 'views', true)
        : e.element === 'Layout'
          ? lazyLoad(e.element || '', 'components')
          : lazyLoad(e.element || ''),
      children: e?.children.length > 0
        ? handleMenus(e.children)
        : [],
    }
  })
}
const asyncRoutes: RouteType[] = handleMenus(menusList)

const constantRoutes = [
  {
    path: "/",
    element: <Navigate to="/system/userCenter" />
  },
  // {
  //   path: "/dashboard",
  //   element: <Layout>
  //     <Dashboard></Dashboard>
  //   </Layout>
  // },
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
console.log(routes, 'routeeeeeeeeeesssssss')
export default routes

