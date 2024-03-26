<script setup>
import {ref,onMounted} from 'vue'

import { getCourseByName,getCourseclassList,getCourse } from '@/apis/courseAPI'
import {useRoute} from 'vue-router'

const route = useRoute()

const courseName = ref([])
const defdetails = ref("")
onMounted(async ()=>{
    const res = await getCourse(route.query)
    // details.value = res.data
    courseName.value = res.data
    defdetails.value = res.data[0]
})

//查询教程文档
const todetails =  (name)=>{
    getCourseByName({name:name}).then(res=>{
        defdetails.value = res.data
    })
}

</script>

<template>
    <!-- <div class="course-details-main">
        <div class="course-list">
            <div class="jcb">教程表</div>
            <div class="course-list-card" v-for="item in courseName" @click="todetails(item.name)">
                {{ item.name }}
            </div>
        </div>
        <div class="course-detils">
            
        </div>
    </div> -->

    <div class="common-layout">
        <el-container class="jc-container">
            <el-aside width="300px">
                <div class="course-list">
                    <div class="jcb"><span>教程表</span></div>
                    <div class="course-list-card" v-for="item in courseName" @click="todetails(item.name)">
                        {{ item.name }}
                    </div>
                    
                </div>
            </el-aside>
            <el-main>
                <el-row class="row-bg" justify="center">
                    <el-col :span="15"><div class="grid-content ep-bg-purple-light" />
                        <v-md-preview-html :html="defdetails.details" preview-class="vuepress-markdown-body"></v-md-preview-html>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<style>
.common-layout {
    height: 98%;
}


.jc-container {
    height: 100%;
}
.course-list {
    height: 100%;
    border-right: 1px solid #ccc;
    overflow: auto;

    
}

.jcb {
    width: 100%;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    display: flex;
    justify-content: center;
}
.jcb span {
    border-bottom: 2px solid #bf4e4e;
    padding: 0 80px;
}
.course-list-card {
    width: 100%;
    height: 50px;
    padding-left: 50px;
    line-height: 50px;
    font-size: 20px;

    transition: all .5s;
    cursor: grab;
}

.course-list-card:hover {
    background-color: rgb(241, 95, 144);
    color: #fff;
    transition: all .5s;
}
</style>