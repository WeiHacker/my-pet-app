<template>
  <div class="icon-test">
    <h1>图标测试页面</h1>
    <p>测试哪些图标可以正常显示</p>

    <div class="icon-grid">
      <div class="icon-item" v-for="icon in testIcons" :key="icon">
        <el-icon>
          <component :is="icon" />
        </el-icon>
        <span>{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeFilled,
  Avatar,
  ChatDotRound,
  Document,
  Bell,
  User,
  ArrowDown,
  SwitchButton,
  Plus,
  Edit,
  FirstAidKit,
  Camera,
  Clock,
  Male,
  Female,
  Scale,
  Trophy,
  Star,
  Heart,
  HeartFilled,
  CaretRight,
  Lock,
  UserFilled
} from '@element-plus/icons-vue'

const testIcons = [
  'HomeFilled',
  'Avatar',
  'ChatDotRound',
  'Document',
  'Bell',
  'User',
  'ArrowDown',
  'SwitchButton',
  'Plus',
  'Edit',
  'FirstAidKit',
  'Camera',
  'Clock',
  'Male',
  'Female',
  'Scale',
  'Trophy',
  'Star',
  'Heart',
  'HeartFilled',
  'CaretRight',
  'Lock',
  'UserFilled'
]
</script>

<style scoped>
.icon-test {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow);
  transition: var(--transition-soft);
}

.icon-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--hover-shadow);
}

.icon-item .el-icon {
  font-size: 24px;
  color: var(--color-pink);
  margin-bottom: 8px;
}

.icon-item span {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
}
</style>