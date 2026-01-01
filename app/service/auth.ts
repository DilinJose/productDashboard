import apiClient from '@/app/lib/axios'

export interface VerifyResponse {
  otp: string
  token?: {
    access: string
  }
  user: boolean
  user_id?: string
  name?: string
  phone_number?: string
}

export interface LoginRegisterRequest {
  name: string
  phone_number: string
  unique_id?: string
}

export interface LoginRegisterResponse {
  token: {
    access: string
  }
  user_id: string
  name: string
  phone_number: string
  message: string
}

export const authService = {
  verify: async (phone_number: string): Promise<VerifyResponse> => {
    const response = await apiClient.post<VerifyResponse>('/api/verify/', {
      phone_number,
    })
    return response.data
  },

  loginRegister: async (
    data: LoginRegisterRequest
  ): Promise<LoginRegisterResponse> => {
    const response = await apiClient.post<LoginRegisterResponse>(
      '/api/login-register/',
      data
    )
    return response.data
  },
}


