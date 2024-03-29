<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const show  = ref(false)


onMounted(()=>{
    show.value = true
})

const router = useRouter()
const toProject = ()=>{
    router.push({
        path:'project'
    })
}
</script>

<template>
    <div class="homepage">
        <div class="home-page-header">
            <div class="zzh">zhaozhihao</div>
            <p>优选</p>      
        </div>
        <div class="hpomepagemain">

        <Transition name="lj">

            <ul v-if="show">
                <li @click="toProject">
                    <p>github</p>
                    <span>分享github上高质量、高使用、有趣项目</span>
                </li>
                <li @click="router.push('/article')">
                    <p>文章</p>

                    <span>分享网络有价值的文章</span>
                    
                </li >
                <li @click="router.push('/course')">
                    <p>教程</p>

                    <span>简洁，高质量，实用教程</span>
                </li>
                <li @click="router.push('/message')">
                    <p>反馈</p>

                    <span>向我反馈问题或者优质项目、文章</span>
                </li>
            </ul>
        </Transition>

        
    </div>

    <div class="homelianxi" >
        <div class="aboutme">关于我</div>
        <div class="aboutmegz">关注我获取更过信息</div>
        <div class="aboutmecard">
            <el-tooltip
                content="<img src='https://zzh2003.oss-cn-heyuan.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg'/>"
                raw-content
                placement="top"
            >
            <div class="aboutmenav">
                <div class="aboutfont">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixinfang"></use>
                    </svg>
                </div>
                <div class="shuoming">
                    公众号
                </div>           
                <div class="jiantou">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouzhi1"></use>
                    </svg>
                </div>
            </div>
            </el-tooltip>
           
            <div class="aboutmenav">
                <div class="aboutfont">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-gethub"></use>
                    </svg>
                </div>
                <div class="shuoming">
                    github
                </div>
                <div class="jiantou">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouzhi1"></use>
                    </svg>
                </div>
            </div>
            <div class="aboutmenav">
                <div class="aboutfont">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gitee"></use>
                    </svg>
                </div>
                <div class="shuoming">
                    gitee
                </div>
                <div class="jiantou">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouzhi1"></use>
                    </svg>
                </div>
            </div>
            <div class="aboutmenav">
                <div class="aboutfont">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-csdn"></use>
                    </svg>
                </div>
                <div class="shuoming">
                    csdn
                </div>
                <div class="jiantou">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouzhi1"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="pass">

        </div>
    </div>
    </div>
    
</template>

<style>

.lj-enter-active,
.lj-leave-active {
  transition: opacity 2s ease;
}

.lj-enter-from,
.lj-leave-to {
  opacity: 0;
}

.homepage {
    font-family: "微软雅黑";
    min-width: 1200px;

}
.zzh {
    font-weight: 500;
    font-size: 50px;
    color: #081642;
}
.home-page-header p{
    font-size: 20px;
}
.hpomepagemain {
    margin: 10px auto;
    width: 75vw;
    height: 550px;
    min-width: 650px;
    /* background-color: antiquewhite; */
    
}




.hpomepagemain ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
}
.hpomepagemain ul li {
    padding: 0 20px;
    width: 45%;
    height: 150px;
    border-left: 10px solid #007aff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    cursor: grab;
    font-size: 20px;
    margin-left: 20px;
    box-shadow: 0 0 20px 1px rgba(177, 174, 174, 0.2);
    border-radius: 2px 50px 5px 2px;
    transition: all .3s;
}


.hpomepagemain ul li:nth-child(2){
    border-left: 10px solid #38d6b6;

}
.hpomepagemain ul li:nth-child(3){
    border-left: 10px solid #a438d6;

}

.hpomepagemain ul li:nth-child(4){
    border-left: 10px solid #dfea10;

}
.hpomepagemain ul li:hover {
    border-left: 20px solid ;
    transition: all .5s;
}





.hpomepagemain ul li p {
    padding-left: 0 !important;
    font-weight: 700;
    color: #000035;
}
.hpomepagemain ul li span {
    font-size: 15px;
    color: #848da6;
}

.homelianxi {
    margin: 100px auto;
    width: 75vw;
    min-width: 650px;
}
.aboutme {
    width: 100%;
    height: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
}
.aboutmegz {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 10px;
    color: #ccc;
}
.aboutmecard {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.aboutmenav {
    width: 20%;
    height: 80%;
    border-radius: 10px;
    box-shadow:  0 0 15px 1px #cfcece;
    background-color: #fff;
    display: flex;
    cursor: grab;
}

.aboutfont ,
.jiantou{
    flex: 3;
    width: 30%;
    height: 100%;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shuoming {
    flex: 4;
    width: 40%;
    height: 100%;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.jiantou{
    font-size: 30px;
}

.pass {
    width: 100%;
    height: 20vh;
    
}



@media (max-width:1200px) {
    .hpomepagemain ul {
        flex-flow: column;
    }
    .hpomepagemain ul li {
        width: 65%;
        margin-top: 15px;
    }
    .aboutmecard {
        flex-flow: column;
        height: 450px;
    }
    .aboutmenav {
        width: 50%;
        margin-top: 15px;
    }
}


</style>
