<template>
  <div class="not-found-page">
    <div class="content">
      <div class="error-404">
        <div class="number">404</div>
        <div class="text">页面迷路了</div>
        <div class="message">哎呀，你访问的页面不存在呢~</div>
      </div>

      <div class="mascot-section">
        <div class="mascot floating">
          😿
          <div class="sparkle">✨</div>
        </div>
      </div>

      <el-button class="btn-cute btn-home" @click="$router.push('/')">
        <el-icon class="icon"><HomeFilled /></el-icon>
        回到首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.not-found-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.error-404 {
  margin-bottom: 40px;
}

.number {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 120px;
  color: var(--color-pink);
  margin-bottom: 16px;
  line-height: 1;
}

.text {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 36px;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.message {
  font-size: 18px;
  color: var(--text-secondary);
}

.mascot-section {
  margin: 40px 0;
  position: relative;
}

.mascot {
  font-size: 80px;
  cursor: pointer;
}

.btn-home {
  padding: 16px 32px;
  font-size: 18px;
  position: relative;
  overflow: hidden;
}

.btn-home:hover {
  transform: translateY(-4px) scale(1.05);
}

.btn-home .icon {
  margin-right: 8px;
}

/* Background decorations */
.not-found-page::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,182,193,0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.not-found-page::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(168,216,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 15s ease-in-out infinite reverse;
}

@media (max-width: 768px) {
  .number {
    font-size: 80px;
  }

  .text {
    font-size: 28px;
  }

  .message {
    font-size: 16px;
  }

  .mascot {
    font-size: 60px;
  }
}
</style>