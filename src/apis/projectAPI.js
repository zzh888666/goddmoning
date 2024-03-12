import http from '@/utils/http'

export function getProject() {
    return http({
        url:'/project'
    })
}