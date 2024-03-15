import http from '@/utils/http'

export function getProject() {
    return http({
        url:'/project'
    })
}
export function conditionProject(params) {
    return http({
        url:'/project/condition',
        method:'POST',
        data:params
    })
}