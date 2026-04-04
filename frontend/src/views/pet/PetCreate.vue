<template>
  <div class="pet-create-page">
    <div class="page-header">
      <el-button class="btn-back" @click="$router.back()">
        <el-icon><ArrowLeft /></el-icon>
        返回
      </el-button>
      <h1 class="page-title">添加新成员</h1>
      <p class="page-subtitle">给毛孩子一个温暖的家</p>
    </div>

    <div class="pet-form">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="宠物名字" prop="name">
          <el-input v-model="form.name" placeholder="给你的宝贝起个名字" class="input-cute" />
        </el-form-item>

        <el-form-item label="宠物类型" prop="type">
          <el-select v-model="form.type" placeholder="选择宠物类型" class="input-cute">
            <el-option label="猫咪" value="cat" />
            <el-option label="狗狗" value="dog" />
            <el-option label="兔子" value="rabbit" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="品种" prop="breed">
          <el-input v-model="form.breed" placeholder="如：英短、金毛" class="input-cute" />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">小王子 👑</el-radio>
            <el-radio label="female">小公主 💖</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择生日"
            class="input-cute"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="体重" prop="weight">
          <el-input-number
            v-model="form.weight"
            :min="0"
            :max="100"
            :precision="1"
            placeholder="kg"
            class="input-cute"
          />
        </el-form-item>

        <el-form-item label="上传照片">
          <el-upload
            class="upload-area"
            drag
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-icon class="upload-icon"><Plus /></el-icon>
            <div class="upload-text">点击或拖拽上传照片</div>
            <div class="upload-tip">支持 JPG、PNG 格式</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" class="btn-cute btn-submit">
            <el-icon><Check /></el-icon>
            完成添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Plus, Check } from '@element-plus/icons-vue'

const router = useRouter()
const formRef = ref()

const form = reactive({
  name: '',
  type: '',
  breed: '',
  gender: '',
  birthday: '',
  weight: undefined,
  photo: null
})

const rules = {
  name: [
    { required: true, message: '请输入宠物名字', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择宠物类型', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
}

function handleFileChange(file: any) {
  console.log('File selected:', file)
  form.photo = file.raw
}

function handleSubmit() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      // 模拟添加宠物
      ElMessage.success(`成功添加宠物：${form.name}！`)

      // 模拟跳转到宠物列表
      setTimeout(() => {
        router.push('/pets')
      }, 1500)
    }
  })
}
</script>

<style scoped>
.pet-create-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.btn-back {
  position: absolute;
  left: 20px;
  top: 20px;
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

.pet-form {
  background: white;
  padding: 40px;
  border-radius: var(--radius-xl);
  box-shadow: var(--card-shadow);
}

.input-cute {
  border-radius: var(--radius-md);
  border: 2px solid var(--color-light-pink);
}

.input-cute:focus {
  border-color: var(--color-pink);
  box-shadow: 0 0 0 4px var(--color-light-pink);
}

.upload-area {
  width: 100%;
  height: 200px;
  border: 2px dashed var(--color-light-pink);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-light-pink);
  transition: var(--transition-soft);
}

.upload-area:hover {
  border-color: var(--color-pink);
  background: rgba(255, 182, 193, 0.1);
}

.upload-icon {
  font-size: 48px;
  color: var(--color-pink);
  margin-bottom: 16px;
}

.upload-text {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.upload-tip {
  font-size: 14px;
  color: var(--text-secondary);
}

.btn-submit {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  margin-top: 20px;
}

/* Radio group styling */
:deep(.el-radio__label) {
  font-weight: 500;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: var(--color-pink);
}
</style>