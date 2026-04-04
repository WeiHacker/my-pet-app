<template>
  <div class="mock-login-page">
    <div class="mock-login-card">
      <h2>模拟登录测试</h2>
      <p>用于测试按钮功能的快速登录</p>

      <div class="form-group">
        <label>用户名：</label>
        <input v-model="username" type="text" placeholder="输入用户名" />
      </div>

      <div class="form-group">
        <label>邮箱（可选）：</label>
        <input v-model="email" type="email" placeholder="输入邮箱" />
      </div>

      <el-button type="primary" @click="handleMockLogin" class="btn-login">
        模拟登录
      </el-button>

      <div class="actions">
        <el-button @click="clearStorage">清除存储</el-button>
        <el-button @click="checkStorage">查看存储</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const email = ref('')

function handleMockLogin() {
  if (!username.value.trim()) {
    ElMessage.warning('请输入用户名')
    return
  }

  // 创建模拟用户
  const mockUser = {
    id: Date.now(),
    nickname: username.value,
    email: email.value || `${username.value}@example.com`,
    avatar: '',
    createdAt: new Date().toISOString()
  }

  // 设置用户信息
  userStore.setUser(mockUser)
  userStore.setToken('mock-token-' + Date.now())
  // 保存用户信息到 localStorage
  localStorage.setItem('user', JSON.stringify(mockUser))

  ElMessage.success('模拟登录成功！')
  console.log('Mock login:', mockUser)
  console.log('User store after login:', userStore)

  // 跳转到首页
  router.push('/')
}

function clearStorage() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  userStore.logout()
  ElMessage.success('存储已清除')
}

function checkStorage() {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  console.log('Token:', token)
  console.log('User:', user)
  ElMessage.info('请查看控制台')
}
</script>

<style scoped>
.mock-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0ec 100%);
}

.mock-login-card {
  background: white;
  padding: 48px;
  border-radius: var(--radius-xl);
  box-shadow: var(--hover-shadow);
  max-width: 400px;
  width: 100%;
}

.mock-login-card h2 {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 32px;
  color: var(--color-pink);
  margin-bottom: 16px;
  text-align: center;
}

.mock-login-card p {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-light-pink);
  border-radius: var(--radius-md);
  font-size: 16px;
  transition: var(--transition-soft);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-pink);
  box-shadow: 0 0 0 4px var(--color-light-pink);
}

.btn-login {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions .el-button {
  flex: 1;
}
</style>