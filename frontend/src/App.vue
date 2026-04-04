<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

onMounted(() => {
  // Initialize user store
  const userStore = useUserStore()
  userStore.init()

  // Hide loader when app is mounted
  setTimeout(() => {
    const loader = document.querySelector('.loader')
    if (loader) {
      loader.style.opacity = '0'
      setTimeout(() => {
        loader.style.display = 'none'
      }, 500)
    }
  }, 300)
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-pink);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb {
  background: var(--color-pink);
  border-radius: var(--radius-sm);
  transition: var(--transition-soft);
}

::-webkit-scrollbar-thumb:hover {
  background: #ff8fa3;
}

/* Ensure smooth transitions for all pages */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>