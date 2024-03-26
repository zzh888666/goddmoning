import http from '@/utils/http'

export function getCourse(clsaaid) {
    return http({
        url:'/course',
        params:clsaaid
    })
}

export function getCourseclassList() {
    return http({
        url:'/courseclass'
    })
}


export function getCourseByName(coursename) {
    return http({
        url:'/course/name',
        params:coursename
    })
}