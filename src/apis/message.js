import http from '@/utils/http'
import Qs from 'qs'

export function addMessage(dataa){
    return http({
        url:'/message',
        method:"POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data:Qs.stringify(dataa)
    })
}