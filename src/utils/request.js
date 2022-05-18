import axios from 'axios'
import router from '@/router'

const request = axios.create()

// 映射
const actionMapping = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}

// request.defaults.baseURL = 'http://127.0.0.1:7001' // 注释掉之后调的接口将是Mock数据

// 请求拦截器
request.interceptors.request.use(req => {
  // console.log(req.url)
  // console.log(req.method)
  if (req.url !== '/login' && req.url !== '/roles') {
    // 不是登录的请求 也不是获取权限的请求 则在请求头中加入token  不知道如何使用Mock来验证请求头中的token 故此处注释
    // req.headers.Authorization = sessionStorage.getItem('token')
    const action = actionMapping[req.method]
    // 判断非权限范围内的请求
    // console.log(router)
    const currentRight = router.currentRoute.meta
    // console.log(currentRight)
    if (currentRight && currentRight.indexOf(action) === -1) {
      // 没有权限
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return req
})

// 响应拦截器
request.interceptors.response.use(res => {
  // console.log(res)
  if (res.data.status === 401) {
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  return res
})

export default request
