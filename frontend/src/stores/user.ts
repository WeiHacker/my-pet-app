import { defineStore } from 'pinia'
import type { User } from '@/types'

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },

    init() {
      // 从 localStorage 恢复用户信息
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          this.user = JSON.parse(userStr)
        } catch {
          this.user = null
        }
      }
    }
  }
})
