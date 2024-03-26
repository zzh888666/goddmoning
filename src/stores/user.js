import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/apis/userAPI'

export const userLoginStore = defineStore('userT', () => {
    //存储JWT的token
    const token = ref()
    const userlogin = async (name,pwd)=>{
        const res =  await login(name)
        token.value = res.data
        return res
    }
    //清空token，同时插件自动清空本地存储的token
    const clearToken = ()=>{
        token.value =''
    }
  
    return { token,userlogin ,clearToken}
  },
  // 配置持久化插件
  {
    persist: true,
  },
  
)