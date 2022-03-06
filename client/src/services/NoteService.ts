import axios from 'axios'
import Note from '../models/Note'

export default class NoteService {
  static API_URL = import.meta.env.VITE_PROXY_URL

  public static async getMapNotes(mapId: string): Promise<Note[]> {
    const response = await axios.get<Note[]>(`${this.API_URL}/note/${mapId}`)
    return response.data.map(i => Object.setPrototypeOf(i, Note.prototype))
  }
}