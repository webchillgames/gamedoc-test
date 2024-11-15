import { AxiosError } from 'axios'

export function useAuth() {
  function getErrorMsg(error: unknown): string[] {
    let message = ['Неизвестная ошибка']

    if (error instanceof AxiosError) {
      if (error.response) {
        const value = error.response.data.message
        message = Array.isArray(value) ? value : [value]
      }
    }

    return message
  }
  return {
    getErrorMsg,
  }
}
