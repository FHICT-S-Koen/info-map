import axios from 'axios'
import Map from '../objects/Map'

export default class MapService {
  static API_URL = process.env.REACT_APP_PROXY_URL

  public static async getUserMap(userId: string): Promise<Map> {
    const response = await axios.get<Map>(`${this.API_URL}/map/${userId}`)
    return response.data
  }

  public static async createUserMap(map: Map): Promise<Map> {
    return (await axios.post(`${this.API_URL}/map/`, map)).data
  }
}