<template>
  <div class="main-layout">
    <!-- Top Navigation -->
    <header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo floating" @click.stop="handleNavigate('/')">
          <el-icon size="28"><CaretRight /></el-icon>
          <span class="logo-text">毛孩子管家</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="nav-menu">
          <div
            v-for="item in menuItems"
            :key="item.path"
            class="nav-item"
            :class="{ active: activeMenu === item.path }"
            @click.stop="handleNavigate(item.path)"
            @click.capture="console.log('Nav item clicked:', item)"
            style="cursor: pointer;"
          >
            <el-icon class="nav-icon">
              <component :is="getIconComponent(item.icon)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </div>
        </nav>

        <!-- Right Side -->
        <div class="header-right">
          <template v-if="isLoggedIn">
            <!-- Notifications -->
            <div class="notification-icon wobbling">
              <el-badge :value="notificationCount" class="badge-cute">
                <el-icon size="20"><Bell /></el-icon>
              </el-badge>
            </div>

            <!-- User Dropdown -->
            <el-dropdown trigger="click" @command="handleCommand" class="user-dropdown">
              <div class="user-info card-cute">
                <el-avatar :size="36" :src="userAvatar" class="avatar-cute">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="nickname">{{ userStore.user?.nickname || '铲屎官' }}</span>
                <el-icon class="dropdown-arrow"><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <div class="dropdown-menu-cute">
                  <div class="dropdown-item" @click="handleCommand('profile')">
                    <el-icon><User /></el-icon>
                    <span>我的小窝</span>
                  </div>
                  <div class="dropdown-item" @click="handleCommand('reminders')">
                    <el-icon><Bell /></el-icon>
                    <span>小闹钟</span>
                    <el-badge v-if="reminderCount > 0" :value="reminderCount" class="mini-badge" />
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item logout" @click="handleCommand('logout')">
                    <el-icon><SwitchButton /></el-icon>
                    <span>说拜拜</span>
                  </div>
                </div>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button
              class="btn-cute-small"
              @click.stop="handleNavigate('/mock-login')"
              @click.capture="console.log('快速登录 clicked')"
              style="cursor: pointer;"
            >
              快速登录测试
            </el-button>
            <el-button
              class="btn-cute-small"
              @click.stop="handleNavigate('/login')"
              @click.capture="console.log('正常登录 clicked')"
              style="cursor: pointer;"
            >
              正常登录
            </el-button>
            <el-button
              class="btn-signup"
              @click.stop="handleNavigate('/register')"
              @click.capture="console.log('注册 clicked')"
              style="cursor: pointer;"
            >
              注册账号
            </el-button>
          </template>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="slide-up" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-decoration">
          <span class="sparkle">🐾</span>
        </div>
        <p>用爱心陪伴 · 每一天都很重要 ❤️</p>
      </div>
    </footer>

    <!-- Decorative Bubbles -->
    <div class="decoration-bubble bubble-1"></div>
    <div class="decoration-bubble bubble-2"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import {
  CaretRight,
  Bell,
  User,
  ArrowDown,
  SwitchButton,
  HomeFilled,
  Avatar,
  ChatDotRound,
  Document
} from '@element-plus/icons-vue'

// 定义图标组件映射
const iconMap = {
  HomeFilled: HomeFilled,
  Avatar: Avatar,
  ChatDotRound: ChatDotRound,
  Document: Document,
  Bell: Bell,
  User: User,
  SwitchButton: SwitchButton
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const menuItems = [
  { path: '/', name: '首页', icon: 'HomeFilled' },
  { path: '/pets', name: '我的毛孩子', icon: 'Avatar' },
  { path: '/social', name: '宠物广场', icon: 'ChatDotRound' },
  { path: '/test', name: '测试页面', icon: 'Document' }
]

const activeMenu = computed(() => route.path)
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userAvatar = computed(() => userStore.user?.avatar || '')
const notificationCount = computed(() => 3)
const reminderCount = computed(() => 5)

function getIconComponent(iconName: string) {
  return iconMap[iconName] || Avatar
}

function navigateTo(item: any) {
  console.log('Navigating to:', item)
  router.push(item.path)
}

function handleNavigate(path: string) {
  console.log('=== handleNavigate called ===')
  console.log('Path:', path)
  console.log('Router instance:', !!router)
  console.log('User store state:', {
    isLoggedIn: userStore.isLoggedIn,
    user: userStore.user,
    token: !!userStore.token
  })

  // 检查点击事件是否真的触发了
  console.log('Click event triggered at:', new Date().toISOString())

  try {
    // 方法1: 使用 router.push
    console.log('Attempting router.push...')
    router.push(path)
    console.log('Router push initiated for:', path)
  } catch (error) {
    console.error('Router push failed:', error)

    // 方法2: 使用 window.location.href 作为后备
    console.log('Trying window.location.href as fallback')
    window.location.href = path
  }
}

async function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'reminders':
      router.push('/reminders')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm(
          '确定要离开了吗？我们会想你的~',
          '温馨提示',
          {
            confirmButtonText: '好的，再见',
            cancelButtonText: '再看看',
            type: 'warning',
            confirmButtonClass: 'btn-cute',
            cancelButtonClass: 'btn-signup'
          }
        )
        userStore.logout()
        router.push('/')
      } catch {
        // Cancel
      }
      break
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

.header {
  background: white;
  box-shadow: var(--card-shadow);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--color-light-pink);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: var(--color-pink);
  font-family: 'Bubblegum Sans', cursive;
  font-size: 24px;
  font-weight: 700;
}

.logo:hover {
  transform: scale(1.1);
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-soft);
  font-weight: 500;
}

.nav-item:hover {
  background: var(--color-light-pink);
  color: var(--color-pink);
  transform: translateY(-2px);
}

.nav-item.active {
  background: var(--primary-gradient);
  color: white;
  box-shadow: var(--button-shadow);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: var(--transition-soft);
}

.notification-icon:hover {
  background: var(--color-light-pink);
  transform: scale(1.1);
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  transition: var(--transition-soft);
}

.user-info:hover {
  background: var(--color-light-pink);
  transform: scale(1.05);
}

.avatar-cute {
  border: 3px solid var(--color-pink);
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.3);
}

.nickname {
  font-weight: 600;
  color: var(--text-primary);
}

.dropdown-arrow {
  color: var(--text-light);
  transition: var(--transition-soft);
}

.user-info:hover .dropdown-arrow {
  transform: rotate(180deg);
  color: var(--color-pink);
}

.btn-cute-small {
  background: var(--primary-gradient);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  box-shadow: var(--button-shadow);
  transition: var(--transition-bouncy);
}

.btn-cute-small:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 182, 193, 0.4);
}

.btn-signup {
  background: var(--color-light-pink);
  border: 2px solid var(--color-pink);
  color: var(--color-pink);
  border-radius: var(--radius-md);
  font-weight: 600;
  padding: 10px 20px;
  transition: var(--transition-bouncy);
}

.btn-signup:hover {
  background: var(--color-pink);
  color: white;
  transform: translateY(-2px) scale(1.05);
}

.main {
  flex: 1;
  padding: 40px 20px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background: white;
  border-top: 1px solid var(--color-light-pink);
  padding: 20px 0;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.footer-decoration {
  position: relative;
}

.dropdown-menu-cute {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--hover-shadow);
  padding: 8px;
  min-width: 200px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-soft);
  color: var(--text-primary);
}

.dropdown-item:hover {
  background: var(--color-light-pink);
  color: var(--color-pink);
  transform: translateX(4px);
}

.dropdown-item.logout {
  color: #ff6b6b;
}

.dropdown-item.logout:hover {
  background: #ffe0e0;
  color: #ff4757;
}

.dropdown-divider {
  height: 1px;
  background: var(--color-light-pink);
  margin: 8px 0;
}

.mini-badge {
  margin-left: auto;
}

/* Custom classes to match the cute theme */
.card-cute {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  transition: var(--transition-soft);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }

  .nav-item {
    font-size: 14px;
    padding: 10px 16px;
  }

  .main {
    padding: 20px 16px;
  }

  .logo-text {
    font-size: 20px;
  }
}
</style>