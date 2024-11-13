import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  baseURL: ``,
  headers: {
    Authorization: 'Bearer {token}',
  },
})

const apiUrl = 'https://dist.nd.ru'

interface IUser {
  token: string
}

export interface IHTTPService {
  setUser(user: IUser): void
  get(path: string): Promise<AxiosResponse<unknown, unknown>>
  post(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<unknown, unknown>>
  put(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<unknown, unknown>>
  delete(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<unknown, unknown>>
}

class HTTPService implements IHTTPService {
  private user: IUser | null

  constructor(
    private http: AxiosInstance,
    private baseUrl: string,
  ) {
    const savedUser = localStorage.getItem('user')
    this.user = savedUser ? JSON.parse(savedUser) : null
  }

  private get authorization() {
    const token = this.user ? this.user.token : ''

    return !this.user ? {} : { Authorization: 'Bearer ' + token }
  }
  setUser(user: IUser) {
    this.user = user
  }
  get(path: string, options?: AxiosRequestConfig<unknown> | undefined) {
    return this.http.get(this.baseUrl + path, {
      ...options,
      headers: { ...this.authorization },
    })
  }
  post(path: string, data: unknown, options?: AxiosRequestConfig<unknown> | undefined) {
    return this.http.post(this.baseUrl + path, data, {
      ...options,
      headers: { ...this.authorization },
    })
  }
  put(path: string, data: unknown, options?: AxiosRequestConfig<unknown> | undefined) {
    return this.http.put(this.baseUrl + path, data, {
      ...options,
      headers: { ...this.authorization },
    })
  }
  delete(path: string, options?: AxiosRequestConfig<unknown> | undefined) {
    return this.http.delete(this.baseUrl + path, {
      ...options,
      headers: { ...this.authorization },
    })
  }
}

export const httpService = new HTTPService(axiosInstance, apiUrl)
