import request from '@/request/index.js'
import { menulistParamsType, handleMenuStatusParamsType, MenuType } from '@/types/menu'

export const menuListPage = (params?: menulistParamsType): Promise<any> =>
  request.get("/getMenuListPage", { params });

export const menuList = (): Promise<any> =>
  request.get("/menuList");

export const handleMenuStatus = (data: handleMenuStatusParamsType): Promise<any> =>
  request.post("/handleMenuStatus", { data });

export const addMenu = (data: Exclude<MenuType, "chidlren">): Promise<any> =>
  request.post("/addMenu", { data });

export const editMenu = (data: Exclude<MenuType, "chidlren">): Promise<any> =>
  request.post("/editMenu", { data });


