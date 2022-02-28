/**
 * 评论相关请求
 */

 import request from "@/util/request"

/**
 * 请求评论
 */
export const getComments = params =>{
    return request({
        url:'/v1_0/comments',
        method:'GET',
        params
    })
}

/**
 * 点赞文章评论
 */
export const addCommentLike=target=>{
    return request({
        url:'/v1_0/comment/likings',
        method:'POST',
        data:{
            target
        }
    })
}

/**
 * 取消文章评论
 */
 export const cancelCommentLike=target=>{
    return request({
        url:`/v1_0/comment/likings/${target}`,
        method:'DELETE',
    })
}

/**
 * 发布评论
 */
 export const postComment=data=>{
    return request({
        url:'/v1_0/comments',
        method:'POST',
        data
    })
}
