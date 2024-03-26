<script setup>
import card from '@/components/card.vue';
import dataCard from '@/components/dataCard.vue';
import countcard from '@/components/countcard.vue';
import {onMounted, ref} from 'vue'
import { getHotProject } from '@/apis/projectAPI';

//发起请求获取项目列表
import { getProject,conditionProject } from '@/apis/projectAPI';
let datalist = ref([])
const getdatalist = async () => {
   let data = await getProject()
   return data
}

const hotList = ref({
    imgUrl:'',
    updateTime:'',
    name:''
})

 onMounted(async ()=>{
     datalist.value =  (await getProject()).data
    const hotres = await getHotProject()
    hotList.value = hotres.data

})
//绑定表单中日期值
const datetime = ref([])
const redatetime = ()=> {
    // datetime.value = ['','']
}
const dataform = ref({
    condition:"def",
    tag:"all"
})
//搜索框值
const forinp = ref('')

//根据条件获取项目
const filterquery = async ()=> {

    let dataJson = {
        startTime:datetime.value? datetime.value[0]+' '+"00:00:00" : null,
        endTime:datetime.value ? datetime.value[1]+' '+"00:00:00" : null,
        condition:dataform.value.condition ? dataform.value.condition : null,
        tag : dataform.value.tag  ? dataform.value.tag : null
    }
    
    datalist.value =  await conditionProject(dataJson);
}

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
                <div class="hometopcont"></div>
                
            </div>
            <!-- 内容部分 -->
            <div class="homecontent">
                <div class="homecontflex">
                        <!-- 左侧区域 -->
                        <div class="homeleftcount">
                             <!-- <dataCard/> -->
                            <countcard/>
                           <!-- 热榜 -->
                            <div class="githubhot">
                                <div class="githubhot-top">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-remen"></use>
                                    </svg>
                                    <span>今日热榜</span>
                                </div>
                                <div class="githubhot-main">
                                    <!-- 热榜内容 -->
                                    <div class="githubhot-main-li" v-for="item in hotList" :key="item.id">
                                        <div class="githubhot-main-li-top">
                                            <img :src="item.imgUrl" alt="">
                                            <span>{{ item.name }}</span>
                                        </div>
                                        <div class="githubhot-main-li-rq">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-rili"></use>
                                            </svg>
                                            <span>{{ item.updateTime }}</span>
                                        </div>
                                    </div>
                                    
                                  
                                </div>
                            </div>
                            
                        </div>
                        <!-- 右侧项目展示区域 -->
                        <div class="project">
                            <!-- 左侧顶部筛选信息 -->
                            <div class="projecttop">
                                <el-form :inline="true"  class="projecttop-form" v-model="dataform">
                                    <!-- 搜索框 -->
                                    <div class="projecttop-form-search">
                                        <el-form-item class="search-input" style="border: 0px;">
                                            <el-input  placeholder="Approved by" clearable  v-model="forinp" />
                                        </el-form-item>
                                    </div>
                                    <!-- 筛选 -->
                                    <div class="projecttop-form-filter">
                                        <!-- 筛选左侧 -->
                                       <div class="filter-left">
                                            <!-- 热度筛选 -->
                                            <el-form-item  class="filter-hot">
                                                <el-select placeholder="默认" clearable v-model="dataform.condition" style="width: 10vw ;" >
                                                    <el-option label="默认" value="def" />
                                                    <el-option label="热门" value="watch" />
                                                    <el-option label="最新" value="updateTime" />
                                                    <el-option label="最多点赞" value="githubStar" />
                                                </el-select>
                                            </el-form-item>
                                            <!-- 标签筛选 -->
                                            <el-form-item class="filter-tag" >
                                                <el-select placeholder="全部" clearable style="width: 10vw" v-model="dataform.tag" >
                                                    <el-option label="全部" value="all" />
                                                    <el-option label="前端" value="前端" />
                                                    <el-option label="后端" value="后端" />
                                                    <el-option label="AI" value="AI" />
                                                    <el-option label="学习项目" value="学习项目" />
                                                    <el-option label="有趣好玩" value="有趣好玩" />

                                                </el-select>
                                            </el-form-item>
                                         
                                       </div>
                                       <!-- 筛选右侧 -->
                                       <div class="filter-right">
                                            <!-- 查询按钮 -->
                                            <el-form-item class="filter-query">
                                                <el-button type="primary" @click="filterquery" color="#FF8066"  >筛选</el-button>
                                            </el-form-item>
                                       </div>
                                    </div>
                                </el-form>
                            </div>
                            <!-- 内容展示区 -->
                            <div class="projectmain">
                                <card :data="datalist" />
                            </div>
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
    min-width: 1100px;
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
.hometop .hometopcont {
    height: 50px;
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
    align-items: center;
    margin-top: 50px;
    margin-right: 10px;

}
/*放置项目卡片区域*/
.homecontent .project {
    display: flex;
    flex-direction: column;
    // flex: 9;
    align-items: center;
    width: 70%;
    height: 100%;
    // margin-left: 30px;
    
}
/**卡片区域上部分 */
.homecontent .project .projecttop{
    width: 100%;
    height: 120px;
    // margin-left: 20px;
    margin-top: 10px;
    padding-left: 10px;
    
}
/**上部区域表单 */
.projecttop .projecttop-form{
    height: 100%;
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
}
/**搜索框div */
.projecttop-form .projecttop-form-search {
    width: 100%;
    padding-left: 20px;
    display: flex;
    justify-content: space-around;

}
//**设置搜索框 */
.projecttop-form .projecttop-form-search .search-input {
    width: calc(100% - 0px);
    height: 40px;
    margin: 0;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0 0px 2px #00C9A7 , 0 0 0 2px #00C9A7;
    background-color: #fff;
}

// @media (max-width :2310px) {
//     .projecttop-form .projecttop-form-search .search-input{
//         width: calc(100% - 40px);
//     }
    
// }
/**去掉搜索框边框 */
.search-input .el-input .el-input__wrapper{

background: none;
box-shadow: none;

}


/**设置搜索框lable文字行高 */
.projecttop-form-search .search-input label {
    line-height: 50px;
}
/**筛选区域 */
.projecttop-form .projecttop-form-filter {
    width: 100%;
    display: flex;
    padding-left: 10px;
    // justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    height: 50px;
    justify-content: space-between;
}
/**筛选区域左右占比 */
.projecttop-form-filter .filter-left {
    
    
}
.projecttop-form-filter .filter-right {
   
}

/**select选择器背景 */
.filter-left .filter-hot .el-select__wrapper,
.filter-left .filter-date .el-date-editor,
.filter-left .filter-tag .el-select__wrapper{
    // background-color: #ff6366;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 3px 2px rgba(204, 204, 204, .3);

    
}



.filter-left .el-select__wrapper span {
    color: #404040;
}



/**阻止当前元素element默认margin值 */
.projecttop-form-filter .filter-hot,
.projecttop-form-filter .filter-tag,
.projecttop-form-filter .filter-date,
.projecttop-form-filter .filter-query
 {
    margin: 0;
    margin-left: 10px;
}


//sele选择框
.projecttop .projecttop-form .projecttop-tag-select{    


}





/**卡片区域内部分 */
.homecontent .project .projectmain{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 10px;
    margin-left: 15px;
}

// 热榜
.githubhot {
    width: 300px;
    // height: 350px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow:  0 0 10px 1px rgba(200, 200, 200, .5);

}

.githubhot-top {
    width: 100%;
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding-left: 30px;
}

.githubhot-main {
    width: 100%;
}

.githubhot-main-li {
    width: 100%;
    height: 100px;
    margin-top: 12px;
    display: flex;
    flex-flow: column nowrap;
    padding-left: 30px;
}
.githubhot-main-li:nth-child(1){
    margin-top: 0;
}
.githubhot-main-li:last-child {
    
}

.githubhot-main-li-top{
    width: 100%;
    height: 70%;
    display: flex;
}
.githubhot-main-li-top img {
    width: 35%;
    height: 90%;
    border-radius: 10px;
}
.githubhot-main-li-top span {
    font-size: 15px;
    margin-left: 5px;
    width: 50%;
    height: 90%;
    /* 单行省略 */
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    
}
.githubhot-main-li-rq {
    width: 100%;
    height: 10%;
    font-size: 12px;
    font-weight: 700;
    font-family: "宋体";
    color: #a4a3a3;
}
.githubhot-main-li-rq span {
    margin-left: 5px;
}






@media (min-width: 1340px) {
    .projecttop-form {
        width: 95%;
    }
    
}
@media (max-width: 1390px){
    .projecttop {
        padding-left: 0 !important;
    }
}

/*动画区域*/


/*云层动画*/

@keyframes yunAnim
{
    0% {left: 0;}
    100% {left: -3000px;}
}

</style>