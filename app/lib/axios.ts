import axios from 'axios'

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

export const apiClient = axios.create({
  baseURL: BASE_URL,
})

// Request interceptor to add auth token if available
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default apiClient

