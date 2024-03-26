<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/apis/userAPI';
import { userLoginStore } from '@/stores/user';


const userStor = userLoginStore()

const router = useRouter()

const toCollect = ()=>{
    router.push({
        path:'/user/collect'
    })
}

const toCenter = () => {
    router.push('/user/center')
}

const userinfo = ref({
    photoUrl:''
})
onMounted(async()=>{
    const res =  await getUserInfo()
    userinfo.value = res.data
})


//弹出框
const centerDialogVisible = ref(false)
const noLogindia = ()=>{
    centerDialogVisible.value=true
}
const noLogin =()=>{
    userStor.clearToken()
    centerDialogVisible.value=true
    router.push('/login')
}

</script>

<template>
    <div class="user-center-main">
        <div class="center-left">
            <div class="center-left-top">
                <div class="user-img">
                    <img :src="userinfo.photoUrl" alt="">
                </div>
                <div class="user-name">
                    {{ userinfo.name }}
                </div>
            </div>
            <div class="center-left-list">
                <ul>
                    <li @click="toCenter">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-shenfenzheng"></use>
                        </svg>
                        <span>个人资料</span>
                    </li>
                    <li @click="toCollect">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-shoucang2"></use>
                        </svg>
                        <span>个人收藏</span>
                    </li>



                    <li @click="noLogindia">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-tuichu"></use>
                        </svg>
                        <span>退出登录</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="center-right">
            <div class="center-right-main">
                
                <RouterView/>
            </div>
        </div>
    </div>
<el-dialog v-model="centerDialogVisible" title="警告" width="500" center>
    <span>
      确定要退出么
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="noLogin">
            确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.user-center-main {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    background-color: #f1f4f9;
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
/* 左侧区域 */
.center-left {
    width: 15%;
    height: 95%;
    background-color: #fff;
    margin-left: 10px;

    border-radius: 10px;
    

}
/* 左侧区域顶部 */
.center-left-top {
    width: 100%;
    height: 25%;
    
    background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #d04099 100%);

    border-radius: 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.user-img {
    width: 70%;
    height: 60%;

}
.user-img img{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    border-radius: 10px;
    object-fit: cover;
}
.user-name {
    width: 50%;
    height: 50%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.center-left-list {
    width: 100%;
    height: 500px;
}
.center-left-list ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 20px;
}
.center-left-list ul li {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
    cursor: grab;
    
}
.center-left-list ul li svg {
    font-size: 20px;
}

.center-left-list ul li:hover {
    background-color: #f0f0f0;
}
/* 右侧区域 */
.center-right {
    width: 78%;
    height: 90%;
    background-color: #fff;
    border-radius: 10px;

}
.center-right-main{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
}


</style>