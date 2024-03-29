<script setup>
import {ref,onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { userLoginStore } from '@/stores/user';
import { addUser } from '@/apis/userAPI';
import { useRouter } from 'vue-router'
import md5 from 'js-md5';

const show  = ref(false)

onMounted(()=>{
    show.value = true
})

const router = useRouter()
//切换动画效果
let cntisGx = ref(false);
let contHiden = ref(false);
let circleIstxr = ref(false);
let isTxl = ref(false)
let isZ = ref(false)
const switchonoff = ()=>{
    cntisGx.value = !cntisGx.value
    setTimeout(() => {
        cntisGx.value = !cntisGx.value
    }, 1500);
    contHiden.value = !contHiden.value
    circleIstxr.value = !circleIstxr.value
    isTxl.value = !isTxl.value
    isZ.value = !isZ.value
}


//表单
const labelPosition = ref('right')

const formLabelAlign = ref({
  name: '',
  pwd: '',
  checkpwd: '',
})
const ruleFormRef = ref()
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (formLabelAlign.value.checkpwd !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkpwd', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== formLabelAlign.value.pwd) {
    callback(new Error("两次密码不配"))
  } else {
    callback()
  }
}


const rules = ref({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '用户名长度3-5', trigger: 'blur' },
    ],
    pwd: [

         { required: true, validator: validatePass, trigger: 'blur' },

        // {required: true, message:'请输入密码',trigger:'失去焦点'},
        {pattern:/^[a-zA-Z]\w{5,17}$/, message:'以字母开头，长度在6~18之间，只能包含字母和数字' , trigger:'blur'}
    ],
    checkpwd: [
        { required: true, validator: validatePass2, trigger: 'blur' }
    ]
})
//注册
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      addUser({username:formLabelAlign.value.name,password:md5(formLabelAlign.value.pwd)}).then(res=>{
        if (res.code == 0) {
            ElNotification({
                title: '成功',
                message: '注册成功，请登录',
                type: 'success',
            })
            formLabelAlign.value.name=''
            formLabelAlign.value.pwd=''
            formLabelAlign.value.checkpwd=''
        }
      })


    } else {
      return false
    }
  })
}


//登录

const store = userLoginStore()

const {userlogin} = store

const loginruleFormRef = ref()
const loginform = ref({
    name:'',
    pwd:''
})


const login = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
        userlogin({username:loginform.value.name,pwd:md5(loginform.value.pwd)}).then(res=>{
            if (res.code == 0) {
                ElNotification({
                    title: '成功',
                    message: '登录成功',
                    type: 'success',
                })
                router.push('/')
            }else {
                ElNotification({
                    title: '登录失败',
                    message: '请检查用户名或密码',
                    type: 'error',
                })
            }
         })
        
    } else {
      return false
    }
  })
}
</script>


<template>
<div class="simplebody">
    <Transition>
        <div class="shell" v-if="show">
        <div :class="{simpelcontainer:true, 'a-container':true,'is-txl':isTxl}" id="a-container">
            <form action="" method="" class="form" id="a-form">
                <h2 class="form_title title">创建账号</h2>
                
                <el-form
                class="zcform"
                    ref="ruleFormRef"
                    label-width="auto"
                    :model="formLabelAlign"
                    style="max-width: 600px"
                    status-icon
                    :rules="rules"
                >
                    <el-form-item label="姓名" prop="name">
                         <el-input v-model="formLabelAlign.name" />
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input v-model="formLabelAlign.pwd" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input v-model="formLabelAlign.checkpwd" type="password" autocomplete="off" />
                    </el-form-item>

                   
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            注册
                        </el-button>
                  
                </el-form>

            </form>
        </div>
        


        <div :class="{'simpelcontainer':true, 'b-container':true,'is-txl':isTxl,'is-z':isZ}" id="b-container">
            <form action="" method="" class="form" id="b-form">
                <h2 class="form_title title">登入账号</h2>
                

                <el-form
                class="loginform"
                    ref="loginruleFormRef"
                    :label-position="labelPosition"
                    label-width="auto"
                    :model="loginform"
                    style="max-width: 600px"
                    status-icon
                    :rules="rules"
                >
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="loginform.name" />
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd"> 
                        <el-input v-model="loginform.pwd" type="password"/>
                    </el-form-item>
                    <el-button type="primary" @click="login(loginruleFormRef)">
                            登录
                        </el-button>
                </el-form>
            </form>
        </div>

        <div :class="{ 'switch': true , 'is-gx': cntisGx,'is-txr':circleIstxr}" id="switch-cnt">
          

            
            <div :class="{'switch_container':true,'is-hidden':contHiden}" id="switch-c1">
                <h2 class="switch_title title" style="letter-spacing: 0;">欢迎光临本站</h2>
                <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                <button class="switch_button button switch-btn" @click="switchonoff">登入</button>
            </div>

            <div :class="{'switch_container':true,'is-hidden':!contHiden}" id="switch-c2">
                <h2 class="switch_title title" style="letter-spacing: 0;">你好</h2>
                <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                <button class="switch_button button switch-btn" @click="switchonoff">注册</button>
            </div>
        </div>
    </div>
    </Transition>

</div>

</template>

<style lang="scss">


.v-enter-active {
  animation: bounce-in 0.6s;
}
.v-leave-active {
  animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-500px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.loginform,
.zcform{
    width: 50%;
    height: 40%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
}

.simplebody {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #a0a5a8;
    background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
    border-radius: 360px 360px 0 0 ;
} 
.shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    // background-color: #ecf0f3;
    box-shadow: 20px 20px 20px #ffffff, -20px -20px 20px #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    transition: all .5s;


}

/* 设置响应式 */
@media (min-width: 2000px) {
    .shell {
        transform: scale(2);
        transition: all .5s;
    }
}
@media (min-width: 1800px) {
    .shell {
        transform: scale(1.5);
        transition: all .5s;
    }
}
@media (min-width: 1500px) {
    .shell {
        transform: scale(1.3);
        transition: all .5s;
    }
}
@media (max-width: 1200px) {
    .shell {
        transform: scale(0.7);
        transition: all .5s;
    }
}

@media (max-width: 1000px) {
    .shell {
        transform: scale(0.6);
        transition: all .5s;
    }
}

@media (max-width: 800px) {
    .shell {
        transform: scale(0.5);
        transition: all .5s;
    }
}

@media (max-width: 600px) {
    .shell {
        transform: scale(0.4);
        transition: all .5s;
    }
}



.simpelcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: 1.25s;

    
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.iconfont {
    margin: 0 5px;
    border: rgba(0, 0, 0, 0.5) 2px solid;
    border-radius: 50%;
    font-size: 25px;
    padding: 3px;
    opacity: 0.5;
    transition: 0.1s;
}

.iconfont:hover {
    opacity: 1;
    transition: 0.15s;
    cursor: pointer;
}

.form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px !important;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
    margin-top: 30px;
    margin-bottom: 12px;
}

.form_link {
    color: #181818;
    font-size: 15px;
    margin-top: 25px;
    border-bottom: 1px solid #a0a5a8;
    line-height: 2;
}

.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
}

.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.a-container {
    z-index: 100;
    left: calc(100% - 600px);
}

.b-container {
    left: calc(100% - 600px);
    z-index: 0;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
    // display: none;
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
}

.switch_button {
    cursor: pointer;
}

.switch_button:hover,
.submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
    box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
}

.is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}

.is-gx {
    animation: is-gx 1.25s;
}

@keyframes is-gx {

    0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
} 

</style>