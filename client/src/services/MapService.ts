import axios from 'axios'
import Map from '../models/Map'

export default class MapService {
  static API_URL = import.meta.env.VITE_PROXY_URL

  public static async getUserMap(userId: string): Promise<Map> {
    const response = await axios.get<Map>(`${this.API_URL}/map/${userId}`)
    return Object.setPrototypeOf(response.data, Map.prototype)
  }

  public static async createUserMap(map: Map): Promise<Map> {
    return (await axios.post(`${this.API_URL}/map/`, map)).data
  }
}