import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 icode
    config.headers.icode = 'AD50C3E9AF4E2C24'
    // 必须返回 config
    return config
  }
)

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
  ElMessage.error(err.message)
  return Promise.reject(new Error(err))
})

export default service