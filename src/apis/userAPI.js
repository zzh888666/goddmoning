import http from '@/utils/http'
import Qs from 'qs'
export function login(name){
    return http({
        url:'/user/login',
        method:'POST',
        data:Qs.stringify(name),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}


export function getUserInfo(){
    return http({
        url:'/user/userinfo'
    })
}


// 注册
export function addUser(data){
    return http({
        url:'/user/register',
        method:'POST',
        data:Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

//获取用户收藏文章

export function getUserAcollect(){
    return http({
        url:'/user/acollect'
    })
}

//获取收藏项目
export function getUserPcollect(){
    return http({
        url:'/user/pcollect'
    })
}


//更新信息
export function updateUserInfo(data){
    return http({
        url:'/user/updateinfo',
        method:"POST",
        data:data
    })
}


//修改密码
export function updateUserPwd(data) {
    return http({
        url:"/user/updatepwd",
        method:"PATCH",
        data:data
    })
}