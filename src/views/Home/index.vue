<script setup>
import card from '@/components/card.vue';
import dataCard from '@/components/dataCard.vue';
import {onMounted, ref} from 'vue'

//发起请求获取项目列表
import { getProject } from '@/apis/projectAPI';
let datalist = ref([])
let dataa = []
const getdatalist = async () => {
   let data = await getProject()
   return data
}

 onMounted(async ()=>{
     datalist.value =  (await getProject()).data
    //  console.log(datalist.value);

})
</script>



<template>
    <div class="homebody">
            <!-- 顶部背景图片加波浪云效果 -->
        <div class="hometopimg">
            <!-- <img src="https://zzh-big-event.oss-cn-beijing.aliyuncs.com/c0b4be564561b0c92f25651b5481dc9.jpg" alt="" class="beijing"> -->
            
            <img src="@/assets/image/bz03re.jpg" alt="">
            <div class="yun">
                <!-- <img style="background-color: transparent;" src="https://zzh-big-event.oss-cn-beijing.aliyuncs.com/yun.png" alt="" class="yunimg">
                <img style="background-color: transparent;" src="https://zzh-big-event.oss-cn-beijing.aliyuncs.com/yun.png" alt="" class="yunimg"> -->
                    <!-- <img style="background-color: transparent;" src="@/assets/image/yun01.png" alt="" class="yunimg">
                    <img style="background-color: transparent;" src="@/assets/image/yun01.png "alt="" class="yunimg"> -->
                    <!-- <img style="background-color: transparent;" src="@/assets/image/02.png "alt="" class="yunimg"> -->
                <div class="yun1"></div>
                <div class="yun2"></div>
            </div>
        </div>
        <!-- 主页面 -->
        <div class="main">
            
            <!-- 主页面的头部 -->
            <div class="hometop">
                
                
            </div>
            <!-- 内容部分 -->
            <div class="homecontent">
            <div class="homecontflex">
                    <!-- 左侧区域 -->
                    <div class="homeleftcount">
                        <dataCard/>
                    </div>
                    <!-- 右侧项目展示区域 -->
                    <div class="project">
                        <card :data = 'datalist'/>
                    </div>
            </div>
            </div>
            
            
        </div>
    </div>
</template>

<style lang="scss">
/*home页面头部图像   
*/
.homebody {
    // background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
}
.hometopimg {
    position: relative;
    width: 100%;
    height: 60vh;
    overflow: hidden;

}
.hometopimg img {
    width: 100%;

    // 剪切图片
    object-fit: cover;
}
.hometopimg .beijing {
    position: absolute;
    top: 0;
    width: 100%;
    height: 500px;
    z-index: 1;
}
/*云层效果实现*/
.hometopimg .yun {
    position: absolute;
    bottom: -100px;
    width: 6000px;
    height: 200px;
    z-index: 2;
    background-color: transparent;
}
.yun .yun1 {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-image: url('@/assets/image/yun03.png');
    background-size: 50% 50%;
    background-repeat: repeat-x;
    animation: yunAnim 50s linear 1s infinite alternate;

}
.yun .yun2 {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-image: url('@/assets/image/bw01.png');
    background-size: 50% 50%;
    background-repeat: repeat-x;
    animation: yunAnim 10s linear 1s infinite alternate;
}

/* 主内容页面*/
.main {
    display: flex;
    flex-flow: column;
    margin: 0  auto;
    width: 89vw;
    // height: 1000px;
    min-width: 888px;
    max-width: 2200px;
    // padding: 0 20px 20px 20px;
}

// 控制内容展示区域在main居中


/*主内容头部*/
.main .hometop {
    flex: 1;
    width: 100%;
    height: 100px;
    border-radius: 5px;
    border: 1px dashed $infoFont;
    
}
/*主内容下方区域*/
.main .homecontent {
    
    flex: 9;
    width: 100%;
    // height: 600px;
    margin-top: 10px;
    
}
.homecontent .homecontflex {
    width: 100%;
    display: flex;
    // flex-flow: row wrap;

    justify-content: center;
}
/* 内容左侧，放置卡片区域*/
.homecontent .homeleftcount {
    // flex: 1;
    display: flex;
    // height: 600px;
    width: calc(30% - 50px);
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 50px;
    margin-right: 60px;

}
/*放置项目卡片区域*/
.homecontent .project {
    display: flex;
    // flex: 9;
    width: 70%;
    height: 100%;
    flex-flow: row wrap;
    // justify-content: space-between;
    // align-content: space-between;
}


/*动画区域*/


/*云层动画*/

@keyframes yunAnim
{
    0% {left: 0;}
    100% {left: -3000px;}
}

</style>