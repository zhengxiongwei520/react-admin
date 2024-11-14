import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { addTag } from "@/store/modules/tagSlice";
import { selectStoreMenus } from "@/store/modules/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import { treeToList } from "@/utils/utils";
import { debug } from "console";
console.log("hello");
const isLogin = () => {
  return Cookies.get("token") ? true : false;
};
const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const routes = useSelector(selectStoreMenus);
  useEffect(() => {
    let router = getCurrentRouter(routes, location.pathname);
    // console.log('进入了beforeeach的路由守卫', isLogin)
    if (!isLogin()) {
      return navigator("/login");
    }
    if (router?.title) {
      dispatch(addTag({ title: router.title, url: location.pathname }));
    }
  }, [location.pathname]);
  return children;
};

// 找到当前router
const getCurrentRouter = (routers: any[], path: string): any => {
  const routersList = treeToList(routers);
  return routersList.find((_) => _.path === path);
};

export default RouterBeforeEach;
