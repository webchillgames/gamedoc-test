import { AxiosError } from 'axios'

export function useAuth() {
  function getErrorMsg(error: unknown): string[] {
    let message = ['Неизвестная ошибка']

    if (error instanceof AxiosError) {
      if (error.response) {
        message = error.response.data.message as string[]
      }
    }

    return message
  }
  return {
    getErrorMsg,
  }
}
