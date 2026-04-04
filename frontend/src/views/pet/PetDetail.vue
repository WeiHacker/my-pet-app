<template>
  <div class="pet-detail-page">
    <el-skeleton v-if="loading" animated>
      <template #template>
        <div class="skeleton-card">
          <el-skeleton-item variant="image" style="width: 200px; height: 200px" />
          <div style="padding: 20px">
            <el-skeleton-item variant="h1" style="width: 50%" />
            <el-skeleton-item variant="text" style="margin-top: 16px" />
          </div>
        </div>
      </template>
    </el-skeleton>

    <template v-else-if="pet">
      <div class="pet-header">
        <el-button @click="$router.back()">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <div class="header-actions">
          <el-button @click="$router.push(`/pets/${pet.id}/edit`)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button @click="$router.push(`/health/${pet.id}`)">
            <el-icon><FirstAidKit /></el-icon>
            健康管理
          </el-button>
        </div>
      </div>

      <div class="pet-profile">
        <div class="avatar-section">
          <el-avatar :size="150" :src="pet.avatar || undefined">
            <el-icon size="60"><Avatar /></el-icon>
          </el-avatar>
          <h1>{{ pet.name }}</h1>
          <p class="pet-breed">{{ pet.typeName }} · {{ pet.breed || '未知品种' }}</p>
        </div>

        <div class="info-section">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="性别">
              {{ pet.gender === 1 ? '公' : pet.gender === 2 ? '母' : '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="年龄">
              {{ pet.birthday ? calculateAge(pet.birthday) : '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="生日">
              {{ pet.birthday || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="领养日期">
              {{ pet.adoptionDate || '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="体重">
              {{ pet.weight ? `${pet.weight} kg` : '未知' }}
            </el-descriptions-item>
            <el-descriptions-item label="毛色">
              {{ pet.color || '未知' }}
            </el-descriptions-item>
          </el-descriptions>

          <div v-if="pet.bio" class="bio-section">
            <h3>简介</h3>
            <p>{{ pet.bio }}</p>
          </div>

          <div v-if="pet.tags?.length" class="tags-section">
            <h3>标签</h3>
            <div class="tags">
              <el-tag v-for="tag in pet.tags" :key="tag" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </template>

    <el-empty v-else description="宠物不存在" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { petApi } from '@/api/pet'
import type { Pet } from '@/types'
import dayjs from 'dayjs'

const route = useRoute()
const loading = ref(false)
const pet = ref<Pet | null>(null)

onMounted(() => {
  loadPet()
})

async function loadPet() {
  loading.value = true
  try {
    const res = await petApi.getById(Number(route.params.id))
    if (res.data) {
      pet.value = res.data
    }
  } finally {
    loading.value = false
  }
}

function calculateAge(birthday: string): string {
  const birth = dayjs(birthday)
  const now = dayjs()
  const years = now.diff(birth, 'year')
  const months = now.diff(birth, 'month') % 12

  if (years === 0 && months === 0) {
    const days = now.diff(birth, 'day')
    return `${days}天`
  } else if (years === 0) {
    return `${months}个月`
  } else if (months === 0) {
    return `${years}岁`
  } else {
    return `${years}岁${months}个月`
  }
}
</script>

<style scoped>
.pet-detail-page {
  max-width: 800px;
  margin: 0 auto;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.pet-profile {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.avatar-section {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.avatar-section h1 {
  margin: 16px 0 8px;
  font-size: 28px;
}

.pet-breed {
  opacity: 0.9;
}

.info-section {
  padding: 24px;
}

.bio-section,
.tags-section {
  margin-top: 24px;
}

.bio-section h3,
.tags-section h3 {
  font-size: 16px;
  color: #303133;
  margin-bottom: 12px;
}

.bio-section p {
  color: #606266;
  line-height: 1.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skeleton-card {
  background: #fff;
  border-radius: 12px;
  display: flex;
}
</style>
