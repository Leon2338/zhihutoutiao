import request from "@/util/request"
import store from "@/store"

export const login  = (data)=>{
    return request({
        method:"POST",
        url:"/v1_0/authorizations",
        data
    })
}

export const sendSms  = (mobile)=>{
    return request({
        method:"GET",
        url:`/v1_0/sms/codes/${mobile}`
    })
}
//获取用户信息
export const getUserInfo = ()=>{
    return request({
        method:'GET',
        url:"/v1_0/user",
        // 配置了请求拦截器，不需要这个了
        // headers:{
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

//获取文章分类
export const getChannels=()=>{
    return request({
        url:"/v1_0/user/channels",
    })
}

//定义获取全部channel的函数
export const getAllChannels= ()=>{
    return request({
        url:"/v1_0/channels"
    })
}
//添加用户频道
export const addUserChannel = channel =>{
    return request({
        method:'PATCH',
        url:'/v1_0/user/channels',
        data:{
            channels:[channel]
        }
    })
}
//删除用户频道
export const deleteUserChannel = channelId =>{
    return request({
        method:'delete',
        url:`/v1_0/user/channels/${channelId}`,

    })
}

/**
 * 关注用户
 */
export const addFollow = target =>{
    return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target
        }
    })
}

 /**
 * 取消关注用户
 */
export const cancelFollow = target =>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
    })
}


/**
 * 收藏文章
 */

export const collect = target=>{
    return request({
        method:'POST',
        url:'/v1_0/article/collections',
        data:{
            target 
        }
    })
}

/**
 * 取消收藏文章
 */

 export const uncollect = target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${target}`
    })
}


/**
 * 为文章点赞
 */

 export const like = target=>{
    return request({
        method:'POST',
        url:`/v1_0/article/likings`,
        data:{
            target
        }
    })
}

/**
 * 取消文章点赞
 */

 export const unlike = target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${target}`,
    })
}


/**
 * 获取个人信息
 */
export const getProfile= ()=>{
    return request({
        url:'/v1_0/user/profile',
        method:'GET'
    })
}

/**
 * 修改个人信息
 */
export const updateProfile = (data)=>{
    return request({
        url:'/v1_0/user/profile',
        method:'PATCH',
        data
    })
}

/**
 * 上传头像文件
 */
export const updateAvatar = (data)=>{
    return request({
        url:'/v1_0/user/photo',
        method:'PATCH',
        data
    })
}