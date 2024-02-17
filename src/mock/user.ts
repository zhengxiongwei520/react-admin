import Mock from 'mockjs'
import { MockMethod } from "vite-plugin-mock"
const Random = Mock.Random
import { UserType } from '@/types/user'

function fetchUserList(): UserType[] {
  const list = []
  for (let index = 0; index < 25; index++) {
    list.push({
      id: Random.id(),
      userName: Random.cname(),
      userPassword: '123456',
      ...Mock.mock({
        'role|1': ['1', '2'],
        'city|1': ['1', '2'],
      })
    })
  }
  return list
}
const list = fetchUserList()


const mock: Array<MockMethod> = [
  {
    url: '/userList',
    method: 'get',
    response: ({ query }) => {
      const { pageNum, pageSize, keyword, role, city } = query
      const filterList = list.filter(e => {
        // console.log(e?.userName.includes(keyword))
        return (!role ? true : e.role === role)
          &&
          e?.city?.includes(city ? city : '')
          &&
          e?.userName.includes(keyword)
      }
      )
      // 第一页 10 
      const lastList = filterList.slice(
        (pageNum - 1) * pageSize,
        pageNum * pageSize
      )
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
    url: '/delUser',
    method: 'post',
    response: ({ body }) => {
      const { data } = body
      const index = list.findIndex(e => {
        return e.id == data.userId
      })
      // console.log(index)
      if (index !== -1) {
        list.splice(index, 1)
        return {
          code: 200,
          data: null,
          msg: '删除成功'
        }
      } else {
        return {
          code: 500,
          data: null,
          msg: '接口调用出错！'
        }
      }
    }
  },
  {
    url: '/updateUser',
    method: 'post',
    response: ({ body }) => {
      const { data } = body
      const index = list.findIndex(e => e.id === data.id)
      if (index !== -1) {
        list[index] = {
          ...list[index],
          ...data
        }
        return {
          code: 200,
          data: null,
          msg: '更新成功'
        }
      } else {
        return {
          code: 500,
          data: null,
          msg: '接口调用出错！'
        }
      }
    }
  },
  {
    url: '/addUser',
    method: 'post',
    response: ({ body }) => {
      const { data } = body
      data.id = new Date().getTime()
      list.push(data)

      return {
        code: 200,
        data: null,
        msg: '新增成功'
      }
    }
  },
]

export default mock