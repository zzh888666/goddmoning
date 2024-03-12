<script setup>
import {ref} from 'vue'
//显示与隐藏选中框效果
const isShow = ref(false)
// const isNotShow = ref(true)

const middleMove = ()=>{
    isShow.value = true
}
const middleMouseleave = ()=> {
    isShow.value = false
}
//导航栏数据

const mainNav = ref([
    {
        t: '--t:10%;',
        icon:'#icon-shouye-tianchong',
        title:'首页'
    },
    {
        t:'--t:20%;',
        icon:'#icon-jiaocheng1',
        title:'教程'
    },
    {
        t:'--t:30%;',
        icon:'#icon-dianpu',
        title:'商店'
    },
    {
        t:'--t:40%;',
        icon:'#icon-liaotian',
        title:'聊天'
    },
    {
        t:'--t:50%;',
        icon:'#icon-tupian',
        title:'图像'
    },
    {
        t:'--t:60%;',
        icon:'#icon-wode',
        title:'我的'
    },
    {
        t:'--t:70%;',
        icon:'#icon-shezhi',
        title:'设置'
    },
    {
        t:'--t:80%;',
        icon:'#icon-yijianfankui',
        title:'反馈'
    }
])

</script>

<template>
    <div class="container" @mouseenter="middleMove" @mouseleave="middleMouseleave">
        <!-- --t是自定义属性，通过var函数可调用 -->
        <li v-for="(item,index)  in mainNav" :key="index" :style=" item.t ">
            <a href="#">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                <span>{{ item.title }}</span>
            </a>

        </li>
        <div class="top"></div>
        <div :class="{showMiddle:isShow}"></div>
        <div class="bottom"></div>
    </div>
</template>

<style >

.container{
    width: 40px;
    height: 70vh;
    /* width: 100%;
    height: 100%; */
    /* 绝对固定定位 */
    position: fixed;
    left: 0;
    /* 垂直居中 */
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    box-shadow: 1px 1px 5px 1px rgba(109, 109, 109, 0.5) ;
    /* 右上右下圆角 */
    border-radius: 0 5px 5px 0;
    overflow: hidden;
    /* 动画过渡 */
    transition: 0.3s;
    z-index: 10000;

}
.container:hover{
    /* 鼠标移入，展开+改变圆角大小 */
    width: 130px;
    border-radius: 0 10px 10px 0;
}
.container:hover li a{
    /* 鼠标移入，改变字体颜色 */
    color: #000000;
    /* font-size: 20px; */
}

.container::before{
    content: "";
    width: 5%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    /* background-color: #66CCCC; */
    background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
}
.container .top{
    width: calc(100% - 30px);
    margin-left: 30px;
    height: 10%;
    background-color: #ffffff;

    border-radius: 0 0 0 20px;
    /* 动画过渡 */
    transition: 0.2s;
}
.container .showMiddle{
    width: calc(100% - 2px);
    /* width: 100%; */
    height: 9%;
    /* background-color: #66CCCC; */
    background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
    /* margin-left: 1px; */
    border-radius:0 20px 20px 0;
}

.container .bottom{
    width: calc(100% - 30px);
    height: 100%;
    margin-left: 30px;
    background-color: #ffffff;

    border-radius: 20px 0 0 0;
}
.container li{
    /* 绝对定位 */
    position: absolute;
    /* 通过var函数调用自定义属性--t */
    top: var(--t);
    width: 100%;
    height: 10%;
    font-size: 30px;
    /* 弹性布局 水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
}
.container li a{
    position:relative;
    width: 100%;
    height: 100%;
    /* height: 100%; */
    /* 字体颜色透明 */
    font-size: 30px;
    /* color: transparent; */
    /* 动画过渡 */
}
.container li a svg {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
    
}
/* .container:hover li a svg {
    left: 23%;
} */
.container li a span {
    /* display:none; */
    font-size: 25px;
    color: transparent;
    transition: all 0s;
    
}
/* 鼠标悬停显示文字 */
.container:hover  li a span {
    /* display: inline; */
    position: absolute;
    color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-40%, -50%);
    transition: all .3s;

}
/* 分别为每一个li元素设置.top的高度 */
/* ~是兄弟选择器 */
.container li:nth-child(1):hover ~ .top{
    height: 10%;
}
.container li:nth-child(2):hover ~ .top{
    height: 20%;
}
.container li:nth-child(3):hover ~ .top{
    height: 30%;
}
.container li:nth-child(4):hover ~ .top{
    height: 40%;
}
.container li:nth-child(5):hover ~ .top{
    height: 50%;
}
.container li:nth-child(6):hover ~ .top{
    height: 60%;
}
.container li:nth-child(7):hover ~ .top{
    height: 70%;
}
.container li:nth-child(8):hover ~ .top{
    height: 80%;
}
</style>






