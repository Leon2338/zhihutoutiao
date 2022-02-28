import request from "@/util/request"

//定义获取文章推荐列表的函数
export const getSuggestion= q =>{
    return request({
        url:"/v1_0/suggestion",
        method:"GET",
        params:{
            q
        }
    })
}

export const getSearchResult= params =>{
    return request({
        url:"/v1_0/search",
        method:"GET",
        params
    })
}
