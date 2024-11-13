import { httpService, type IHTTPService } from './http'
interface INoteService {
  create(title: string, text: string): void
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
    return this.http.get('/api/notes')
  }

  async remove(id: number) {
    return this.http.delete('/api/notes/' + id, null)
  }
}

export const notes = new NoteService(httpService)
