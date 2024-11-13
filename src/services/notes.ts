import { httpService, type IHTTPService } from './http'
interface INoteService {
  create(title: string, text: string): void
}
class NoteService implements INoteService {
  constructor(private http: IHTTPService) {}
  async create(title: string, content: string) {
    try {
      const response = await this.http.post('', {
        title,
        content,
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}

export const note = new NoteService(httpService)
