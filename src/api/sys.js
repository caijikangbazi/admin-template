import request from '@/utils/request'

/***
 * 登录
 * return  promise
 */
export const login = data => {
  return request({
    url: 'sys/login',
    method: 'POST',
    data
  })
}

/**
 * 用户信息
 * @param data
 * @returns {*}
 */
export const getUserInfo = data => {
  return request({
    url: 'sys/profile',
    method: 'GET',
    data
  })
}
