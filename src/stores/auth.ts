import { API } from '@/api'
import type { ILoginPayload } from '@/interfaces/auth'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoading: Ref<boolean> = ref(false)

  const login = async (payload: ILoginPayload): Promise<boolean> => {
    isLoading.value = true

    try {
      const { status, data } = await API.auth.login(payload)
      if (status === 201) {
        localStorage.setItem('accessToken', data.access_token)
        router.push({ name: 'Dashboard' })
        return true
      }
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }

    return false
  }

  return {
    isLoading,
    login
  }
})
