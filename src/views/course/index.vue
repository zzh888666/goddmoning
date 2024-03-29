

<script setup>

import {ref,onMounted} from 'vue'
import { getCourseclassList } from '@/apis/courseAPI'
import {useRouter} from 'vue-router'

const show = ref(false)

const router = useRouter()

const courseclasslist = ref([])

onMounted(async()=>{
    show.value = true
    const res = await getCourseclassList()  
    courseclasslist.value = res.data
})
const todetails = (id)=>{
    router.push({
        path:'/course/details',
        query:{
            id:id
        }
    })
}


</script>

<template>
    <div class="course-header" >
        <el-divider>
            数据来源网络
        </el-divider>
    </div>
    <div class="course-main">
        

       <Transition name="bounce">
        <el-space
        fill
        wrap
        v-if="show" 
        :size="40"
        :fill-ratio="60"
        style="width: 100%"
        >
        <div  class="course-class scdh" v-for="item in courseclasslist" :key="item.id" @click="todetails(item.id)">
           <div class="jc-dh"> {{ item.name }}</div>
           <div class="jc-tx">学习</div>
        </div>
       
       
        </el-space>
       </Transition>
    </div>
    
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.course-header {
    width: 1300px;
    height: 150px;
    /* background-color: #493333; */
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.course-header .el-divider__text {
    font-size: 30px;
}
.course-main {
    margin: 0 auto;
    height: 80%;
    width: 1300px;
   
}
.course-class {
    position: relative;
    width: 45%;
    height: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    /* color: #fff; */
    font-size: 50px;
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 5px #e1dddd;
    transition: all .5s;
}
.jc-tx {
    position: absolute;
    top: 5px;
    font-size: 15px;
    color: #ffffff;

}
.jc-dh {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-top: 5px solid #f82e2e;
    box-sizing: border-box;
    transition: all .3s;
}

.course-class:hover {
    transform: translateY(-10px);
    
    transition: all .5s;

}
.course-class:hover .jc-dh{
    border-top: 25px solid #f82e2e;
    transition: all .3s;
}
</style>