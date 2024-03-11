
<!-- 卡片组件 -->
<script setup>
const url ='https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
</script>

<template>
    
      <div class="carddiv">
        <div class="cardimg">
          <img :src="url" alt="">
        </div>
        <div class="cardinfo">
          <div class="date_time">
              <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-rili"></use>
              </svg>
              <span>发布于 2024-03-10 17:09</span>
          </div>
          <div class="title">
            vue3项目
          </div>
          <div class="like">
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-remen"></use>
              </svg>
            <span>1000热度</span>
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi-24"></use>
              </svg>
            <span>20评论</span>
            <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-045_dianzan-23"></use>
              </svg>
            <span>520点赞</span>
          </div>
          <div class="info">
            <p>Vue.js 是一个渐进式的 JavaScript 框架</p>
            <p>可以帮助你轻松构建数据驱动的 web 界面。无论你是想要快速上手</p>
            <p>还是想要深入了解 Vue.js 的高级特性，你都可以在这个网站</p>
            
          </div>
          <div class="tag">
            <el-tag type="primary">Tag 1</el-tag>
            <el-tag type="success" style="margin-left: 10px;">Tag 2</el-tag>
          </div>
        </div>
      </div> 
</template>


<style lang="scss">

.carddiv{
  position: relative;
  background-color: #fff;
  width: 21vw;
  height: 350px;
  max-width: 500px;
  min-width: 300px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 1);
}
/* 卡片图片模块 */
.carddiv .cardimg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 350px;
  
}
.carddiv img {
  width: 100%;
  height: 350px;
  z-index: 1;
  border-radius: 10px 10px 10px 10px;
}
/* 卡片信息模块 */
.carddiv .cardinfo {
  position: absolute;
  max-height: 280px;
  min-height: 200px;
  background-color: #fff;
  padding: 10px;
  bottom: 0;
  width: 100%;
  height: 180px;
  z-index: 1;
  border-radius: 0px 0px 10px 10px;
}
/* 发布时间 */
.cardinfo .date_time{
  height: 10px;
  
  color: $infoFont;
}
.cardinfo svg{
  font-size: 15px;
  margin-left: 2px;
}

.cardinfo .date_time span {
  height: 10px;
  margin-left: 5px;
}
/* 标题 */
.cardinfo .title {
  font-size: 20px;
  font-weight: 700;
  height: 20px;
  line-height: 20px;
  margin-left: 2px;
  margin-top: 20px;
}
/* 喜欢收藏 */
.cardinfo .like {
  height: 10px;
  line-height: 10px;
  margin-top: 20px;
}

.cardinfo .like span {
  color: $infoFont;
  margin-left: 1px;
}
/* 简介 */
.cardinfo .info {
  width: 100%;
  height: 50px;
  padding-top: 10px;
  font-size: 14px;
  margin-left: 3px;
  margin-top: 5px;
  /* 多行省略 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
}
/* 标签 */
.cardinfo .tag {
  margin-top: 15px;
  margin-left: 3px;
}

</style>

