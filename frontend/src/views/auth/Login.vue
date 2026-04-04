<template>
  <div class="login-page">
    <!-- Background Decorations -->
    <div class="bg-decoration bubble-1"></div>
    <div class="bg-decoration bubble-2"></div>
    <div class="bg-decoration bubble-3"></div>

    <!-- Login Container -->
    <div class="login-container">
      <div class="login-header">
        <div class="logo-section">
          <div class="floating-logo">
            <el-icon size="48"><UserFilled /></el-icon>
          </div>
          <h1 class="welcome-title">欢迎回来！</h1>
          <p class="welcome-subtitle">继续记录毛孩子的美好时光</p>
        </div>
      </div>

      <div class="login-card">
        <div class="card-header">
          <h2 class="card-title">铲屎官登录</h2>
          <p class="card-subtitle">让我们重新连接你的毛孩子吧</p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          @submit.prevent="handleLogin"
          class="login-form"
        >
          <el-form-item prop="account" class="form-item">
            <el-input
              v-model="form.account"
              placeholder="输入邮箱或手机号"
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
              placeholder="输入你的密码"
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
              <span v-if="!loading">进入毛孩子世界</span>
              <span v-else>登录中...</span>
            </el-button>
          </div>
        </el-form>

        <div class="footer-links">
          <p>还没有账号？
            <a href="/register" class="register-link" @click.stop="handleNavigate('/register')">快来加入吧！</a>
          </p>
        </div>
      </div>

      <!-- Mascot -->
      <div class="mascot-section">
        <div class="mascot floating">
          🐱
          <div class="sparkle"></div>
        </div>
        <div class="mascot dog-mascot floating" style="animation-delay: 2s;">
          🐶
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, UserFilled } from '@element-plus/icons-vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

function handleNavigate(path: string) {
  console.log('Login - Navigation clicked:', path)
  console.log('Router instance:', router)
  try {
    router.push(path)
  } catch (error) {
    console.error('Login navigation failed:', error)
    window.location.href = path
  }
}

const form = reactive({
  account: '',
  password: ''
})

const rules: FormRules = {
  account: [
    { required: true, message: '请输入邮箱或手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const res = await authApi.login(form)
    if (res.data) {
      userStore.setUser(res.data.user)
      userStore.setToken(res.data.tokens.accessToken)
      localStorage.setItem('refreshToken', res.data.tokens.refreshToken)

      ElMessage.success('欢迎回来！')

      // 跳转到之前的页面或首页
      const redirect = route.query.redirect as string
      router.push(redirect || '/')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
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
  left: 20%;
  animation: float 12s ease-in-out infinite reverse;
}

.bubble-3 {
  width: 100px;
  height: 100px;
  background: var(--color-yellow);
  top: 50%;
  right: 10%;
  animation: float 10s ease-in-out infinite;
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px;
}

.login-header {
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

.login-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--hover-shadow);
  width: 100%;
  max-width: 480px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--primary-gradient);
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

.login-form {
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

.register-link {
  color: var(--color-pink);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-soft);
}

.register-link:hover {
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
  .login-container {
    flex-direction: column;
    padding: 20px;
  }

  .login-card {
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
