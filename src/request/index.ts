import { useState, useEffect, useRef } from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  // CancelTokenSource,
  // Canceler,
} from 'axios';
import { message as Message } from 'antd'
import { ResponseType } from '@/types/request'

const timeout = 30 * 1000
const baseURL = process.env.NODE_ENV === 'development' ? '' : ''
const service = axios.create({
  timeout,
  baseURL,
  // 如果需要携带cookie
  withCredentials: true
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {

    return config
  },
  error => {
    // console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response: AxiosResponse<ResponseType>) {
    // 对响应数据做点什么
    // console.log("response:", response);
    const { code, data, msg } = response.data;
    // config设置responseType为blob 处理文件下载

    if (response.data instanceof Blob) {
      // return downloadFile(response);
    } else {
      // console.log(data, 'datatatatat')
      if (code === 200) {
        return data;
      }
      else if (code === 401) {
        // jumpLogin();
      } else {
        // console.log(msg, 'msg')
        Message.error(msg);
        return Promise.reject(response.data);
      }
    }
  },
  function (error) {
    // 对响应错误做点什么
    // console.log("error-response:", error.response);
    // console.log("error-config:", error.config);
    // console.log("error-request:", error.request);
    const { loading = true } = error.config;
    if (error.response) {
      if (error.response.status === 401) {
        // jumpLogin();
      }
    }
    Message.error(error?.response?.data?.msg || "服务端异常");
    return Promise.reject(error);
  }
)

// axios返回格式
interface axisoTypes<T> {
  data: T,
  status: number,
  statusText: string
}

// 后台响应数据格式
interface responseTypes<T> {
  code: number,
  msg: string,
  result: T
}



console.log(baseURL)
// interface useAxiosConfig extends AxiosRequestConfig {
//   cancelable?: boolean
// }
export default service