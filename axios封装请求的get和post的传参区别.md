### get 请求传参数，是对象里边在嵌套一个params对象

axios.get('/user',{
    params: {
        userId:1234
    }
}).then(res =>{
    console.log(res)
})
### post 请求传参数，参数直接是一个对象
axios.post('/user',{
    userName:'zhangsan'，
    userId:123456
}).then(res =>{
    console.log(res)
})


### 区别
get上传参数axios.get(’/user’, params: { ID: 12345})
post上传参数axios.post(’/user’, { firstName: ‘Fred’})
