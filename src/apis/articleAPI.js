import http from '@/utils/http'
import Qs from 'qs'
export function getArticle() {
    return http({
        url:'/article'
    })
}

export function getArticleById(id) {
    return http({
        url:"/article/byid",
        params:id
    })
}
// 获取热点
export function getArticleHot(){
    return http({
        url:'/article/hot'
    })
}
// 获取头条
export function getArticleHeadline(){
    return http({
        url:'/article/headline'
    })
}


// 收藏
export function acollect(data){
    return http({
        url:'/acollect',
        method:'POST',
        data:Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//取消收藏

export function delacollect(data){
    return http({
        url:'/acollect',
        method:'DELETE',
        params:data
        // data:Qs.stringify(data),
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//是否已收藏
export function getIsCollect(data){
    return http({
        url:'/acollect/is',
        params:data
    })
}

// 获取最新

export function getNewArticle(){
    return http({
        url:'/article/new'
    })
}