<template>
  <div class="pet-list-page">
    <!-- Background Decorations -->
    <div class="bg-decoration bg-bubble-1"></div>
    <div class="bg-decoration bg-bubble-2"></div>
    <div class="bg-decoration bg-bubble-3"></div>

    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">我的毛孩子</h1>
          <p class="page-subtitle">每个小可爱都值得被好好爱护</p>
        </div>
        <el-button class="btn-cute btn-add" @click="$router.push('/pets/create')">
          <el-icon class="icon"><Plus /></el-icon>
          添加新成员
        </el-button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-container">
        <div class="loading-icon heart-beat">
          🐾
        </div>
        <p>正在加载毛孩子们...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="pets.length === 0" class="empty-state">
      <div class="empty-container">
        <div class="empty-illustration">
          <div class="floating-card pet-silhouette">
            🐱
            <div class="sparkle">✨</div>
          </div>
          <div class="floating-card pet-silhouette" style="animation-delay: 1s;">
            🐶
          </div>
          <div class="floating-card pet-silhouette" style="animation-delay: 2s;">
            🐰
          </div>
        </div>
        <h3 class="empty-title">还没有毛孩子？</h3>
        <p class="empty-desc">快点击下方按钮，加入毛孩子大家庭吧！</p>
        <el-button class="btn-cute btn-hero" @click="$router.push('/pets/create')">
          <el-icon class="icon"><Plus /></el-icon>
          领养第一只
        </el-button>
      </div>
    </div>

    <!-- Pet Grid -->
    <div v-else class="pet-container">
      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ pets.length }}</span>
          <span class="stat-label">位成员</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalPhotos }}</span>
          <span class="stat-label">张照片</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalHealthRecords }}</span>
          <span class="stat-label">健康记录</span>
        </div>
      </div>

      <!-- Pet Cards -->
      <div class="pet-grid">
        <div
          v-for="pet in pets"
          :key="pet.id"
          class="pet-card card-gradient-pink"
          @click="$router.push(`/pets/${pet.id}`)"
        >
          <div class="pet-header">
            <div class="pet-avatar">
              <el-avatar :size="100" :src="pet.avatar || undefined" class="avatar-cute">
                <el-icon size="48"><Avatar /></el-icon>
              </el-avatar>
              <div class="pet-status" :class="getHealthStatusClass(pet)">
                {{ getHealthStatusText(pet) }}
              </div>
            </div>
            <div class="pet-badge">
              <span class="badge-cute">{{ pet.typeName }}</span>
            </div>
          </div>

          <div class="pet-info">
            <h3 class="pet-name">{{ pet.name }}</h3>
            <p class="pet-detail">{{ pet.breed || '可爱小家伙' }}</p>
            <p class="pet-age" v-if="pet.birthday">
              <el-icon><Clock /></el-icon>
              {{ calculateAge(pet.birthday) }}
            </p>
          </div>

          <div class="pet-features">
            <div class="feature-item">
              <el-icon><Star /></el-icon>
              <span>{{ pet.gender === 'male' ? '小王子' : '小公主' }}</span>
            </div>
            <div class="feature-item" v-if="pet.weight">
              <el-icon><Star /></el-icon>
              <span>{{ pet.weight }}kg</span>
            </div>
          </div>

          <div class="pet-actions">
            <el-button
              text
              circle
              class="action-btn edit-btn"
              @click.stop="handleEdit(pet)"
            >
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button
              text
              circle
              class="action-btn health-btn"
              @click.stop="handleHealth(pet)"
            >
              <el-icon><FirstAidKit /></el-icon>
            </el-button>
            <el-button
              text
              circle
              class="action-btn photo-btn"
              @click.stop="handlePhotos(pet)"
            >
              <el-icon><Camera /></el-icon>
            </el-button>
          </div>
        </div>
      </div>

      <!-- Add More Button -->
      <div class="add-more-section">
        <el-button
          class="btn-outline btn-add-more"
          @click.stop="handleNavigate('/pets/create')"
          style="cursor: pointer;"
        >
          <el-icon><Plus /></el-icon>
          再添加一只
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import {
  Plus,
  Avatar,
  Edit,
  FirstAidKit,
  Camera,
  Clock,
  Star
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

function handleNavigate(path: string) {
  console.log('PetList - Navigation clicked:', path)
  console.log('Router instance:', router)
  try {
    router.push(path)
  } catch (error) {
    console.error('PetList navigation failed:', error)
    window.location.href = path
  }
}

const loading = ref(false)
const pets = computed(() => {
  // Mock data for demo
  if (!userStore.isLoggedIn) return []
  return [
    {
      id: 1,
      name: '小咪',
      type: 'cat',
      typeName: '猫咪',
      breed: '英短',
      birthday: '2020-01-01',
      gender: 'female',
      weight: 4.5,
      avatar: '',
      nextVaccineDate: null,
      nextCheckupDate: null,
      photoCount: 15,
      healthRecords: 3
    },
    {
      id: 2,
      name: '旺财',
      type: 'dog',
      typeName: '狗狗',
      breed: '金毛',
      birthday: '2019-05-15',
      gender: 'male',
      weight: 25,
      avatar: '',
      nextVaccineDate: null,
      nextCheckupDate: '2024-12-01',
      photoCount: 28,
      healthRecords: 5
    }
  ]
})

// Calculate stats
const totalPhotos = computed(() => {
  return pets.value.reduce((sum, pet) => sum + (pet.photoCount || 0), 0)
})

const totalHealthRecords = computed(() => {
  return pets.value.reduce((sum, pet) => sum + (pet.healthRecords || 0), 0)
})

// Methods
function calculateAge(birthday: string) {
  const birth = new Date(birthday)
  const now = new Date()
  const diff = now.getTime() - birth.getTime()
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  return age === 0 ? '不满1岁' : `${age}岁`
}

function getHealthStatusClass(pet: any) {
  if (!pet.nextVaccineDate && !pet.nextCheckupDate) {
    return 'status-healthy'
  }
  return 'status-attention'
}

function getHealthStatusText(pet: any) {
  if (!pet.nextVaccineDate && !pet.nextCheckupDate) {
    return '健康'
  }
  return '待提醒'
}

function handleEdit(pet: any) {
  router.push(`/pets/${pet.id}/edit`)
}

function handleHealth(pet: any) {
  router.push(`/health/${pet.id}`)
}

function handlePhotos(pet: any) {
  ElMessage.info(`${pet.name}的照片墙功能开发中...`)
}

onMounted(async () => {
  // Simulate loading
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.pet-list-page {
  position: relative;
  min-height: 100vh;
  background: var(--bg-primary);
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 0;
}

.bg-bubble-1 {
  width: 300px;
  height: 300px;
  background: var(--color-pink);
  top: -150px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.bg-bubble-2 {
  width: 200px;
  height: 200px;
  background: var(--color-blue);
  bottom: -100px;
  left: 10%;
  animation: float 15s ease-in-out infinite reverse;
}

.bg-bubble-3 {
  width: 150px;
  height: 150px;
  background: var(--color-yellow);
  top: 50%;
  right: 20%;
  animation: float 18s ease-in-out infinite;
}

.page-header {
  padding: 40px 20px 60px;
  position: relative;
  z-index: 1;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-text {
  flex: 1;
}

.page-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 48px;
  color: var(--color-pink);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 18px;
  position: relative;
  overflow: hidden;
}

.btn-add:hover {
  transform: translateY(-4px) scale(1.05);
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  position: relative;
  z-index: 1;
}

.loading-container {
  text-align: center;
}

.loading-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

/* Empty State */
.empty-state {
  padding: 0 20px 60px;
  position: relative;
  z-index: 1;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-container {
  text-align: center;
  max-width: 600px;
}

.empty-illustration {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  height: 120px;
  align-items: center;
}

.pet-silhouette {
  font-size: 60px;
  opacity: 0.6;
}

.empty-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 36px;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.empty-desc {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

/* Pet Container */
.pet-container {
  padding: 0 20px 60px;
  position: relative;
  z-index: 1;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 36px;
  color: var(--color-pink);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
}

.pet-card {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: var(--transition-bouncy);
}

.pet-card:hover {
  border-color: var(--color-pink);
  transform: translateY(-8px);
}

.pet-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--primary-gradient);
  opacity: 0.3;
}

.pet-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.pet-avatar {
  position: relative;
}

.avatar-cute {
  border: 4px solid var(--color-light-pink);
  box-shadow: 0 8px 24px rgba(255, 182, 193, 0.3);
  transition: var(--transition-bouncy);
}

.pet-card:hover .avatar-cute {
  transform: scale(1.1) rotate(5deg);
}

.pet-status {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--color-green);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.status-attention {
  background: var(--color-yellow);
  color: #333;
}

.pet-badge {
  position: absolute;
  top: 0;
  right: 0;
}

.pet-info {
  text-align: center;
  margin-bottom: 20px;
}

.pet-name {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
}

.pet-detail {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.pet-age {
  font-size: 14px;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.pet-features {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--text-secondary);
}

.feature-item .el-icon {
  font-size: 16px;
  color: var(--color-pink);
}

.pet-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 182, 193, 0.3);
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid transparent;
  transition: var(--transition-soft);
}

.edit-btn:hover {
  background: var(--color-light-pink);
  border-color: var(--color-pink);
}

.health-btn:hover {
  background: var(--color-light-green);
  border-color: var(--color-green);
}

.photo-btn:hover {
  background: var(--color-light-blue);
  border-color: var(--color-blue);
}

.add-more-section {
  text-align: center;
  margin-top: 40px;
}

.btn-add-more {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-outline {
  background: white;
  border: 2px solid var(--color-pink);
  color: var(--color-pink);
  border-radius: var(--radius-lg);
  transition: var(--transition-bouncy);
}

.btn-outline:hover {
  background: var(--color-pink);
  color: white;
  transform: translateY(-2px) scale(1.05);
}

.btn-outline .icon {
  margin-right: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 30px 16px 40px;
  }

  .page-title {
    font-size: 36px;
  }

  .pet-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .stats-bar {
    gap: 30px;
  }

  .stat-number {
    font-size: 28px;
  }

  .empty-illustration {
    gap: 20px;
  }

  .pet-silhouette {
    font-size: 40px;
  }
}
</style>