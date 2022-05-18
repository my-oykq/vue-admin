// 使用Mock
const Mock = require('mockjs')
Mock.setup({
  timeout: '500-1000'
})

// 用户信息
const users = [
  {
    id: 1,
    username: 'student',
    password: '123456',
    photo: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2667925509,1048662418&fm=11&gp=0.jpg',
    token: 'student-token',
    role: 'student',
    rights: []
  },
  {
    id: 2,
    username: 'admin',
    password: '123456',
    photo: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2364244149,3298797080&fm=26&gp=0.jpg',
    token: 'admin-token',
    role: 'admin',
    rights: []
  }
]

// 权限信息 将权限信息从用户信息中抽离出来 不同身份对应不同的路由信息
// 这样方便了后期的维护 否则以后每加一个页面就需要在每个用户信息中做更改 十分的不方便 如果用户多了更是增添了不必要的麻烦
// 将用户直接分为不同身份 然后对不同身份做处理 这样比较合理
const roles = {
  student: [
    {
      id: 1,
      authName: '基本页面',
      icon: 'el-icon-connection',
      children: [
        {
          id: 11,
          authName: '表格页面',
          icon: 'el-icon-s-grid',
          path: 'table',
          rights: ['view']
        },
        {
          id: 12,
          authName: '素材页面',
          icon: 'el-icon-s-marketing',
          path: 'image',
          rights: ['view']
        }
      ]
    }
  ],
  admin: [
    {
      id: 1,
      authName: '基本页面',
      icon: 'el-icon-connection',
      children: [
        {
          id: 11,
          authName: '表格页面',
          icon: 'el-icon-s-grid',
          path: 'table',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 12,
          authName: '素材页面',
          icon: 'el-icon-s-marketing',
          path: 'image',
          rights: ['view', 'edit', 'add', 'delete']
        }
      ]
    },
    {
      id: 2,
      authName: '用户权限',
      icon: 'el-icon-set-up',
      children: [
        {
          id: 21,
          authName: '权限页面',
          icon: 'el-icon-s-custom',
          path: 'users',
          rights: ['view', 'edit', 'add', 'delete']
        }
      ]
    }
  ]
}

// 表格信息
const tables = [{
  date: '2016-05-02',
  name: '王小虎',
  id:'0',
  state:'00',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  state:'01',
   id:'1',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  state:'01',
   id:'2',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  state:'02',
   id:'3',
  address: '上海市普陀区金沙江路 1516 弄'
}]

// 用户登录
Mock.mock('/login', 'post', option => {
  const { username, password } = JSON.parse(option.body)
  const user = users.find(item => {
    return item.username === username && item.password === password
  })
  return user
})

// 用户权限信息
Mock.mock('/roles', 'post', option => {
  return roles[option.body]
})

// 获取表格信息
Mock.mock('/tabledata', 'get', () => {
  // 这里是获取session中token 然后验证token是否正确 如果不正确则不返回数据
  const token = sessionStorage.getItem('token')
  // 由于这里是Mock数据 所以将用户的token在这里写死了 然后验证token是否正确
  if (token === 'admin-token' || token === 'student-token') {
    return tables
  } else {
    // 如果将session中token更改为错误的token 则展示这个信息
    alert('无效token')
    // 关闭弹出信息后返回401 之后通过响应拦截器跳转到登录页面
    return {
      status: 401
    }
  }
})

// 删除表格信息
Mock.mock('/tabledata', 'delete', option => {
  console.log(option)
  return {
    msg: '删除成功'
  }
})
