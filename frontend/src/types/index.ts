// 用户类型
export interface User {
  id: number
  email: string
  phone: string | null
  nickname: string
  avatar: string | null
  bio: string | null
  createdAt: string
}

// 宠物类型
export interface PetType {
  id: number
  name: string
  category: string
  icon: string | null
  sortOrder: number
}

// 宠物信息
export interface Pet {
  id: number
  userId: number
  name: string
  typeId: number
  typeName?: string
  typeCategory?: string
  breed: string | null
  gender: number | null
  birthday: string | null
  adoptionDate: string | null
  weight: number | null
  color: string | null
  avatar: string | null
  bio: string | null
  tags: string[] | null
  isPublic: number
  status: number
  createdAt: string
}

// 健康记录
export interface HealthRecord {
  id: number
  petId: number
  recordType: string
  recordDate: string
  title: string | null
  content: string | null
  weight: number | null
  hospital: string | null
  attachments: string[] | null
  createdAt: string
}

// 疫苗记录
export interface Vaccination {
  id: number
  petId: number
  vaccineName: string
  vaccineType: string | null
  vaccinationDate: string
  nextDate: string | null
  hospital: string | null
  notes: string | null
  certificateUrl: string | null
  createdAt: string
}

// 提醒
export interface Reminder {
  id: number
  userId: number
  petId: number | null
  petName?: string
  reminderType: string
  title: string
  content: string | null
  remindTime: string
  repeatType: string
  repeatConfig: object | null
  isCompleted: number
  completedAt: string | null
  isNotified: number
  createdAt: string
}

// 动态/帖子
export interface Post {
  id: number
  userId: number
  petId: number | null
  content: string
  images: string[] | null
  tags: string[] | null
  visibility: number
  likeCount: number
  commentCount: number
  isPinned: number
  createdAt: string
  user?: User
  pet?: Pet
  isLiked?: boolean
}

// 评论
export interface Comment {
  id: number
  postId: number
  userId: number
  parentId: number | null
  replyToUserId: number | null
  content: string
  likeCount: number
  createdAt: string
  user?: User
  replies?: Comment[]
}

// API 响应
export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// 认证响应
export interface AuthResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}
