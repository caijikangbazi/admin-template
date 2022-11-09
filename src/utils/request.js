import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeOut } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (isCheckTimeOut()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效,请重新登录'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 添加 icode
    config.headers.icode = 'AD50C3E9AF4E2C24'
    // 必须返回 config
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  const {
    success,
    data,
    message
  } = res.data
  // 需要判断当前请求是否成功
  if (success) {
    // 成功返回解析后的数据
    return data
  } else {
    // 失败(请求成功,与业务失败,消息提示)
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  if (err?.response?.data && err.response.data.code === 401) {
    store.dispatch('user/logout')
  }
  ElMessage.error(err.message)
  return Promise.reject(new Error(err))
})

export default service
