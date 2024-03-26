

<script setup>

import {ref,onMounted} from 'vue'
import { getCourseclassList } from '@/apis/courseAPI'
import {useRouter} from 'vue-router'

const router = useRouter()

const courseclasslist = ref([])

onMounted(async()=>{
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
    <div class="course-header">
        <el-divider>
            数据来源网络
        </el-divider>
    </div>
    <div class="course-main">
        

        <el-space
        fill
        wrap
        :fill-ratio="fillRatio"
        style="width: 100%"
        >
        <div class="course-class" v-for="item in courseclasslist" :key="item.id" @click="todetails(item.id)">
            {{ item.name }}
        </div>

     </el-space>
    </div>
    
</template>

<style>
.course-header {
    width: 1300px;
    height: 200px;
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
    height: 100%;
    width: 1300px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
}
.course-class {
    width: 45%;
    height: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    /* color: #fff; */
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    cursor: grab;
    box-shadow: 0 0 10px 5px #e1dddd;
    transition: all 1s;
}
.course-class:hover {
    transform: translateZ(5px);
    transition: all 1s;

}

</style>