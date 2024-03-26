import axios from 'axios'
import { userLoginStore } from '@/stores/user'
import router from '@/router'

// 创建axios实例
const http = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// axios请求拦截器
http.interceptors.request.use(config => {
const userlogin = userLoginStore()
const token = userlogin.token


config.headers.Authorization = 'null'
//请求头携带token
if(token) {
  config.headers.Authorization = token
}



  return config
}, error => Promise.reject(error))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  const userlogin = userLoginStore()

  //401未登录或者Token失效需要重新登录
  if(e.response.status === 401){
    userlogin.clearToken()
    router.push('/login')
  }

  return Promise.reject(e)
})
export default http