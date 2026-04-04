import request from '@/utils/request'
import type { ApiResponse, Pet, PetType, PaginatedResponse } from '@/types'

export interface CreatePetParams {
  name: string
  typeId: number
  breed?: string
  gender?: number
  birthday?: string
  adoptionDate?: string
  weight?: number
  color?: string
  bio?: string
  tags?: string[]
  isPublic?: boolean
}

export interface UpdatePetParams extends Partial<CreatePetParams> {}

export const petApi = {
  getTypes() {
    return request.get<ApiResponse<PetType[]>>('/pets/types')
  },

  getList() {
    return request.get<ApiResponse<PaginatedResponse<Pet>>>('/pets')
  },

  getById(id: number) {
    return request.get<ApiResponse<Pet>>(`/pets/${id}`)
  },

  create(params: CreatePetParams) {
    return request.post<ApiResponse<Pet>>('/pets', params)
  },

  update(id: number, params: UpdatePetParams) {
    return request.put<ApiResponse<Pet>>(`/pets/${id}`, params)
  },

  delete(id: number) {
    return request.delete<ApiResponse>(`/pets/${id}`)
  }
}

export default petApi
