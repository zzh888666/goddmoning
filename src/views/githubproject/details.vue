
<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProjectById,getProjectIsCollect,pcollect,delpcollect } from '@/apis/projectAPI';
import { userLoginStore } from '@/stores/user';

const show = ref(false)

const router = useRoute()
let datajson = ref({})

onMounted(async ()=>{
    show.value = true
    let json  = await getProjectById(router.query)
    datajson.value = json.data


    isCollect()

   
})

//刷新页面是否收藏
const isclass = ref(false)


const isCollect = ()=>{
    const userStore = userLoginStore()
    if(userStore.token == null){

        isclass.value=false
    }
    getProjectIsCollect({projectId:router.query.id}).then(res=>{
        if (res.data == 1) {
            isclass.value=true
        }else {
            isclass.value=false
        }
    })
}

//收藏操作

const tosc = ()=>{
    if(!isclass.value){
        pcollect({projectId:router.query.id})
        isclass.value=true
    }else {
         delpcollect({projectId:router.query.id})
         isclass.value=false
    }

}

</script>

<template>
<Transition>
    <div class="common-layout" v-if="show">
    <el-container class="projectDetailsbody">
       
        <el-main class="details">
            <div class="detailsmain">
                <div class="projrct-h">
                    <div class="detailsheader">
                        {{ datajson.name }}
                    </div>
                </div>
                <el-divider />
                <v-md-preview-html :html="datajson.details" preview-class="vuepress-markdown-body" ></v-md-preview-html>
            </div>
            <div class="detailscard">
                <el-card style="max-width: 480px" class="jianjie" shadow="never">
                    <h2>简介</h2>
                    {{ datajson.readme }}
                </el-card>
                <!-- /**数据展示 */ -->
                <el-card style="max-width: 480px;border: 0;" class="shuju" shadow="never">
                    <div class="projectlike">
                        <div class="likecardleft">
                            star数(收藏)
                        </div>
                        <div class="likecardright">{{ datajson.githubStar }}</div>

                    </div>
                    <div class="projectlike">
                        <div class="likecardleft">
                            
                            fork(仓库克隆次数)
                        </div>
                        <div class="likecardright">{{ datajson.fork}}</div>
                    </div>
                    <div class="projectlike">
                        <div class="likecardleft">watch(项目浏览量)</div>
                        <div class="likecardright">{{ datajson.watch }}</div>
                    </div>

                </el-card>
                <el-card style="max-width: 480px;border: 0;" class="dizhi" shadow="never">
                    <div class="githuburl">
                        <div class="yuanzhi">原址</div>
                        <a :href="datajson.githubUrl" target="_blank">
                            
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-github"></use>
                            </svg>
                        </a>
                    </div>
                    <div class="project-collect">
                        <!-- 点赞 -->
                        <el-tooltip content="点击按钮收藏或取消" placement="top">
                            <div :class="{'wz-sc':!isclass,'wz-ysc':isclass}" @click="tosc">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shoucang"></use>
                            </svg>
                        </div>
                        </el-tooltip>
                    </div>
                    <div class="bdwpalwp">
                        <div class="wptishi">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tishi"></use>
                            </svg>
                            <span>
                                鉴于github不易访问，本网站提供了较为方便的网盘下载，点击下方跳转网盘下载
                            </span>
                        </div>
                        <div class="bdwp">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-baiduwangpan1"></use>
                            </svg>
                        </div>
                        
                        <div class="alwp">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-aliyundrive"></use>
                            </svg>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-main>
      <el-footer ></el-footer>
    </el-container>
  </div>
</Transition>
    
</template>


<style lang="scss">


.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.projectDetailsbody {
    background-color: rgb(250, 250, 250);
    height: 100vh;
    min-height: 750px;
}
.detailsheader {
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 80px;
    font-size: 25px;
}
/*内容区域*/
.details {
    width: 1300px;
    margin: 0px auto;
    display: flex !important;
    flex-flow: row nowrap;
    border-radius: 10px;
}
/**主体部分 */
.detailsmain {
    width: 70%;
    flex: 7;
    background-color: #fff;
    box-shadow:  0 0 10px 5px rgba(240, 240, 240, 1);
    border-radius: 10px;
    padding: 0 10px;   
    overflow: auto;

}

/*卡片区域 */
.detailscard {
    width: 30%;
    flex: 3;
    background-color: #fff;
    margin-left: 15px;
}
/**简介 */
.jianjie {
    padding: 10px;
    font-size: 15px;
    border: 0;
    background-color: #0d6efd;
    border-radius: 10px;
    color: #fff;
}

/**数据 */
.shuju {
    // background-color: #0D6E6E ;
    background: linear-gradient(to right, #0D6E6E, #4a9d9c);
    border-radius: 10px;
    margin-top: 10px;
    padding: 0 20px;
}
.projectlike {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    padding:0 40px;
    color: #ffffff;
    line-height: 50px;
    font-size: 15px;
    border-bottom: 3px solid #ffffff;
}
.projectlike:nth-child(3) {
    border: 0;
}

.likecardleft {
    float: left;
}
.likecardright {
    float: right;
}
/**地址区域 */

.githuburl {
    position: relative;
    width: 100%;
    height: 70px;
    background-color: #232429;
    border-radius: 5px;
    font-size: 40px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s;
    cursor: grab;
    margin-top: 10px;
}
.githuburl:hover {
    font-size: 50px;
    transition: all .2s;
}
.githuburl a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.yuanzhi {
    position: absolute;
    left: -5px;
    width: 15%;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
}




.wptishi {
    width: 100%;
    height: 50px;
    font-size: 13px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px dashed #ccc;
    margin-top: 10px;
    border-radius: 5px;
}
.wptishi svg {
    width: 20%;
    font-size: 20px;
}
.wptishi span {
    width: 80%;
}
.bdwp,
.alwp {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #fff;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: grab;
}
.bdwp {
    border: 2px solid #06a7ff;
}
.alwp {
    border: 2px solid #5a20e0;
}

.project-collect {
    margin-top: 10px
}

// 点赞按钮
.wz-sc {
    width: 100%;
    height: 50px;
    background-color: #6b7d7d;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border-radius: 10px;
    transition: all .5s;
}
.wz-ysc {
    width: 100%;
    height: 50px;
    background-color: #e9e25e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border-radius: 10px;
    transition: all .5s;
}
</style>