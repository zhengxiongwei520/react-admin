import React, { useState, useEffect, useMemo } from "react";
import "reset-css";
import { useRoutes } from "react-router-dom";
import routes from "@/router";
import RouterBeforeEach from "./router/RouterBeforeEach";
import store from "@/store";
import { Provider } from "react-redux";
import { menuList as getMenuList } from "@/api/menu";
import { handleMenus } from "@/router/lazyLoad";
import { setMenus as setStoreMenus } from "@/store/modules/menuSlice";
const App: React.FC = () => {
  const [menus, setMenus] = useState<any>([]);
  useEffect(() => {
    getMenuList().then((res) => {
      const result = handleMenus(res.menus);
      result.forEach((route) => {
        routes.push(route);
      });
      setMenus(routes);
      setStoreMenus(routes);
    });
  }, []);

  const outlet = useRoutes(menus);
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <RouterBeforeEach>{outlet}</RouterBeforeEach>
        </Provider>
      </React.Suspense>
    </div>
  );
};

export default App;
