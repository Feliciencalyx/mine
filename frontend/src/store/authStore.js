import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const API_URL = '/api/auth'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.post(`${API_URL}/login`, { email, password })
          const { token, ...user } = response.data
          get().setAuth(user, token)
          set({ loading: false })
          return true
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            loading: false 
          })
          return false
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.post(`${API_URL}/register`, userData)
          const { token, ...user } = response.data
          get().setAuth(user, token)
          set({ loading: false })
          return true
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            loading: false 
          })
          return false
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        delete axios.defaults.headers.common['Authorization']
      },

      updateProfile: async (profileData) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.put(`${API_URL}/profile`, profileData)
          set({ user: { ...get().user, ...response.data }, loading: false })
          return true
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Update failed', 
            loading: false 
          })
          return false
        }
      },

      fetchMe: async () => {
        try {
          const response = await axios.get(`${API_URL}/me`)
          set({ user: response.data })
        } catch (error) {
          console.error('Failed to fetch user:', error)
          get().logout()
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)

// Set axios default header if token exists
const token = useAuthStore.getState().token
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
