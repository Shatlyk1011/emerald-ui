import axios from 'axios'
// import { TOKEN } from '@/shared/constrants'
import { getCookie } from 'cookies-next/client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
})

instance.interceptors.request.use(
  async (config) => {
    const token = getCookie("TOKEN")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { instance as axios }
