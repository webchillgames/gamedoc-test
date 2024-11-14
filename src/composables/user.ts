import { auth } from '@/services/auth'
import { httpService } from '@/services/http'
import { ref } from 'vue'

export interface IUser {
  id: string
  email: string
}

const user = ref<IUser | null>(null)

export function useUser() {
  async function updateUserInfo() {
    if (!auth.hasSavedSession) {
      return
    }

    const response = await httpService.get<IUser>('/api/auth')

    user.value = response.data
  }

  return {
    updateUserInfo,
    user,
  }
}
