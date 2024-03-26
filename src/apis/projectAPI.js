import http from '@/utils/http'
import Qs from 'qs'
//获取项目
export function getProject() {
    return http({
        url:'/project'
    })
}
//筛选
export function conditionProject(params) {
    return http({
        url:'/project/condition',
        method:'POST',
        data:params
    })
}

//根据id查询
export function getProjectById(id){
    return http({
        url:'/project/pdetails',
        params:id
    })
}

//查询热门
export function getHotProject(){
    return http({
        url:'/project/hot'
    })
}


//是否已收藏
export function getProjectIsCollect(data){
    return http({
        url:'/pcollect/is',
        params:data
    })
}

// 收藏
export function pcollect(data){
    return http({
        url:'/pcollect',
        method:'POST',
        data:Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//取消收藏

export function delpcollect(data){
    return http({
        url:'/pcollect',
        method:'DELETE',
        params:data
        // data:Qs.stringify(data),
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}