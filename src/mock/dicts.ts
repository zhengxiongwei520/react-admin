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

// interface 的对象， key 不能是泛型。


// const allDicts: { role: DictType[], city: DictType[]} = {xxx}

const allDicts: Dicts = {
  role: [
    {
      dictName: '管理员',
      dictValue: '1',
      dictCode: 'role',
    },
    {
      dictName: '测试',
      dictValue: '2',
      dictCode: 'role',
    },
  ],
  city: [
    {
      dictName: '厦门',
      dictValue: '1',
      dictCode: 'city',
    },
    {
      dictName: '成都',
      dictValue: '2',
      dictCode: 'city',
    },
  ],
  menuStatus: [
    {
      dictName: '启用',
      dictValue: '1',
      dictCode: 'menuStatus',
    },
    {
      dictName: '停用',
      dictValue: '2',
      dictCode: 'menuStatus',
    },
  ]
}

const mock: Array<MockMethod> = [
  {
    url: '/dictDetail',
    method: 'get',
    response: ({ query }) => {
      const code = query.dictCode
      return {
        code: 200,
        data: {
          dicts: allDicts[code] || []
        }
      }
    }
  },
]

export default mock