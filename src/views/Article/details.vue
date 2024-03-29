
<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getArticleById,acollect ,delacollect,getIsCollect } from '@/apis/articleAPI';
import { nextTick } from 'vue';
import { userLoginStore } from '@/stores/user';
const router = useRoute()

const show = ref(false)

let datajson = ref({})

let mddom = ref()
let titles = ref([])
onMounted(async ()=>{
    show.value = true
    // 获取文章
    let json  = await getArticleById(router.query)
    datajson.value = json.data
    // 查看点赞
    isCollect()
    //等到dom元素渲染完后在创建导航目录--代码根据官方文档编写
    nextTick(()=>{
        const hdom =  mddom.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
        const titlelist = Array.from(hdom).filter((title) => !!title.innerText.trim())
        if (!titlelist.length) {
            titles.value = [];
            return;
        }
        const hTags = Array.from(new Set(titlelist.map((title) => title.tagName))).sort();
        
        titles.value = titlelist.map((el) => ({
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
        }));
    })

})

//官方文档代码
const handleAnchorClick = (anchor)=>{
    const { lineIndex } = anchor
    const heading = mddom.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
    if (heading) {
        // 注意：如果你使用的是编辑组件的预览模式,则这里的方法名改为 previewScrollToTarget
        mddom.value.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
}

//收藏操作
const isclass = ref(false)
const tosc = ()=>{
    if(!isclass.value){
        acollect({articleId:router.query.id}).then(res=>{
            if(res.code == 0){
                 isclass.value=true
                 
            }
        })
    }else {
         delacollect({articleId:router.query.id}).then(res=>{
            if(res.code == 0){
                isclass.value=false
            }
         })
         
    }

}
//刷新页面是否显示收藏


const isCollect = ()=>{
    const userStore = userLoginStore()
    if(userStore.token == null){
        isclass.value=false
    }
    getIsCollect({articleId:router.query.id}).then(res=>{
        if (res.data == 1) {
            isclass.value=true
        }else {
            isclass.value=false
        }
    })
}

</script>

<template>

<Transition>
    <div class="common-layout" v-if="show">
    <el-container class="projectDetailsbody">
        
        <el-main class="details" >

            <div class="detailsmain" >
                
                <div class="wz-bt">
                    {{ datajson.name }}
                </div>
                <el-divider content-position="center" style="margin-top: 30px;">分割</el-divider>
                <v-md-preview-html :html="datajson.details" ref="mddom"  preview-class="vuepress-markdown-body"></v-md-preview-html>
                
            </div>                                                                                                                                                                                                                                                                  
            <div class="detailscard">
                <div class="article-zuozhe">
                    <div class="zz-tx-name-age">
                        <div class="zz-tx">
                            <img src="https://zzh2003.oss-cn-heyuan.aliyuncs.com/zzh.jpg" alt="">
                            
                        </div>
                        <div class="zz-name-age">
                            <div class="zz-name">赵志豪</div>
                            <div class="zz-jj">聪明帅气</div>
                        </div>
                    </div>
                    <div class="zz-dz-sc-pl-fs-hz">
                       <div class="zz-num">
                            <ul>
                                <li>2102</li>
                                <li>5646</li>
                                <li>3244</li>
                                <li>3245</li>
                                <li>5465</li>
                            </ul>
                       </div>
                       <div class="zz-num-jj">
                            <ul>
                                <li>粉丝</li>
                                <li>获赞</li>
                                <li>评论</li>
                                <li>收藏</li>
                                <li>文章</li>
                            </ul>
                       </div>
                    </div>
                    <div class="zz-gz-sx">
                        <el-button plain>关注</el-button>
                        <el-button plain>收藏</el-button>
                    </div>
                </div>
                <!-- 点赞 -->
                <el-tooltip content="点击按钮收藏或取消" placement="top">
                    <div :class="{'wz-sc':!isclass,'wz-ysc':isclass}" @click="tosc">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shoucang"></use>
                    </svg>
                </div>
                </el-tooltip>
                
                <div class="wz-ml-dh">

                    <div class="wz-ml-dh-sm">
                        目录
                    </div>
                     <div class="wz-ml-dh-md">
                        <div v-for="anchor in titles" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` } " @click="handleAnchorClick(anchor)">
                         <a style="cursor: pointer">{{ anchor.title }}</a>
                        </div>
                    </div>
                </div>
               
            </div>
        </el-main>
      <el-footer style="height: 500px;"></el-footer>
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
    font-family: "微软雅黑";
}

/*内容区域*/
.details {
    width: 1400px;
    max-width: 1400px;
    min-width: 900px;
    margin: 50px auto;
    display: flex !important;
    flex-flow: row nowrap;
    // background-color: #fff;
    border-radius: 10px;
    // box-shadow:  0 0 10px 5px rgba(240, 240, 240, 1);
    overflow: visible !important;
}
/**主体部分 */
.detailsmain {
    border-radius: 10px;
    box-shadow: 0 0 10px 5px #ededed;
    width: 70%;
    flex: 7;
    background-color: #fff;
}

// 文章标题
.wz-bt {
    width: 100%;
    height: 80px;
    font-size: 25px;
    padding-left: 25px;
    font-weight: 700;
    margin-top: 10px;
}
.details .vuepress-markdown-body{
    padding-top: 0;
}
/*卡片区域 */
.detailscard {
    width: 30%;
    flex: 3;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    // justify-content: center;
    // background-color: #fff;
    margin-left: 10px;
}
.article-zuozhe {
    width: 90%;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px #e8e8e8;
    margin-bottom: 10px;
}

.zz-tx-name-age {
    width: 100%;
    height: 40%;
    display: flex;
    // align-items: center;
}
.zz-tx {
    width: 40%;
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;
}
.zz-tx img {
    width: 100%;
    height: 80%;
    border-radius: 10px;
 
}
.zz-name-age {
     width: 50%;
     height: 100%;
     margin-left: 10px;
}

.zz-name {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    font-size: 25px;
}
.zz-jj  {
    width: 100%;
    height: 50%;
    display: flex;
    // align-items: center;
    font-size: 15px;
}
.zz-dz-sc-pl-fs-hz {
    width: 100%;
    height: 40%;
    margin-top: 20px;
    
}
.zz-num ,
.zz-num-jj {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.zz-num ul,
.zz-num-jj ul
{
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    
}
.zz-num-jj ul {
    border-bottom: 1px solid #f8eeee;
}
.zz-num-jj ul li {
    color: #b6b0b0;
}
.zz-gz-sx {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-around;

}
.zz-gz-sx button {
    width: 30%;
    height: 50%;

}
.wz-ml-dh {
    position: sticky;
    top: 60px;
    width: 90%;
    height: 600px;
    background-color: #fff;
    margin-top: 10px;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px #e8e8e8;

}
.wz-ml-dh .wz-ml-dh-sm {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    background-color: #22c2bf;
    border-radius: 10px 10px 0 0 ; 
}
.wz-ml-dh .wz-ml-dh-md {
    padding: 2px 20px;
    width: 100%;
    height: 530px;
    overflow: auto;
}

.wz-ml-dh .wz-ml-dh-md div {
    cursor: grab;
    height: 40px;
    border-radius: 10px;
    /**单行省略 */
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    transition: all .5s;
    white-space: nowrap;
}
.wz-ml-dh .wz-ml-dh-md div:hover {
    // background-color: #e89e70;
    box-shadow: 0 0 10px 5px #e8e8e8;
    transition: all .5s;
}

// 点赞按钮
.wz-sc {
    width: 90%;
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
    width: 90%;
    height: 50px;
    background-color: #e9e25e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border-radius: 10px;
    transition: all .5s;
    cursor: grab;
}
</style>