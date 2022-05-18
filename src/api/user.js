import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 获取用户权限
export const getRoles = data => {
  return request({
    url: '/roles',
    method: 'POST',
    data
  })
}
