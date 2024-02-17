import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import routes from '@/router';
import Cookies from 'js-cookie'

const isLogin = () => {
  return Cookies.get('token') ? true : false
}

const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation();
  const navigator = useNavigate()
  useEffect(() => {
    let router = getCurrentRouterMap(routes, location.pathname)
    // if (!isLogin && router.auth) {
    // 在这里进行权限限制
    // console.log('进入了beforeeach的路由守卫', isLogin)
    if (!isLogin()) {
      navigator('/login')
    }
  }, [location.pathname]);
  return children
}

// const getCurrentRouterMap = (routers: Router[], path: string): Route => {
const getCurrentRouterMap = (routers: any[], path: string): any => {
  for (let router of routers) {
    if (router.path == path) return router;
    if (router.child) {
      const childRouter = getCurrentRouterMap(router.child, path)
      if (childRouter) return childRouter;
    }
  }
  return routes[routes.length - 1]
}

export default RouterBeforeEach
