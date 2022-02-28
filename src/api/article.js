import request from "@/util/request"

//定义获取文章推荐列表的函数
export const getArticle= params =>{
    return request({
        url:"/v1_0/articles",
        method:"GET",
        params
    })
}

//定义获取文章详情
export const getArticleById= articleId =>{
    return request({
        url:`/v1_0/articles/${articleId}`,
        method:"GET",
    })
}

