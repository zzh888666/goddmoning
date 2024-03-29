<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getUserInfo,updateUserInfo,updateUserPwd } from '@/apis/userAPI';
import { userLoginStore } from '@/stores/user';
import md5 from 'js-md5';
const show = ref(false)

const userStor = userLoginStore()

const router = useRouter()

const toCollect = ()=>{
    router.push({
        path:'/user/collect'
    })
}

const toCenter = () => {
    router.push('/user/center')
}

const userinfo = ref({
    photoUrl:''
})
onMounted(async()=>{
    show.value = true
    const res =  await getUserInfo()
    userinfo.value = res.data
})


//弹出框
const centerDialogVisible = ref(false)
const noLogindia = ()=>{
    centerDialogVisible.value=true
}
const noLogin =()=>{
    userStor.clearToken()
    centerDialogVisible.value=true
    router.push('/login')
}



// 修改资料
const infodia = ref(false)

const info = ref({
    email:"",
    phone:'',
    sex:''
})

const updateInfo = (formEl)=>{
    if (!formEl) return
    formEl.validate((valid, fields) => {
    if (valid) {
        if (info.value.phone=='' && info.value.email=='' &&  info.value.sex=='') {
                    ElNotification({
                    title: '警告',
                    message: "请输入一个值",
                    type: 'warning',
                })
                return
            }

        updateUserInfo(info.value).then(res=>{
            if(res.code == 0){
                ElNotification({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                })
                infodia.value = false
                info.value.email = ''
                info.value.phone = ''
                info.value.sex = ''
            }else {
                ElNotification({
                    title: '失败',
                    message: "操作失败",
                    type: 'error',
                })
                infodia.value = false
                info.value.email = ''
                info.value.phone = ''
                info.value.sex = ''
            }
        })


    } else {
    ElNotification({
            title: '警告',
            message: "请输入正确格式",
            type: 'warning',
        })
    }
  })
}










//验证
const pwdFormRef = ref()
const infoFormRef = ref()
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (pwd.value.rePwd !== '') {
      if (!pwdFormRef.value) return
      pwdFormRef.value.validateField('rePwd', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== pwd.value.newPwd) {
    callback(new Error("两次密码不配"))
  } else {
    callback()
  }
}




const rules = ref({
    email:[
         {pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message:'请输入正确的邮箱格式' , trigger:'blur'}
    ],
    phone:[
        // {max:11,min:11, message:'请输入正确手机号' , trigger:'blur'},
        {pattern:/^1([38][0-9]|5[0-35-9]|6[6]|7[0135678]|9[89])\d{8}$/, message:'请输入正确手机号' , trigger:'blur'}
    ],
  
    oldPwd:[
        { required: true, message: '不能为空', trigger: 'blur' },
        {pattern:/^[a-zA-Z]\w{5,17}$/, message:'以字母开头，长度在6~18之间，只能包含字母和数字' , trigger:'blur'}

    ],
    newPwd:[
         { required: true, validator: validatePass, trigger: 'blur' },
         {pattern:/^[a-zA-Z]\w{5,17}$/, message:'以字母开头，长度在6~18之间，只能包含字母和数字' , trigger:'blur'}
    ],
    rePwd:[
        { required: true, validator: validatePass2, trigger: 'blur' }
    ]
})


//修改密码
const pwddia = ref(false)
const pwd = ref({
    oldPwd:"",
    newPwd:"",
    rePwd:""
})


const updatePwd = (formEl) =>{
    if (!formEl) return
    formEl.validate((valid, fields) => {
    if (valid) {
        
        updateUserPwd({
            oldPwd:md5(pwd.value.oldPwd),
            newPwd:md5(pwd.value.newPwd),
            rePwd:md5(pwd.value.rePwd)
        }).then(res => {
            if(res.code == 0){
                ElNotification({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                })
                pwd.value.newPwd = ''
                pwd.value.oldPwd = ''
                pwd.value.rePwd = ''
                pwddia.value = false
                router.push('/login')
            }else {
                ElNotification({
                    title: '失败',
                    message: res.message,
                    type: 'error',
                })
                pwd.value.newPwd = ''
                pwd.value.oldPwd = ''
                pwd.value.rePwd = ''
            }
        })


    } else {
        ElNotification({
            title: '警告',
            message: "请输入正确格式",
            type: 'warning',
        })
    }
  })
}


const closeinfodia = () =>{
    info.value.email =''
    info.value.phone = ''
    info.value.sex = ''
    infodia.value = false
}

const closepwddia = ()=>{
    pwd.value.newPwd = ''
    pwd.value.oldPwd = ''
    pwd.value.rePwd = ''
    pwddia.value = false
}

</script>

<template>
    <Transition>
        <div class="user-center-main" v-if="show">
        <div class="center-left">
            <div class="center-left-top">
                <div class="user-img">
                    <img :src="userinfo.photoUrl" alt="">
                </div>
                <div class="user-name">
                    {{ userinfo.name }}
                </div>
            </div>
            <div class="center-left-list">
                <ul>
                    <li @click="toCenter">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-shenfenzheng"></use>
                        </svg>
                        <span>个人资料</span>
                    </li>
                    <li @click="toCollect">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-shoucang2"></use>
                        </svg>
                        <span>个人收藏</span>
                    </li>

                    <li @click="infodia = true">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-wodeyouxiang"></use>
                        </svg>
                        <span>修改资料</span>
                    </li>
                    <li @click="pwddia = true">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-liulan"></use>
                        </svg>
                        <span>修改密码</span>
                    </li>

                    <li @click="noLogindia">
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-tuichu"></use>
                        </svg>
                        <span>退出登录</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="center-right">
            <div class="center-right-main">
                
                <RouterView/>
            </div>
        </div>
    </div>
    </Transition>
<el-dialog v-model="centerDialogVisible" title="警告" width="500" center>
    <span>
      确定要退出么
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="noLogin">
            确认
        </el-button>
      </div>
    </template>
  </el-dialog>


    <!-- 修改资料 222222222222222222-->
  <el-dialog
    v-model="infodia"
    title="请输入资料"
    width="500"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >


    <el-form
    label-width="auto"
    :model="info"
    style="max-width: 600px"
    :rules="rules"
    ref="infoFormRef"
    >
        <el-form-item label="邮箱" prop='email'>
        <el-input v-model="info.email" />
        </el-form-item>
        <el-form-item label="手机"  prop='phone'>
        <el-input v-model="info.phone" />
        </el-form-item>
        <el-form-item label="性别">
            <el-select
            v-model="info.sex"
            clearable
            placeholder="Select"
            style="width: 240px"
            >
                <el-option label="男" value="0"/>
                <el-option label="女" value="1"/>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="closeinfodia">取消</el-button>
            <el-button type="primary" @click="updateInfo(infoFormRef)">
            提交
            </el-button>
        </el-form-item>
    </el-form>



    <template #footer>
      <div class="dialog-footer">
        
      </div>
    </template>
  </el-dialog>

<!-- 修改密码 /**************** */-->
    <el-dialog
    v-model="pwddia"
    title="修改密码"
    width="500"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    
  
  <el-form
    ref="pwdFormRef"
    label-width="auto"
    :model="pwd"
    style="max-width: 600px"
    :rules="rules"
    
    >
        <el-form-item label="旧密码" prop='oldPwd'>
            <el-input v-model="pwd.oldPwd" show-password type="password" />
        </el-form-item>

        <el-form-item label="新密码"  prop='newPwd'>
            <el-input v-model="pwd.newPwd" show-password type="password" />
        </el-form-item>

        <el-form-item label="再次输入密码"  prop='rePwd'>
            <el-input v-model="pwd.rePwd" show-password type="password" />
               
        </el-form-item>
        <el-form-item>
                <el-button @click="closepwddia">取消</el-button>
                <el-button type="primary" @click="updatePwd(pwdFormRef)">
                提交
                </el-button>
        </el-form-item>
    </el-form>



    <template #footer>
      
    </template>
  </el-dialog>

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


.user-center-main {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: #f1f4f9;
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
/* 左侧区域 */
.center-left {
    width: 15%;
    height: 95%;
    background-color: #fff;
    margin-left: 10px;

    border-radius: 10px;
    

}
/* 左侧区域顶部 */
.center-left-top {
    width: 100%;
    height: 25%;
    
    background-image: linear-gradient(to top, #2ed2ec 0%, #93bae0 1%, #61d2e3 100%);

    border-radius: 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.user-img {
    width: 70%;
    height: 60%;

}
.user-img img{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    border-radius: 10px;
    object-fit: cover;
}
.user-name {
    width: 50%;
    height: 50%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.center-left-list {
    width: 100%;
    height: 500px;
}
.center-left-list ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 20px;
}
.center-left-list ul li {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
    cursor: grab;
    
}
.center-left-list ul li svg {
    font-size: 20px;
}

.center-left-list ul li:hover {
    background-color: #f0f0f0;
}
/* 右侧区域 */
.center-right {
    width: 78%;
    height: 90%;
    background-color: #fff;
    border-radius: 10px;

}
.center-right-main{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
}


</style>