<script setup>
//导航栏数据
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { userLoginStore } from '@/stores/user';
const store = userLoginStore()



const router = useRouter()

const topmainNav = ref([
    {
        icon:'#icon-shouye-tianchong',
        title:'首页',
        path:'/'
    },
    {
        icon:'#icon-icon-gethub',
        title:'github分享',
        path:'/project'
    },
    {
        icon:'#icon-a-wendangjilu',
        title:'文章',
        path:'/article'
    },
    {
        icon:'#icon-tuiguangjiaocheng',
        title:'教程',
        path:'/course'
    },
    
    {
        icon:'#icon-yijianfankui',
        title:'反馈',
        path:'/message'
    }
])

const tologin = ()=>{
    router.push("/login")
}

const toCenter = ()=>{
    router.push("/user/center")
}

</script>

<template>
    <div class="topNavMain">
        <div class="logo">
            赵志豪
        </div>
        <div class="globalNav">
            <div v-for="(item,index) in topmainNav" :key="index" class="globalNav-a">
                    <router-link :to="item.path">
                        <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.icon"></use>
                        </svg>
                        <span>{{ item.title }}</span>
                    </router-link>
                </div>

        </div>
        <div class="user">
            <div class="user-logined" v-if="store.token">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击进入个人中心"
                    placement="bottom-end"
                >
                  <img src="https://zzh2003.oss-cn-heyuan.aliyuncs.com/tx.jpg" alt="" @click="toCenter">

                </el-tooltip>
            </div>
            <div class="user-no-login" v-else>
                <div class="login" @click="tologin">登录</div>
            </div>
        </div>
    </div>
</template>

<style>

.topNavMain {
    position: sticky;
    top: 0px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 0 10px 5px #e0e0e0;
    z-index: 3;
    display: flex;

}
.logo {
    width: 10%;
    height: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
}
.globalNav {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.globalNav-a {
    /* width: 20%; */
    margin-left: 20px;
    color: #000;
    cursor: grab;
    font-size: 20px;
}
.globalNav-a:hover {
    border-bottom: 1px solid #c22727;
}


.user {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.user-no-login {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    cursor: grab;
}

.user-logined {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
.user-logined img {
    width: 40px;
    height: 80%;
    border-radius: 50%;
    cursor: grab;
}

</style>