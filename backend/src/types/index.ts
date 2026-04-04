// 用户相关类型
export interface User {
  id: number;
  email: string;
  phone: string | null;
  password_hash: string;
  nickname: string;
  avatar: string | null;
  bio: string | null;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface SafeUser {
  id: number;
  email: string;
  phone: string | null;
  nickname: string;
  avatar: string | null;
  bio: string | null;
  created_at: Date;
}

// 宠物相关类型
export interface PetType {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  sort_order: number;
}

export interface Pet {
  id: number;
  user_id: number;
  name: string;
  type_id: number;
  breed: string | null;
  gender: number | null;
  birthday: Date | null;
  adoption_date: Date | null;
  weight: number | null;
  color: string | null;
  avatar: string | null;
  bio: string | null;
  tags: string[] | null;
  is_public: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface PetPhoto {
  id: number;
  pet_id: number;
  url: string;
  caption: string | null;
  is_avatar: number;
  sort_order: number;
  created_at: Date;
}

// 健康记录类型
export interface HealthRecord {
  id: number;
  pet_id: number;
  record_type: string;
  record_date: Date;
  title: string | null;
  content: string | null;
  weight: number | null;
  hospital: string | null;
  attachments: string[] | null;
  created_at: Date;
  updated_at: Date;
}

export interface Vaccination {
  id: number;
  pet_id: number;
  vaccine_name: string;
  vaccine_type: string | null;
  vaccination_date: Date;
  next_date: Date | null;
  hospital: string | null;
  notes: string | null;
  certificate_url: string | null;
  created_at: Date;
}

// 提醒类型
export interface Reminder {
  id: number;
  user_id: number;
  pet_id: number | null;
  reminder_type: string;
  title: string;
  content: string | null;
  remind_time: Date;
  repeat_type: string;
  repeat_config: object | null;
  is_completed: number;
  completed_at: Date | null;
  is_notified: number;
  created_at: Date;
  updated_at: Date;
}

// 社交类型
export interface Post {
  id: number;
  user_id: number;
  pet_id: number | null;
  content: string;
  images: string[] | null;
  tags: string[] | null;
  visibility: number;
  like_count: number;
  comment_count: number;
  is_pinned: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  parent_id: number | null;
  reply_to_user_id: number | null;
  content: string;
  like_count: number;
  created_at: Date;
  deleted_at: Date | null;
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
