import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, error => Promise.reject(error))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})
export default http