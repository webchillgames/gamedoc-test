import type { AxiosResponse } from 'axios'
import { httpService, type IHTTPService } from './http'

export type Note = {
  content: string
  title: string
  id: number
}

interface INoteService {
  create(title: string, text: string): Promise<AxiosResponse<unknown>>
  get(): Promise<AxiosResponse<Note[]>>
  remove(id: number): Promise<AxiosResponse<unknown>>
}

class NoteService implements INoteService {
  constructor(private http: IHTTPService) {}
  async create(title: string, content: string) {
    return this.http.post('/api/notes', {
      title,
      content,
    })
  }

  async get() {
    return this.http.get<Note[]>('/api/notes')
  }

  async remove(id: number) {
    return this.http.delete('/api/notes/' + id, null)
  }
}

export const notes: INoteService = new NoteService(httpService)
