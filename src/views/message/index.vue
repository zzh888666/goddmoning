<script setup>
import { onMounted, ref } from 'vue'; 
import {addMessage} from '@/apis/message.js'

const show = ref(false)

const textarea = ref()


onMounted(()=>{
    show.value = true

})

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
   <Transition>
    <div class="message-common-layout" v-if="show">
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
   </Transition>

</template>

<style>


.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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