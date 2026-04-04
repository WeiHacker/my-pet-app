import request from '@/utils/request'
import type { ApiResponse, AuthResponse } from '@/types'

export interface LoginParams {
  account: string
  password: string
}

export interface RegisterParams {
  email: string
  password: string
  nickname: string
  phone?: string
}

export const authApi = {
  login(params: LoginParams) {
    return request.post<ApiResponse<AuthResponse>>('/auth/login', params)
  },

  register(params: RegisterParams) {
    return request.post<ApiResponse<AuthResponse>>('/auth/register', params)
  },

  logout() {
    return request.post<ApiResponse>('/auth/logout')
  },

  refresh(refreshToken: string) {
    return request.post<ApiResponse<AuthResponse['tokens']>>('/auth/refresh', { refreshToken })
  }
}

export default authApi
