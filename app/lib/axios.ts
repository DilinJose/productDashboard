import axios from 'axios'
import { getAccessToken } from './auth'

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

export const apiClient = axios.create({
  baseURL: BASE_URL,
})

// Request interceptor to add auth token if available
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default apiClient

