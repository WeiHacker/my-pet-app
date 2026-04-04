<template>
  <div class="pet-edit-page">
    <div class="page-header">
      <el-button @click="$router.back()">
        <el-icon><ArrowLeft /></el-icon>
        返回
      </el-button>
      <h1>{{ isEdit ? '编辑宠物' : '添加宠物' }}</h1>
    </div>

    <div class="form-card">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="宠物名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入宠物名称" />
        </el-form-item>

        <el-form-item label="宠物类型" prop="typeId">
          <el-select v-model="form.typeId" placeholder="请选择宠物类型" style="width: 100%">
            <el-option
              v-for="type in petTypes"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="品种">
          <el-input v-model="form.breed" placeholder="请输入品种" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :value="0">未知</el-radio>
            <el-radio :value="1">公</el-radio>
            <el-radio :value="2">母</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="领养日期">
          <el-date-picker
            v-model="form.adoptionDate"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="体重(kg)">
          <el-input-number
            v-model="form.weight"
            :precision="2"
            :min="0"
            :max="500"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="毛色">
          <el-input v-model="form.color" placeholder="请输入毛色" />
        </el-form-item>

        <el-form-item label="简介">
          <el-input
            v-model="form.bio"
            type="textarea"
            :rows="3"
            placeholder="介绍一下你的宠物吧"
          />
        </el-form-item>

        <el-form-item label="标签">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="添加标签"
            style="width: 100%"
          >
            <el-option v-for="tag in defaultTags" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>

        <el-form-item label="公开">
          <el-switch v-model="form.isPublic" />
          <span class="form-tip">公开后其他用户可以看到你的宠物信息</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            {{ isEdit ? '保存修改' : '添加宠物' }}
          </el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { petApi } from '@/api/pet'
import type { PetType } from '@/types'

const route = useRoute()
const router = useRouter()

const formRef = ref<FormInstance>()
const loading = ref(false)
const petTypes = ref<PetType[]>([])

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  typeId: undefined as number | undefined,
  breed: '',
  gender: 0,
  birthday: '',
  adoptionDate: '',
  weight: undefined as number | undefined,
  color: '',
  bio: '',
  tags: [] as string[],
  isPublic: true
})

const rules: FormRules = {
  name: [
    { required: true, message: '请输入宠物名称', trigger: 'blur' }
  ],
  typeId: [
    { required: true, message: '请选择宠物类型', trigger: 'change' }
  ]
}

const defaultTags = [
  '活泼', '安静', '贪吃', '粘人', '独立', '爱玩', '乖巧', '调皮'
]

onMounted(async () => {
  // 加载宠物类型
  const res = await petApi.getTypes()
  if (res.data) {
    petTypes.value = res.data
  }

  // 编辑模式加载宠物信息
  if (isEdit.value) {
    loadPet()
  }
})

async function loadPet() {
  const res = await petApi.getById(Number(route.params.id))
  if (res.data) {
    const pet = res.data
    form.name = pet.name
    form.typeId = pet.typeId
    form.breed = pet.breed || ''
    form.gender = pet.gender || 0
    form.birthday = pet.birthday || ''
    form.adoptionDate = pet.adoptionDate || ''
    form.weight = pet.weight || undefined
    form.color = pet.color || ''
    form.bio = pet.bio || ''
    form.tags = pet.tags || []
    form.isPublic = pet.isPublic === 1
  }
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const data = {
      ...form,
      isPublic: form.isPublic
    }

    if (isEdit.value) {
      await petApi.update(Number(route.params.id), data)
      ElMessage.success('保存成功')
    } else {
      await petApi.create(data)
      ElMessage.success('添加成功')
    }

    router.push('/pets')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pet-edit-page {
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 20px;
  color: #303133;
}

.form-card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
}

.form-tip {
  margin-left: 12px;
  font-size: 12px;
  color: #909399;
}
</style>
