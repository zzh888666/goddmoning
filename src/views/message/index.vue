<script setup>
import { ref } from 'vue'; 
import {addMessage} from '@/apis/message.js'
const textarea = ref()

const messagebut =  () => {
    addMessage({message:textarea.value.trim()}).then(res=>{
        if(res.code == 0){
            ElNotification({
                title: '成功',
                message: '提交成功',
                type: 'success',
            })
            textarea.value = ''
        }else {
            ElNotification({
                title: '失败',
                message: '提交失败',
                type: 'error',
            })
            textarea.value = ''
        }
    })
}

</script>

<template>
    <div class="message-common-layout">
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-row class="row-bg" justify="center">
                    <el-col :span="15">
                        <el-input
                            v-model="textarea"
                            maxlength="100"
                            :rows="20"
                            style="width: 100%;"
                            placeholder="内容不得超过50字"
                            show-word-limit
                            type="textarea"
                        />
                    </el-col>
                    <el-col :span="15" class="m-but">
                        <el-button type="primary" @click="messagebut">提交</el-button>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
  </div>

</template>

<style>
.message-common-layout {
    width: 100%;
    height: 100%;
}

.m-but {
    margin-top: 20px;
    display: flex;
    justify-content: center;

}
</style>