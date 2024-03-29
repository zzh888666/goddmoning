

<template>
    
    <div class="but">
        <div class="butTop">
            读万里书行万里路
        </div>
        <div class="icp">
            <a href="http://beian.miit.gov.cn/">豫ICP备2023001693号</a>
        </div>
    </div>

    
</template>

<style lang="scss">
.but {
    // position: absolute;
    // bottom: 0;
    margin-top: 20px;
    width: 100%;
    height: 60px;
    background-color: $butColor;
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 1);
    position: relative;
    bottom: -50px;
    margin-top: 20px;
    z-index: -10;
}
.butTop,.icp {
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    

}
.but .icp a {
    font-size: 13px;
    // color: $infoFont;
    font-family: "微软雅黑";
}

</style>