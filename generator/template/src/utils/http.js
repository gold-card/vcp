import axios from 'axios'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
})

http.interceptors.request.use(
  // 设置token示例
  (config) => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer' + localStorage.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    // 请求报错示例
    if (err.response.data.message) {
      console.error(err.response.data.message)
    }

    // 请求 401 示例
    if (err.response.status === 401) {
      router.push('/hello')
    }

    return Promise.reject(err)
  }
)

export default http
