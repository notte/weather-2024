import APIhandler from '../utils/api-handler'
import * as type from '../types/interface'
import * as status from '../types/enum'

const air = status.APIStatus.air
const weather = status.APIStatus.weather

export default {
  async getWeatherNow(): Promise<type.IWeatherNowResponse> {
    const config: type.IRequestConfig = {
      url: 'O-A0003-001',
      type: weather,
      params: {
        WeatherElement: 'Weather,AirTemperature',
        GeoInfo: 'CountyName',
      },
    }
    const result = await APIhandler(config)
    return <type.IWeatherNowResponse>result.data
  },
  async getWeather36hrs(): Promise<type.IWeather36hrsResponse> {
    const config: type.IRequestConfig = {
      url: 'F-C0032-001',
      type: weather,
      params: {
        sort: 'time',
      },
    }
    const result = await APIhandler(config)
    return <type.IWeather36hrsResponse>result.data
  },
}
