<template>
  <div class="register-page">
    <!-- Background Decorations -->
    <div class="bg-decoration bubble-1"></div>
    <div class="bg-decoration bubble-2"></div>
    <div class="bg-decoration bubble-3"></div>
    <div class="bg-decoration bubble-4"></div>

    <!-- Register Container -->
    <div class="register-container">
      <div class="register-header">
        <div class="logo-section">
          <div class="floating-logo">
            <el-icon size="48"><UserFilled /></el-icon>
          </div>
          <h1 class="welcome-title">加入毛孩子大家庭</h1>
          <p class="welcome-subtitle">让每个毛孩子都能得到最好的照顾</p>
        </div>
      </div>

      <div class="register-card">
        <div class="card-header">
          <h2 class="card-title">创建铲屎官账号</h2>
          <p class="card-subtitle">开启你的毛孩子管理之旅</p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          @submit.prevent="handleRegister"
          class="register-form"
        >
          <el-form-item prop="email" class="form-item">
            <el-input
              v-model="form.email"
              placeholder="输入你的邮箱"
              class="input-cute"
              size="large"
            >
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="phone" class="form-item">
            <el-input
              v-model="form.phone"
              placeholder="输入手机号（选填）"
              class="input-cute"
              size="large"
            >
              <template #prefix>
                <el-icon><Phone /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="nickname" class="form-item">
            <el-input
              v-model="form.nickname"
              placeholder="起个可爱的昵称"
              class="input-cute"
              size="large"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="form-item">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="设置密码（至少8位）"
              class="input-cute"
              size="large"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="confirmPassword" class="form-item">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="再次输入密码"
              class="input-cute"
              size="large"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="form-actions">
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              class="btn-cute btn-submit"
              native-type="submit"
            >
              <span v-if="!loading">开始照顾毛孩子</span>
              <span v-else>注册中...</span>
            </el-button>
          </div>
        </el-form>

        <div class="footer-links">
          <p>已有账号？
            <a href="/login" class="login-link" @click.stop="handleNavigate('/login')">立即登录</a>
          </p>
        </div>
      </div>

      <!-- Mascots -->
      <div class="mascot-section">
        <div class="mascot cat-mascot floating">
          🐱
          <div class="sparkle"></div>
        </div>
        <div class="mascot dog-mascot floating" style="animation-delay: 1.5s;">
          🐶
        </div>
        <div class="mascot bunny-mascot floating" style="animation-delay: 3s;">
          🐰
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, UserFilled, Message, Phone } from '@element-plus/icons-vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

function handleNavigate(path: string) {
  console.log('Register - Navigation clicked:', path)
  console.log('Router instance:', router)
  try {
    router.push(path)
  } catch (error) {
    console.error('Register navigation failed:', error)
    window.location.href = path
  }
}

const form = reactive({
  email: '',
  phone: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码至少8位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ]
}

async function handleRegister() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const res = await authApi.register({
      email: form.email,
      phone: form.phone,
      nickname: form.nickname,
      password: form.password
    })

    if (res.data) {
      userStore.setUser(res.data.user)
      userStore.setToken(res.data.tokens.accessToken)
      localStorage.setItem('refreshToken', res.data.tokens.refreshToken)

      ElMessage.success('注册成功！欢迎加入毛孩子大家庭！')

      // 跳转到首页
      router.push('/')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0ec 100%);
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.bubble-1 {
  width: 200px;
  height: 200px;
  background: var(--color-pink);
  top: -100px;
  right: -100px;
  animation: float 15s ease-in-out infinite;
}

.bubble-2 {
  width: 150px;
  height: 150px;
  background: var(--color-blue);
  bottom: -75px;
  left: 10%;
  animation: float 12s ease-in-out infinite reverse;
}

.bubble-3 {
  width: 100px;
  height: 100px;
  background: var(--color-yellow);
  top: 20%;
  right: 20%;
  animation: float 10s ease-in-out infinite;
}

.bubble-4 {
  width: 80px;
  height: 80px;
  background: var(--color-purple);
  bottom: 40%;
  left: 60%;
  animation: float 8s ease-in-out infinite;
}

.register-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px;
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-section {
  margin-bottom: 40px;
}

.floating-logo {
  width: 80px;
  height: 80px;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: var(--button-shadow);
  animation: float 6s ease-in-out infinite;
}

.welcome-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 48px;
  color: var(--color-pink);
  margin-bottom: 12px;
}

.welcome-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.register-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--hover-shadow);
  width: 100%;
  max-width: 520px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.register-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(135deg, #ff9eb5 0%, #ffa8cc 50%, #ffb7d9 100%);
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.card-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 32px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.register-form {
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 24px;
}

.form-item .el-form-item__content {
  position: relative;
}

.input-cute {
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-light-pink);
}

.input-cute:focus {
  border-color: var(--color-pink);
  box-shadow: 0 0 0 4px var(--color-light-pink);
}

.form-actions {
  margin-top: 32px;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-submit:hover::before {
  width: 300px;
  height: 300px;
}

.btn-submit:hover {
  transform: translateY(-4px) scale(1.02);
}

.footer-links {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--color-light-pink);
}

.login-link {
  color: var(--color-pink);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-soft);
}

.login-link:hover {
  color: #ff6b95;
  text-decoration: underline;
}

.mascot-section {
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 20px;
}

.mascot {
  font-size: 60px;
  cursor: pointer;
  transition: var(--transition-bouncy);
}

.mascot:hover {
  transform: scale(1.2) rotate(10deg);
}

.mascot:hover .sparkle {
  display: inline;
}

.sparkle {
  display: none;
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 24px;
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    padding: 20px;
  }

  .register-card {
    padding: 32px 24px;
  }

  .mascot-section {
    position: static;
    margin-top: 40px;
  }

  .welcome-title {
    font-size: 36px;
  }

  .card-title {
    font-size: 28px;
  }
}
</style>