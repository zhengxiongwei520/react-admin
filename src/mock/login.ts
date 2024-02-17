import Mock from 'mockjs'
import { MockMethod } from "vite-plugin-mock"

export interface DictType {
  dictName: string,
  dictValue: string,
  dictCode: string
}

interface Dicts {
  [index: string]: DictType[]
}

const loginList = [
  {
    id: 123,
    userName: 'admin',
    userPassword: '123456',
    role: '1',
    city: '1'
  }
]

const mock: Array<MockMethod> = [
  {
    url: '/userLogin',
    method: 'post',
    response: ({ body }) => {
      const res = body.data
      const index = loginList.findIndex(e => e.userName === res.userName && e.userPassword === res.userPassword)
      if (index !== -1) {
        return {
          code: 200,
          data: {},
          msg: '登录成功！'
        }
      } else {
        return {
          code: 400,
          data: {},
          msg: '账号密码对不上~'
        }
      }
    }
  },
  {
    url: '/userRegi',
    method: 'post',
    response: ({ body }) => {
      const res = body.data
      const index = loginList.findIndex(e => e.userName === res.userName)
      if (index === -1) {
        loginList.push({
          id: new Date().getTime(),
          userName: res.userName,
          userPassword: res.userPassword,
          role: '1',
          city: '1'
        })
        return {
          code: 200,
          data: {},
          msg: '注册成功！'
        }
      } else {
        return {
          code: 400,
          data: {},
          msg: '注册失败，可能是账号重复，尝试后仍不可注册请联系管理员~'
        }
      }
    }
  },
]

export default mock