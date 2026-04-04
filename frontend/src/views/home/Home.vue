<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">欢迎来到毛孩子世界</h1>
          <p class="hero-subtitle">记录每一个温暖瞬间，见证毛孩子成长</p>
          <div class="hero-actions">
            <el-button
              class="btn-cute btn-hero"
              @click="handleStart"
              size="large"
            >
              <el-icon class="icon"><CaretRight /></el-icon>
              开始旅程
            </el-button>
            <el-button
              class="btn-outline"
              @click="handleExplore"
              size="large"
            >
              <el-icon class="icon"><View /></el-icon>
              探索更多
            </el-button>
          </div>
        </div>

        <div class="hero-image">
          <div class="floating-card">
            <div class="animal-character bouncing">
              🐱
              <div class="sparkle">✨</div>
            </div>
            <div class="floating-card dog-character">
              🐶
              <div class="sparkle">🌟</div>
            </div>
            <div class="floating-card rabbit-character">
              🐰
              <div class="sparkle">💖</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">功能大赏</h2>
        <p class="section-subtitle">让每个毛孩子都得到最好的照顾</p>
      </div>

      <div class="feature-grid">
        <div class="feature-card card-gradient-pink" @click="handleFeature('pets')">
          <div class="feature-icon">
            <el-icon size="48"><Avatar /></el-icon>
          </div>
          <h3 class="feature-title">小档案</h3>
          <p class="feature-desc">记录宝贝的每一个细节</p>
          <div class="feature-badges">
            <span class="badge-cute">照片墙</span>
            <span class="badge-cute">成长记录</span>
          </div>
        </div>

        <div class="feature-card card-gradient-blue" @click="handleFeature('health')">
          <div class="feature-icon">
            <el-icon size="48"><FirstAidKit /></el-icon>
          </div>
          <h3 class="feature-title">小医生</h3>
          <p class="feature-desc">健康守护每一天</p>
          <div class="feature-badges">
            <span class="badge-cute">疫苗提醒</span>
            <span class="badge-cute">体检记录</span>
          </div>
        </div>

        <div class="feature-card card-gradient-yellow" @click="handleFeature('reminders')">
          <div class="feature-icon">
            <el-icon size="48"><Bell /></el-icon>
          </div>
          <h3 class="feature-title">小闹钟</h3>
          <p class="feature-desc">不错过任何重要时刻</p>
          <div class="feature-badges">
            <span class="badge-cute">喂食提醒</span>
            <span class="badge-cute">散步时间</span>
          </div>
        </div>

        <div class="feature-card card-gradient-purple" @click="handleFeature('social')">
          <div class="feature-icon">
            <el-icon size="48"><ChatDotRound /></el-icon>
          </div>
          <h3 class="feature-title">交友圈</h3>
          <p class="feature-desc">分享快乐时光</p>
          <div class="feature-badges">
            <span class="badge-cute">动态分享</span>
            <span class="badge-cute">宠友互动</span>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ userStore.isLoggedIn ? 1 : 0 }}{{ userStore.isLoggedIn ? '只' : '' }}</div>
            <div class="stat-label">{{ userStore.isLoggedIn ? '毛孩子' : '加入我们' }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ petCount }}</div>
            <div class="stat-label">照片</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ healthCount }}</div>
            <div class="stat-label">健康记录</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ reminderCount }}</div>
            <div class="stat-label">待办事项</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="testimonial-section">
      <div class="section-header">
        <h2 class="section-title">铲屎官说</h2>
        <p class="section-subtitle">听听大家的真实感受</p>
      </div>

      <div class="testimonial-grid">
        <div class="testimonial-card">
          <div class="testimonial-avatar">🐶</div>
          <div class="testimonial-content">
            <p class="testimonial-text">"用这个APP三个月了，疫苗提醒特别贴心！"</p>
            <p class="testimonial-author">— 小旺的妈妈</p>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar">🐱</div>
          <div class="testimonial-content">
            <p class="testimonial-text">"照片功能太棒了，记录了咪咪从小到大的样子"</p>
            <p class="testimonial-author">— 咪咪的主人</p>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-avatar">🐰</div>
          <div class="testimonial-content">
            <p class="testimonial-text">"遛狗提醒终于让我养成了好习惯！"</p>
            <p class="testimonial-author">— 憨憨的铲屎官</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { CaretRight, View, Avatar, FirstAidKit, Bell, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const petCount = computed(() => {
  if (!userStore.isLoggedIn) return 0
  // Mock data for now
  return Math.floor(Math.random() * 30) + 5
})

const healthCount = computed(() => {
  if (!userStore.isLoggedIn) return 0
  // Mock data for now
  return Math.floor(Math.random() * 20) + 3
})

const reminderCount = computed(() => {
  if (!userStore.isLoggedIn) return 0
  // Mock data for now
  return 5
})

function handleStart() {
  console.log('handleStart called, isLoggedIn:', userStore.isLoggedIn)
  console.log('Router instance:', router)
  try {
    if (userStore.isLoggedIn) {
      console.log('Navigating to pets...')
      router.push('/pets')
    } else {
      console.log('Navigating to login...')
      router.push('/login')
    }
  } catch (error) {
    console.error('Navigation failed:', error)
    window.location.href = userStore.isLoggedIn ? '/pets' : '/login'
  }
}

function handleExplore() {
  console.log('handleExplore called, isLoggedIn:', userStore.isLoggedIn)
  console.log('Router instance:', router)
  try {
    if (userStore.isLoggedIn) {
      console.log('Navigating to social...')
      router.push('/social')
    } else {
      console.log('Navigating to register...')
      router.push('/register')
    }
  } catch (error) {
    console.error('Navigation failed:', error)
    window.location.href = userStore.isLoggedIn ? '/social' : '/register'
  }
}

function handleFeature(feature: string) {
  console.log('Feature clicked:', feature)
  console.log('Router instance:', router)
  try {
    if (!userStore.isLoggedIn) {
      console.log('Not logged in, redirecting to mock login')
      router.push('/mock-login')
      return
    }

    switch (feature) {
      case 'pets':
        console.log('Navigating to pets...')
        router.push('/pets')
        break
      case 'health':
        console.log('Navigating to health...')
        router.push('/health/1') // 假设第一个宠物的ID
        break
      case 'reminders':
        console.log('Navigating to reminders...')
        router.push('/reminders')
        break
      case 'social':
        console.log('Navigating to social...')
        router.push('/social')
        break
      default:
        console.log('Unknown feature:', feature)
    }
  } catch (error) {
    console.error('Navigation failed:', error)
    // 默认跳转到首页
    window.location.href = '/'
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100%;
}

.hero-section {
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0ec 100%);
  border-radius: var(--radius-xl);
  padding: 80px 40px;
  margin-bottom: 80px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: slideUp 1s ease-out;
}

.hero-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 56px;
  color: #ff6b95;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-hero {
  padding: 16px 32px;
  font-size: 18px;
  position: relative;
  overflow: hidden;
}

.btn-hero::before {
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

.btn-hero:hover::before {
  width: 300px;
  height: 300px;
}

.btn-hero:hover {
  transform: translateY(-4px) scale(1.05);
}

.btn-outline {
  background: white;
  border: 2px solid var(--color-pink);
  color: var(--color-pink);
  padding: 16px 32px;
  font-size: 18px;
  border-radius: var(--radius-lg);
  transition: var(--transition-bouncy);
}

.btn-outline:hover {
  background: var(--color-pink);
  color: white;
  transform: translateY(-4px) scale(1.05);
}

.btn-outline .icon {
  margin-right: 8px;
}

.hero-image {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.animal-character,
.dog-character,
.rabbit-character {
  font-size: 80px;
  animation: float 6s ease-in-out infinite;
  cursor: pointer;
  transition: var(--transition-bouncy);
  position: relative;
}

.animal-character {
  animation-delay: 0s;
}

.dog-character {
  animation-delay: 2s;
}

.rabbit-character {
  animation-delay: 4s;
}

.animal-character:hover,
.dog-character:hover,
.rabbit-character:hover {
  transform: scale(1.2) rotate(10deg);
}

.features-section {
  padding: 0 20px 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 40px;
  color: #ff6b95;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.feature-card {
  padding: 32px;
  text-align: center;
  position: relative;
  transition: var(--transition-bouncy);
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-pink);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: var(--card-shadow);
}

.feature-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

.feature-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.feature-badges {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.stats-section {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: 60px 40px;
  margin: 0 20px 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 48px;
  color: #ff6b95;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.testimonial-section {
  padding: 0 20px;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.testimonial-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--card-shadow);
  transition: var(--transition-bouncy);
}

.testimonial-card:hover {
  transform: translateY(-8px);
}

.testimonial-avatar {
  font-size: 48px;
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
}

.testimonial-author {
  font-size: 14px;
  color: #666;
  text-align: right;
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-image {
    height: 300px;
  }

  .animal-character,
  .dog-character,
  .rabbit-character {
    font-size: 60px;
  }

  .section-title {
    font-size: 32px;
  }

  .stats-section {
    padding: 40px 20px;
    margin: 0 20px 40px;
  }

  .feature-card {
    padding: 24px;
  }
}
</style>