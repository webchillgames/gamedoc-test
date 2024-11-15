import type { AxiosResponse } from 'axios'
import { httpService, type IHTTPService, type IUserToken } from './http'
import { storage, type IStorageService } from './storage'
import router from '@/router/index'

interface IAuthService {
  hasSavedSession: boolean
  login(email: string, password: string): Promise<void>
  register(
    email: string,
    password: string,
    confirm_password: string,
  ): Promise<AxiosResponse<unknown, unknown>>
  logout(): void
}

class AuthService implements IAuthService {
  constructor(
    private http: IHTTPService,
    private storage: IStorageService,
  ) {}
  get hasSavedSession() {
    return this.storage.get<IUserToken>('userToken') !== null
  }
  async login(email: string, password: string) {
    const response = await this.http.post<IUserToken>('/api/auth', {
      email,
      password,
    })

    this.http.setUser(response.data)
    this.storage.set('userToken', response.data)
    router.push({ name: 'profile' })
  }
  async logout() {
    this.storage.remove('userToken')
    this.http.delete('/api/auth', null)
    this.http.setUser(null)
  }
  async register(email: string, password: string, confirm_password: string) {
    return this.http.post('/api/reg', {
      email,
      password,
      confirm_password,
    })
  }
}

export const auth: IAuthService = new AuthService(httpService, storage)
