import { httpService, type IHTTPService } from './http'

interface IAuthService {
  login(email: string, password: string): void
  register(email: string, password: string, confirm_password: string): void
}

class AuthService implements IAuthService {
  constructor(private http: IHTTPService) {}
  async login(email: string, password: string) {
    try {
      const response = await this.http.post('/api/auth', {
        email,
        password,
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
  async register(email: string, password: string, confirm_password: string) {
    try {
      const response = await this.http.post('/api/reg', {
        email,
        password,
        confirm_password,
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}

export const auth = new AuthService(httpService)
