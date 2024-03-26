<script setup>
import { onMounted, ref } from 'vue'
import { getUserAcollect,getUserPcollect } from '@/apis/userAPI';
import { useRouter } from 'vue-router';

const router = useRouter()

const activeName = ref('first')


const html = ref()

const articleCollect = ref()
const projectCollect = ref(

)

onMounted(async ()=>{
    getUserAcollect().then(res=>{
        articleCollect.value = res.data
    })
    getUserPcollect().then(res=>{
        projectCollect.value = res.data
    })

})


const toADetails = (id) =>{
    router.push({
        path:'/article/details',
        query:{
            id:id
        }
    })
}
const toPDetails = (id) =>{
    router.push({
        path:'/projectDetails',
        query:{
            id:id
        }
    })
}
</script>

<template>

    <div class="center-collect">
        <div class="sc-bt">
            个人收藏
        </div>

        <el-tabs stretch v-model="activeName" class="demo-tabs" @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="文章" name="first">

                
                        <el-card style="max-width: 800px;cursor: grab;" v-for="item in articleCollect" :key="item.id"  @click="toADetails(item.id)"> 
                            <template #header>
                            <div class="card-header" >
                                <span>{{ item.name }}</span>
                            </div>
                            </template>
                            <div class="yw">
                                <v-md-preview-html :html="item.details" preview-class="vuepress-markdown-body" ></v-md-preview-html>
                            </div>
                        </el-card>
      
            </el-tab-pane>
            <el-tab-pane label="项目" name="second">
                
                <el-card style="max-width: 800px; padding: 10px;cursor: grab;" v-for="item in projectCollect" :key="item.id" @click="toPDetails(item.id)">
                    <template #header>
                    <div class="card-header">
                        <span>{{ item.name }}</span>
                    </div>
                    </template>
                    <div class="sc-p-jj">
                        {{ item.readme }}
                    </div>
                    
                </el-card>
                

            
               


            </el-tab-pane>

        </el-tabs>
    </div>

</template>

<style>


.center-collect {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: auto;
    
}

.center-collect .el-tabs__item{
    font-size: 25px;
}

.center-collect .el-tab-pane{
    display: flex;
    align-items: center;
}

.sc-bt {
    width: 100%;
    height: 80px;
    font-size: 20px;
    padding-left: 10px;
    line-height: 80px;
    text-align: center;
}
.center-collect .el-tab-pane{
    display: flex;
    flex-flow: column nowrap;
}
.center-collect .el-tab-pane .el-card {
    height: 200px;
    margin-top: 15px;
}
.demo-tabs > .el-tabs__content {
  padding: 22px;
  color: #6b778c;
  font-size: 15px;
  display: flex;
}
.demo-tabs > .el-tabs__content  .el-tab-pane {
    width: 100%;
    display: flex;
}
.card-header {
    padding: 15px;
    width: 100%;
    height: 50px;


    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}


.demo-tabs > .el-tabs__content .yw {
    padding: 0px 10px 0px 10px;
    /* width: 269px; */
    height: 150px;

    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}
.demo-tabs > .el-tabs__content .yw p{
    font-size: 15px;
    margin-top: 10px;
}
.demo-tabs > .el-tabs__content .yw h1,
.demo-tabs > .el-tabs__content .yw h2,
.demo-tabs > .el-tabs__content .yw h3,
.demo-tabs > .el-tabs__content .yw h4,
.demo-tabs > .el-tabs__content .yw h5,
.demo-tabs > .el-tabs__content .yw h6,
.demo-tabs > .el-tabs__content .yw img,
.demo-tabs > .el-tabs__content .yw pre{
    display: none;
}
</style>