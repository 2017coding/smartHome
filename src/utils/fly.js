import Fly from 'flyio'
import {
  getToken
} from '@/utils/storage'

const fly = new Fly()

// 实例级配置
fly.config.timeout = 5000

// 配置请求基地址
fly.config.baseURL = 'http://120.79.150.92:9527/'

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  if (getToken()) {
    request.headers['Authorization'] = getToken()
  }
    // 打印出请求体
    // console.log(request.body)
    // 终止请求
    // var err=new Error("xxx")
    // err.request=request
    // return Promise.reject(new Error(""))
  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    // 只将请求结果的data字段返回
    return promise.resolve(response.data)
  },
  (e, promise) => {
    return promise.resolve()
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  }
)

export default fly
