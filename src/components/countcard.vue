
<script setup>
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

</script>

<template>
    <div class="countcard">
        <div class="countcard-top">
            <el-image class="countcard-img" style="width: 210px; height: 210px" :src="url" :fit="cover" />
        </div>
        <div class="countcard-left-corner"></div>
        <div class="countcard-main">
            
            <div class="countcard-text">
                <h3>github项目每日统计</h3>
                <p>
                      每日早上7:00点刷新
                </p>
            </div>
            <div class="countcard-count">
                <div class="count-num">
                    <span>1031</span>
                    <span>156</span>
                    <span>5646</span>
                </div>
                <div class="count-explain">
                    <span>总收录统计</span>
                    <span>今日访问量</span>
                    <span>今日新增项目</span>
                </div>
            </div>
        </div>



        <div class="countcard-but">
            
            <!-- <el-button type="primary" >主页</el-button> -->
        </div>
    </div>

</template>

<style lang="scss">
.countcard {
    width: 300px;
    height: 350px;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px rgba(204, 204, 204, .5);
    padding: 30px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(215,168,227,1) 11%, rgba(205,194,232,1) 20%, rgba(169,186,235,1) 31%, rgba(116,211,226,1) 59%, rgba(120,222,155,1) 76%, rgba(148,187,233,1) 100%);
    background-size: 400%;
    animation: liuguang 40s infinite;
}
/**背景流光 */
@keyframes liuguang {
    100% {
        background-position: -400% 0;
    }
}
/**用户头像 部分*/
.countcard-top {
    flex: 2;
    position: absolute;
    top: -60px;
    width: 230px;
    height: 230px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}
.countcard-top .countcard-img {
    border-radius: 5px;
}
.countcard-left-corner {
    position: absolute;
    top: -10px;
    left: 0;
    width: 60px;
    height: 50px;
    border-radius: 10px;
}
/**主体部分 */
.countcard-main {
    margin-top: 150px;
}

.countcard-main .countcard-text {
    height: 50px;
    text-align: center;
}
.countcard-main .countcard-text p{
    font-weight: 100 ;
    font-size: 15px;
    margin-top: 10px;
}
.countcard-main .countcard-text h3 {
    font-size: 20px ;
}
.countcard-main .countcard-count {
    width: 100%;
    height: 70%;
    margin-top: 50px;
}
/**统计数字 */
.countcard-count .count-num {
   
    height: 30px;
}
.countcard-count .count-num span {
    float: left;
    font-size: 15px;
    width: 80px;
    height: 20px;
    text-align: center;
    border-right: 1px solid rgba(222, 222, 222, 1);
}
.countcard-count .count-num span:nth-child(3) {
    border: 0;
}
/**统计说明 */
.countcard-count .count-explain {
    height: 30px;
}
.countcard-count .count-explain span{
    float: left;
    font-size: 15px;
    width: 80px;
    height: 20px;
    text-align: center;
}
/**下部分 */
.countcard-but {
    flex: 2;
}
</style>