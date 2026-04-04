<template>
  <div class="social-feed">
    <div class="page-header">
      <h1 class="page-title">宠物广场</h1>
      <p class="page-subtitle">和铲屎官们分享快乐时光</p>
    </div>

    <div class="feed-container">
      <!-- 发布新动态 -->
      <div class="post-card">
        <div class="post-header">
          <el-avatar :size="48" class="avatar-cute">
            🐾
          </el-avatar>
          <div class="post-info">
            <div class="user-name">当前用户</div>
            <div class="post-time">刚刚</div>
          </div>
        </div>
        <div class="post-content">
          <el-input
            v-model="newPost"
            type="textarea"
            :rows="3"
            placeholder="分享你的毛孩子趣事..."
            class="input-cute"
          />
        </div>
        <div class="post-actions">
          <el-button type="primary" @click="handlePost" class="btn-cute">
            发布动态
          </el-button>
        </div>
      </div>

      <!-- 动态列表 -->
      <div class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <el-avatar :size="48" :src="post.avatar" class="avatar-cute">
              {{ post.user.charAt(0) }}
            </el-avatar>
            <div class="post-info">
              <div class="user-name">{{ post.user }}</div>
              <div class="post-time">{{ post.time }}</div>
            </div>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
            <div v-if="post.images" class="post-images">
              <img
                v-for="(img, index) in post.images"
                :key="index"
                :src="img"
                class="post-image"
                @click="viewImage(img)"
              />
            </div>
            <div v-if="post.petType" class="pet-badge">
              <span class="badge-cute">{{ getPetEmoji(post.petType) }} {{ post.petName }}</span>
            </div>
          </div>
          <div class="post-actions">
            <el-button text @click="likePost(post)" :class="{ liked: post.liked }">
              <span class="heart-icon">❤️</span>
              {{ post.likes || 0 }}
            </el-button>
            <el-button text>
              💬
              评论
            </el-button>
            <el-button text>
              📤
              分享
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const newPost = ref('')
const posts = ref([
  {
    id: 1,
    user: '小咪的主人',
    avatar: '',
    time: '2小时前',
    content: '今天带小咪去公园玩，它开心得不得了！🐱',
    images: [],
    petType: 'cat',
    petName: '小咪',
    likes: 12,
    liked: false
  },
  {
    id: 2,
    user: '金毛妈妈',
    avatar: '',
    time: '5小时前',
    content: '我家大金毛学会了握手，太聪明了！👏',
    images: [],
    petType: 'dog',
    petName: '旺财',
    likes: 25,
    liked: false
  },
  {
    id: 3,
    user: '兔兔饲养员',
    avatar: '',
    time: '1天前',
    content: '兔兔今天吃了很多胡萝卜，肚子圆滚滚的~ 🥕',
    images: [],
    petType: 'rabbit',
    petName: '兔兔',
    likes: 8,
    liked: false
  }
])

function handlePost() {
  if (!newPost.value.trim()) {
    ElMessage.warning('请输入内容')
    return
  }

  const newPostObj = {
    id: Date.now(),
    user: '当前用户',
    avatar: '',
    time: '刚刚',
    content: newPost.value,
    images: [],
    petType: '',
    petName: '',
    likes: 0,
    liked: false
  }

  posts.value.unshift(newPostObj)
  newPost.value = ''
  ElMessage.success('发布成功！')
}

function likePost(post: any) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function getPetEmoji(type: string) {
  const emojis = {
    cat: '🐱',
    dog: '🐶',
    rabbit: '🐰',
    other: '🐾'
  }
  return emojis[type] || '🐾'
}

function viewImage(src: string) {
  console.log('View image:', src)
  ElMessage.info('图片查看功能开发中...')
}
</script>

<style scoped>
.social-feed {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-family: 'Bubblegum Sans', cursive;
  font-size: 40px;
  color: var(--color-pink);
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.feed-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--card-shadow);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.avatar-cute {
  border: 3px solid var(--color-light-pink);
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.3);
}

.post-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.post-time {
  font-size: 14px;
  color: var(--text-light);
}

.post-content {
  margin-bottom: 20px;
}

.post-content p {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.post-images {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.post-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-soft);
}

.post-image:hover {
  transform: scale(1.05);
}

.pet-badge {
  margin-top: 12px;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-light-pink);
}

.post-actions .el-button {
  color: var(--text-secondary);
}

.post-actions .el-button:hover {
  color: var(--color-pink);
}

.post-actions .liked {
  color: #ff6b95;
}

.post-actions .heart-icon {
  margin-right: 4px;
  transition: var(--transition-soft);
}

.post-actions .liked .heart-icon {
  transform: scale(1.2);
}

.input-cute {
  border-radius: var(--radius-md);
  border: 2px solid var(--color-light-pink);
}

.input-cute:focus {
  border-color: var(--color-pink);
  box-shadow: 0 0 0 4px var(--color-light-pink);
}
</style>