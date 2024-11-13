import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { storage, type IStorageService } from './storage'

const API_URL = 'https://dist.nd.ru'

const axiosInstance = axios.create({
  baseURL: ``,
})

export interface IUserToken {
  accessToken: string
}

export interface IHTTPService {
  setUser(user: IUserToken): void
  get<T>(path: string): Promise<AxiosResponse<T, unknown>>
  post<T>(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<T, unknown>>
  put<T>(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<T, unknown>>
  delete<T>(
    path: string,
    data: unknown,
    options?: AxiosRequestConfig<unknown> | undefined,
  ): Promise<AxiosResponse<T, unknown>>
}

class HTTPService implements IHTTPService {
  private userToken: IUserToken | null

  constructor(
    private baseUrl: string,
    private http: AxiosInstance,
    private storage: IStorageService,
  ) {
    this.userToken = this.storage.get<IUserToken>('userToken')
  }

  private get authorization() {
    const token = this.userToken ? this.userToken.accessToken : ''

    return !this.userToken ? {} : { Authorization: 'Bearer ' + token }
  }
  setUser(userToken: IUserToken) {
    this.userToken = userToken
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

export const httpService = new HTTPService(API_URL, axiosInstance, storage)
