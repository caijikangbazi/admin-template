<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>
      <!--   username    -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input :placeholder="$t('msg.login.placeholder')" clearable v-model="loginForm.username" type="text" />
      </el-form-item>
      <!--   password    -->
      <el-form-item prop="password">
         <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input :placeholder="$t('msg.login.placeholder')" clearable name="password" v-model="loginForm.password" :type="passwordType" />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="pwdIcon"></svg-icon>
        </span>
      </el-form-item>

      <el-button @click="handleLogin" :loading="loading" type="primary" style="width: 100%;margin-bottom: 30px;">
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect'
import { ref } from 'vue'
import { validatePassword } from '@/views/login/rules'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框 文本显示
const passwordType = ref('password')
const pwdIcon = ref('eye')

const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
    pwdIcon.value = 'eye-open'
  } else {
    passwordType.value = 'password'
    pwdIcon.value = 'eye'
  }
}

const loading = ref(false)
const loginFormRef = ref(null)
const store = useStore()
const handleLogin = () => {
  // 1. 表单校验
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value).then(() => {
      loading.value = false
    }).catch(err => {
      loading.value = false
      console.log(err)
    })
  })
  // 2. 触发登录动作
  // 3. 进行登录后处理
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        background-color: transparent;
        width: 100%;
        box-shadow: none !important;
      }
      .is-focus{
        box-shadow: none;
      }

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  :deep(.lang-select) {
    position: absolute;
    top: 4px;
    right: 0;
    background: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
