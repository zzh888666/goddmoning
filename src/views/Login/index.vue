<script setup>
import simpleLogin from '@/components/Login/simpleLogin.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const toHome = () => {
    router.push('/')
}

</script>

<template>
    <div class="login-header">
        <el-button type="primary" @click="toHome">主页</el-button>
    </div>
    <!-- <water/> -->
    <simpleLogin/>
</template>

<style lang="scss">
.login-header {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>