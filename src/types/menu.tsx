export interface MenuType {
  id: string
  title: string
  url: string
  element?: string
  role?: string
  status?: string
  parentId?: string
  parentName?: string
  children: Array<MenuType> 
}

export interface menulistParamsType {
  menuname?: string | undefined
  pageNum: number
  pageSize: number
  parentId?: string
  status?: string
}

export interface handleMenuStatusParamsType {
  id: string
  status: string
}