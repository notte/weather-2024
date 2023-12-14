import APIhandler from '../utils/api-handler'
import { IWeatherNowResponse } from '../types/response/weather-now'
import { IWeather36hrsResponse } from '../types/response/weather-36hrs'
import { IWeatherWeekResponse } from '../types/response/weather-week'
import { IAirNowResponse } from '../types/response/air-now'
import * as type from '../types/interface'
import * as status from '../types/enum'

const air = status.APIStatus.air
const weather = status.APIStatus.weather

export default {
  async getWeatherNow(): Promise<IWeatherNowResponse> {
    const config: type.IRequestConfig = {
      url: 'O-A0003-001',
      type: weather,
      params: {
        WeatherElement: 'Weather,AirTemperature',
        GeoInfo: 'CountyName',
      },
    }
    const result = await APIhandler(config)
    return <IWeatherNowResponse>result.data
  },
  async getWeather36hrs(): Promise<IWeather36hrsResponse> {
    const config: type.IRequestConfig = {
      url: 'F-C0032-001',
      type: weather,
      params: {
        sort: 'time',
      },
    }
    const result = await APIhandler(config)
    return <IWeather36hrsResponse>result.data
  },
  async getWeatherWeek(city: string): Promise<IWeatherWeekResponse> {
    const config: type.IRequestConfig = {
      url: 'F-D0047-091',
      type: weather,
      params: {
        locationName: city,
        sort: 'time',
        elementName: 'MaxT,MinT,MaxAT,MinAT,Wx,PoP12h,UVI,WeatherDescription',
      },
    }
    const result = await APIhandler(config)
    return <IWeatherWeekResponse>result.data
  },
  async getAirNow(): Promise<IAirNowResponse> {
    const config: type.IRequestConfig = {
      url: 'aqx_p_432',
      type: air,
    }
    const result = await APIhandler(config)
    return <IAirNowResponse>result.data
  },
}
