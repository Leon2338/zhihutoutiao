//导入axios模块
import axios from "axios"
import store from "@/store"
import JSONBig from 'json-bigint'

const request = axios.create({
    baseURL:"http://toutiao.itheima.net",
    
    transformResponse:[function(data){
        try{
            return JSONBig.parse(data)
        }catch(err){
            return data
        }
    }]
}) 

// 使用请求拦截器
// use(两个参数)
request.interceptors.request.use(req => {
    // 在发送请求前要做的事儿
    //获取token的值
    const {user} = store.state
    //设置header值，即token的值
    if(user && user.token){
        req.headers.Authorization=`Bearer ${user.token}`
    }
    // console.log(req);   
    return req
}, err => {
    // 在请求错误时要做的事儿

    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err)
})
export default request 