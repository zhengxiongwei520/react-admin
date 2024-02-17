// const Mock = require('mockjs')
import Mock from 'mockjs'
import menu from "./menu"
import { param2Obj } from '@/utils'

export const mocks = [
  ...menu,
]

// 用于正面模拟
// 请谨慎使用，它将重新定义XMLHttpRequest，
// 这将导致许多第三方库失效（如progress事件）。
export function mockXHR() {
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || i.type || 'get' || 'post', XHR2ExpressReqWrap(i.response))
  }
}
  