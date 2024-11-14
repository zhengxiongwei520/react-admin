import Mock from 'mockjs'
import { MockMethod } from "vite-plugin-mock"
import { treeToList, listToTree } from '@/utils/utils'
import { MenuType } from '@/types/menu'

let menuTree: Array<MenuType> = [
  {
    title: '首页',
    id: '4',
    url: '/dashboard',
    element: 'Dashboard',
    status: '1',
    parentId: '0',
    parentName: '',
    role: '1,2',
    children: [
      
    ]
  }, {
    title: '系统管理',
    id: '1',
    url: '/system',
    element: 'Layout',
    status: '1',
    parentId: '0',
    parentName: '',
    role: '1,2',
    children: [
      {
        title: '用户中心',
        id: '1-1',
        url: '/system/userCenter',
        children: [],
        element: 'User',
        status: '1',
        parentId: '1',
        parentName: '系统管理',
        role: '1,2',
      },
      {
        title: '菜单管理',
        id: '1-2',
        url: '/system/menu',
        children: [],
        element: 'Menu',
        status: '1',
        parentId: '1',
        parentName: '系统管理',
        role: '1,2',
      },
      {
        title: '测试路由',
        id: '1-3',
        url: '/system/test',
        children: [
          {
            title: '下级1',
            id: '1-3-1',
            url: '/system/test1',
            children: [],
            element: 'Menu',
            status: '1',
            parentId: '1-3',
            parentName: '测试路由',
            role: '1,2',
          },
        ],
        element: 'Menu',
        status: '1',
        parentId: '1',
        parentName: '系统管理',
        role: '1,2',
      },
    ]
  },
  {
    title: '组件',
    id: '2',
    url: '/comp',
    element: 'Layout',
    status: '1',
    parentId: '0',
    parentName: '',
    role: '1,2',
    children: [
      {
        title: '按钮',
        id: '2-1',
        url: '/comp/button',
        children: [],
        element: 'Button',
        status: '1',
        parentId: '2',
        parentName: '组件',
        role: '1,2',
      },
      {
        title: '标签展开',
        id: '2-2',
        url: '/comp/expandAndShrink',
        children: [],
        element: 'ExpandAndShrink',
        status: '1',
        parentId: '2',
        parentName: '组件',
        role: '1,2',
      }
    ]
  }
]
let menuList = treeToList<MenuType>(menuTree)
const mock: Array<MockMethod> = [
  {
    url: '/menuList',
    method: 'get',
    response: ({ query }) => {
      // console.log(query)
      return {
        code: 200,
        msg: '获取成功',
        data: {
          menus: menuTree
        }
      }
    }
  },
  {
    url: '/getMenuListPage',
    method: 'get',
    response: ({ query }) => {
      const { pageNum, pageSize, menuname, parentId, status } = query
      const filterList = menuList.filter(e => {
        return parentId ? e?.id === parentId : true
          &&
          e?.status?.includes(status || '')
          &&
          e?.title.includes(menuname || '')
      }).map(e => ({ ...e, children: [] }))

      // 第一页 10 
      const lastList = listToTree<MenuType>(filterList, 'parentId').slice(
        (pageNum - 1) * pageSize,
        pageNum * pageSize
      )
      // console.log(filterList, 'filter')
      // console.log(lastList, 'lastList')
      return {
        code: 200,
        data: {
          list: lastList,
          total: filterList.length
        }
      }
    }
  },
  {
    url: '/handleMenuStatus',
    method: 'post',
    response: ({ body }) => {
      const { status, id } = body.data
      const index = menuList.findIndex(e => e.id === id)
      if (index !== - 1) {
        menuList[index].status = status
        menuTree = listToTree<MenuType>(menuList, 'parentId')
        menuList = treeToList<MenuType>(menuTree)
        return {
          code: 200,
          data: {},
          msg: '修改成功'
        }
      }
      return {
        code: 500,
        data: {},
        msg: '接口出错'
      }

    }
  },
  {
    url: '/addMenu',
    method: 'post',
    response: ({ body }) => {
      const { id, title, url, element, role, status, parentId } = body.data
      const menu: MenuType = {
        id: `${new Date().getTime()}`, title, url, element, role, status, parentId,
        parentName: '',
        children: []
      }

      menuList.push(menu)
      menuTree = listToTree<MenuType>(menuList, 'parentId')
      menuList = treeToList<MenuType>(menuTree)

      const index = menuList.findIndex(e => e.id === menu.id)
      if (index !== - 1) {
        return {
          code: 200,
          data: {},
          msg: '新增菜单成功'
        }
      }
      return {
        code: 500,
        data: {},
        msg: '接口出错'
      }

    }
  },
  {
    url: '/editMenu',
    method: 'post',
    response: ({ body }) => {
      const { id, title, url, element, role, status, parentId } = body.data
      const index = menuList.findIndex(e => e.id === id)
      const menu: MenuType = {
        id, title, url, element, role, status, parentId,
        parentName: '',
        children: []
      }
      if (index !== - 1) {
        menuList[index] = {
          ...menu,
          children: menuList[index].children
        }
        menuTree = listToTree<MenuType>(menuList, 'parentId')
        menuList = treeToList<MenuType>(menuTree)
        return {
          code: 200,
          data: {},
          msg: '编辑菜单成功'
        }
      }
      return {
        code: 500,
        data: {},
        msg: '接口出错'
      }

    }
  },
]

export default mock