<template>
  <div class="test-page">
    <h1>测试页面</h1>
    <p>如果能看到这个页面，说明路由正常工作</p>

    <div class="test-section">
      <h3>按钮点击测试：</h3>
      <div class="test-buttons">
        <el-button type="primary" @click="testClick">测试按钮</el-button>
        <el-button @click="testNavigate">跳转到首页</el-button>
        <el-button @click="testConsole">控制台输出</el-button>
      </div>
    </div>

    <div class="test-section">
      <h3>用户状态信息：</h3>
      <div class="test-info">
        <p>是否登录：{{ userStore.isLoggedIn }}</p>
        <p>用户信息：{{ userStore.user || '未登录' }}</p>
        <p>Token 存在：{{ !!userStore.token }}</p>
      </div>
    </div>

    <div class="test-section">
      <h3>当前路由信息：</h3>
      <div class="test-info">
        <p>路径：{{ route.path }}</p>
        <p>名称：{{ route.name }}</p>
      </div>
    </div>

    <div class="test-section">
      <h3>导航测试：</h3>
      <div class="test-buttons">
        <el-button @click="testDirectNavigate('/pets', 'pets')">跳转到我的毛孩子</el-button>
        <el-button @click="testDirectNavigate('/social', 'social')">跳转到宠物广场</el-button>
        <el-button @click="testDirectNavigate('/login', 'login')">跳转到登录页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

function testClick() {
  console.log('测试按钮被点击了！')
  alert('按钮点击成功！')
}

function testNavigate() {
  console.log('=== testNavigate called ===')
  console.log('Router instance:', !!router)
  console.log('Current path:', route.path)
  try {
    router.push('/')
  } catch (error) {
    console.error('Router push failed:', error)
    window.location.href = '/'
  }
}

function testConsole() {
  console.log('=== Console Output Test ===')
  console.log('当前路由信息：', route)
  console.log('用户状态检查...')
  console.log('User store state:', {
    isLoggedIn: userStore.isLoggedIn,
    user: userStore.user,
    token: !!userStore.token
  })

  // 检查 localStorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  console.log('LocalStorage:')
  console.log('- Token:', token)
  console.log('- User:', user)
}

function testDirectNavigate(path: string, name: string) {
  console.log(`=== Testing direct navigation to ${name} ===`)
  console.log('Path:', path)
  console.log('Router exists:', !!router)

  // 模拟点击事件
  console.log('Simulating click event...')

  try {
    console.log('Attempting router.push...')
    router.push(path)
    console.log(`✅ Navigation to ${name} initiated`)
  } catch (error) {
    console.error(`❌ Navigation to ${name} failed:`, error)
    console.log('Trying window.location...')
    window.location.href = path
  }
}
</script>

<style scoped>
.test-page {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
}

.test-section {
  margin-bottom: 40px;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.test-section h3 {
  color: var(--color-pink);
  margin-bottom: 16px;
  font-family: 'Bubblegum Sans', cursive;
}

.test-buttons {
  display: flex;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.test-info {
  background: white;
  padding: 16px;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-light-pink);
}

.test-info p {
  margin: 8px 0;
  color: var(--text-primary);
}

.test-info p:nth-child(1) {
  font-weight: 600;
  color: var(--color-pink);
}
</style>