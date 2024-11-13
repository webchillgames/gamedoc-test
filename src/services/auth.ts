import { httpService, type IHTTPService, type IUserToken } from './http'
import { storage } from './storage'
import router from '@/router/index'

interface IAuthService {
  login(email: string, password: string): void
  register(email: string, password: string, confirm_password: string): void
}

class AuthService implements IAuthService {
  constructor(private http: IHTTPService) {}
  async login(email: string, password: string) {
    const response = await this.http.post<IUserToken>('/api/auth', {
      email,
      password,
    })

    this.http.setUser(response.data)
    storage.set('userToken', response.data)
    router.push({ name: 'profile' })
  }
  async getUserInfo() {
    const response = await this.http.get('/api/auth')
    storage.set('userProfile', response.data)
  }
  async exit() {
    storage.remove('userToken')
    storage.remove('userProfile')
    return this.http.delete('/api/auth', null)
  }
  async register(email: string, password: string, confirm_password: string) {
    return this.http.post('/api/reg', {
      email,
      password,
      confirm_password,
    })
  }
}

export const auth = new AuthService(httpService)
