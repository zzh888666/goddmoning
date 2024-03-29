
<script setup>
import { onMounted,ref,reactive } from 'vue';
import { getArticle,getArticleHeadline ,getArticleHot,getNewArticle} from '@/apis/articleAPI';
import countcard from '@/components/countcard.vue';
import { useRouter } from 'vue-router'

const show = ref(false)

const router = useRouter()

//文章裂变
let articleList = ref([])
//热点
let hotarticle = ref([])
//头条
let headlinearticle = ref([])

//默认头条
let defheadlinearticle = ref({
    coverUrl:'',
    name:''
})

//最新
let newarticle = ref([{
    name:'',
}])
onMounted(async ()=> {
    show.value = true
    
    //获取文章列表
    const res = await getArticle()
    articleList.value = res.data
    //获取最新
    // getNewArticle().then(res=>{
    //     newarticle.value = res.data
    // })
    const newres = await getNewArticle()
    newarticle.value = newres.data
    // 获取热点和头条、最新
    const hotres = await getArticleHot()
    hotarticle.value = hotres.data


    const headlineres = await getArticleHeadline()
    
    if(headlineres.data != null){
        defheadlinearticle.value = headlineres.data[0]
    }
    if (headlineres.data.length>1) {
        headlinearticle.value = headlineres.data.slice(1)
    }else {
        headlinearticle.value = []
    }
    
})
const html = ref('')

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

//传递id
const toDetails = (id)=>{
    router.push({
        path:'/article/details',
        query:{
            id:id
        }
    })
}

//切割字符串
const subNameH = (sname)=>{
    if(sname.indexOf(",") != -1){
        return sname.substring(0,sname.indexOf(","))
    }else {
        return sname
    }
}
const subNameSpan = (sname)=>{
    if(sname.indexOf(",") != -1){
        return sname.substring(sname.indexOf(",")+1)
    }else {
        return sname
    }
}


</script>


<template>
    <Transition>
        <div class="article" v-if="show">
        <el-container>
            <el-header class="articleHeader">
               
            </el-header>
            <el-main class="articleMain">
       
               
                <!-- 头条 -->
                <div class="articlett">
                    <!-- 今日咨询 -->
                    <div class="ttday">
                        <el-card  class="ttcard">
                            
                            <div class="card-header">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-a-wendangjilu"></use>
                                </svg>
                                <span>今日头条</span>
                            </div>
                            
                            <div class="ttcount">
                                <div class="ttcount-left" @click="toDetails(defheadlinearticle.id)">
                                    <div class="ttcount-left-img">
                                        <img :src="defheadlinearticle.coverUrl" alt="">
                                    </div>
                                    <p>{{ defheadlinearticle.name}}</p>
                                </div>
                                <div class="ttcount-r">
                                    <ul>
                                        <li v-for="item in headlinearticle" :key="item.id" @click="toDetails(item.id)">
                                            <h6>{{ subNameH(item.name) }}</h6>
                                            <span>{{ subNameSpan(item.name) }}</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </el-card>    
                    </div>
                    <!-- 排行榜 -->
                    <div class="ttphb">
                        <el-card style="max-width: 480px" class="ttcard">
                            
                            <div class="card-header">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-redianhuodong"></use>
                                </svg>
                                <span>热点</span>
                            </div>
                            
                            <div class="ttcount">
                                <p v-for="item in hotarticle" :key="item.id" @click="toDetails(item.id)">
                                    <!-- 截取字符串 -->
                                    <h6>{{ subNameH(item.name)}}</h6>
                                    <span>{{ subNameSpan(item.name) }}</span>
                                </p>
                                
                            </div>
                        </el-card>    
                    </div>
                    <!-- 最新发布 -->
                    <div class="ttphb">
                        <el-card style="max-width: 480px" class="ttcard">
                            
                            <div class="card-header">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zuixin"></use>
                                </svg>
                                <span>最新发布</span>
                            </div>
                            
                            <div class="ttcount">
                                <p v-for="item in newarticle" @click="toDetails(item.id)">
                                    <h6>{{ subNameH(item.name) }}</h6>
                                    <span>{{ subNameSpan(item.name) }}</span>
                                </p>
                                
                            </div>
                        </el-card>    
                    </div>
                </div>
                <!-- 文章区域 -->
                <div class="articleList">
                    <!-- 文章展示卡片 -->
                    <div class="articlecardlist">
                        <!-- 文章筛选 -->
                        <div class="article-shai">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="排序">
                                    <el-select
                                    v-model="formInline.user"
                                    placeholder="全部"
                                    clearable
                                    @change="selecrchange"
                                    >
                                        <el-option label="最新" value="最新" />
                                        <el-option label="最热" value="最热" />
                                        <el-option label="最多赞" value="最多赞" />
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="分类">
                                    <el-select
                                    v-model="formInline.region"
                                    placeholder="全部"
                                    clearable
                                    @change="selecrchange"
                                    >
                                        <el-option label="前端" value="前端" />
                                        <el-option label="后端" value="后端" />
                                        <el-option label="AI" value="AI" />
                                    </el-select>
                                </el-form-item> -->
                                <!-- <el-form-item label="标签">
                                    <el-select
                                    v-model="formInline.date"
                                    placeholder="全部"
                                    clearable
                                    @change="selecrchange"
                                    >
                                        <el-option label="java" value="java" />
                                        <el-option label="python" value="python" />
                                        <el-option label="vue3" value="vue3" />
                                    </el-select>
                                </el-form-item> -->
                                
                                
                            </el-form>
                        </div>
                        <!-- 文章卡片 -->
                        <div class="articlecard" v-for="(item,index) in articleList" :key="item.id" @click="toDetails(item.id)"> 
                            <div class="articleImg">
                                <img :src="item.coverUrl" alt="">
                            </div>
                           <div class="articleNoImg">
                                <div class="articleH">{{ item.name }}</div>
                                <div class="articlejs">
                                    <v-md-preview-html :html="item.details" preview-class="vuepress-markdown-body"></v-md-preview-html>

                                </div>
                                <div class="articlelike">
                                    <ul>
                                        <li>
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-a-wendangjilu"></use>
                                            </svg>
                                            <span>{{ item.likenum }} 赞</span>
                                        </li>
                                        <li>
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-a-wendangjilu"></use>
                                            </svg>
                                            <span>{{ item.watch }} 浏览量</span>
                                        </li>
                                        <li>
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-a-wendangjilu"></use>
                                            </svg>
                                            <span>作者: {{ item.userId }}</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                           </div>
                        </div>
                    
                    <!-- 文章右侧推荐区域 -->
                    </div>
                    <div class="tuijian">
                        <div class="article-page-stat">
                            <div class="stat-h">
                                文章页面数据统计
                            </div>
                            <div class="stat-shuoming">
                                每日7:00更新
                            </div>
                            <div class="stat-stat">
                             <ul>
                                <li>总文章数 <span>1000</span></li>
                                <li>访问量 <span>1000</span></li>
                                <li>今日新增 <span>1000</span></li>
                             </ul>
                            </div>
                        </div>

                    </div>
                </div>
                
            </el-main>
        </el-container>
    </div>
    </Transition>
</template>


<style>

.v-enter-active {
  transition: all .8s ease-out;
}

.v-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.article {
    width: 100%;
    background-color: rgb(245, 245, 245);
    font-family: "微软雅黑";
}
/* 头部 */
.articleHeader {
    /* margin: 0 auto; */
    width: 100%;
    height: 30px;
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}




/* 主体 */
.articleMain {
    margin: 0 auto;
    width: 1450px;
    margin-top: 10px;
}
@media (max-width:1799px) {
    .articleMain {
        width: 1400px;
    }
}
@media (max-width:1500px) {
    .articleMain {
        width: 1400px;
    }
}





/* 咨询热点 */
.articlett {
    width: 100%;
    height: 400px;
    /* background-color: #fff; */
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
/* 卡片排放 */
.articlett .ttday
{
    width: 40%;
    height: 100%;
    /* max-width: 400px; */
}
.articlett .ttphb {
    width: 30%;
    height: 100%;
    max-width: 400px;
    margin-left: 10px;
}
/* 精选 */
.ttcard {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 5px;
}
.card-header {
    flex: 4;
    height: 46px;
    font-size: 20px;
    padding-left: 10px;
    padding-top: 10px;
}
.ttphb .ttcount {
    flex: 6;
    font-size: 15px;
    padding-left: 20px;
}


.ttphb .ttcount p {
    padding: 13px 0;
    cursor: grab;
}
.ttphb .ttcount p h6{
    font-size: 15px;
    font-weight: 500;
    margin: 0;
}
.ttphb .ttcount p span {
    font-size: 13px;
    color: #807e7e;
    margin: 0;
}


.ttphb .ttcount p:hover {
    border-bottom: 1px solid #ccc;
}




.ttday .ttcount {
    width: 100%;
    height: 330px;
    display: flex;
    margin-top: 20px;
}
.ttday .ttcount .ttcount-left {
    height: 100%;
    width: 60%;
    cursor: grab;

}
.ttcount-left .ttcount-left-img {
    width: 100%;
    height: 70%;
    overflow: hidden;
}
.ttday .ttcount .ttcount-left img {
    width: 100%;
    height: 100%;
    transition: all 1s;
}
.ttday .ttcount .ttcount-left img:hover {
    transform: scale(1.2);
    transition: all .7s;

}
.ttday .ttcount .ttcount-left p{
    margin-top: 10px;
    font-size: 15px;
    /* 多行省略 */
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.ttday .ttcount .ttcount-left p:hover {
    border-left: 1px solid #ccc; 
}
.ttday .ttcount .ttcount-r {
    width: 30%;
    height: 100%;
    margin-left: 10px;
}

.ttday .ttcount .ttcount-r ul {
    width: 100%;
    height: 100%;
}
.ttday .ttcount .ttcount-r ul li{
    width: 100%;
    height: 64px;
    margin-left: 20px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    /* justify-content: center; */
    font-size: 11px;
    
}


.ttday .ttcount .ttcount-r ul li h6 {
    font-size: 18px;
    font-weight: 400;
    margin:  0;
    cursor: grab;
}
.ttday .ttcount .ttcount-r ul li h6:hover {
    border-bottom: 1px solid #ccc !important;
}
.ttday .ttcount .ttcount-r ul li span {
    cursor: grab;
    color: #9f9f9f;
    font-size: 13px;
}




/*********************** */
/* 文章列表 */
.articleList {
    width: 100%;
    border-color: #ffdcdc;
    margin-top: 10px;
    display: flex;
}
.articlecardlist {
    width: 70%;
    display: flex;
    flex-flow: column nowrap;
    /* align-items: center; */
}
/* 文章筛选区域 */
.articlecardlist .article-shai {
    width: 95%;
 
}
.article-shai .el-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.article-shai .el-form .el-form-item {
    width: 30% ;
    margin: 0;
}

/* 文章卡片 */
.articlecard {
    width: 95%;
    height: 130px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    border-radius: 8px;
    margin-top: 10px;
    transition: all .5s;
    cursor: grab;
}
.articleImg {
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.articleImg img {
    width: 100%;
    height: 80%;
    object-fit: cover;
}
.articleNoImg{
    width: 80%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    margin-top: 10px;
    margin-left: 10px;
}

.articlecard:hover {
    position: relative;
    top: -2px;
    transition: all .5s;
    box-shadow: 0 0 10px 2px #dbdada;
}

/* 标题 */
.articleH {
    width: 100%;
    height: 30%;
    font-size: 20px;
    font-weight: 700;
    cursor: grab;
}


.articleH:hover {
    border-left: 1px solid #ccc;
}
/* 简介 */
.articlejs {
    width: 100%;
    height: 35%;
    font-size: 13px;
    font-weight: 500;
    font-size: 13px ;
    color: #9f9f9f;
   cursor: grab;
}
.articlejs:hover {
    border-left: 1px solid #ccc;

}
.articlecard .articlejs .vuepress-markdown-body {
    padding: 0;
    font-size: 12px;
    color: #807e7e;
     /* 多行省略 */
     display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

}
.articlecard .articlejs .vuepress-markdown-body p{
    padding-left: 0 !important;
}
.articlecard .articlejs h1,
.articlecard .articlejs h2,
.articlecard .articlejs h3,
.articlecard .articlejs h4,
.articlecard .articlejs h5,
.articlecard .articlejs h6,
.articlecard .articlejs img,
.articlecard .articlejs pre
{
    display: none;
}
.articlecard .articlejs ol,
.articlecard .articlejs ul {
    margin: 0 !important;
}








/* 底部喜欢区域 */
.articlelike {
    width: 100%;
    height: 30%;
    
}
.articlelike ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
}
.articlelike ul li {
    cursor: grab;
    padding: 5px 0;
    margin-left: 10px;
}
.articlelike ul li:nth-child(1) {
    margin-left: 0;
}
.articlelike ul li span {
    margin-left: 5px;
}
.articlelike ul li:hover {
    border-bottom: 1px solid #d90000;
}

/* 右侧推荐 */
.tuijian {
    width: 30%;
    height: 500px;
    /* background-color: #cd8b8b; */
    margin-top: 10px;
}
/* 每日统计 */

.article-page-stat {
    width: 100%;
    height: 300px;
    background: linear-gradient(70deg, #e97bbb, #e877aa,#eda6e0);
    background-size: 100%;
    border-radius: 10px;
    animation: bc 40s infinite;
}
@keyframes bc {
    100% {
        background-position: -400% 0;
    }
}

.stat-h{
    width: 100%;
    height: 20%;
    font-size: 20px;
   
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "优雅";
    color: #fff;
}
.stat-shuoming {
    width: 100%;
    height: 20%;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "优雅";
    color: #fff;
}
.stat-stat {
    width: 100%;
    height: 50%;
}
.stat-stat ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    /* align-items: center; */
}
.stat-stat ul li {
    width: 100%;
    height: 30%;
    display: flex;
    font-size: 12px;
    justify-content: space-around;
    align-items: center;
    font-family: "优雅";
    color: #fff;
    font-size: 25px;
}
</style>