import APIhandler from '../utils/api-handler'
import { IWeatherNowResponse } from '../types/response/weather-now'
import { IWeather36hrsResponse } from '../types/response/weather-36hrs'
import { IWeatherWeekResponse } from '../types/response/weather-week'
import { IWeatherTownResponse } from '../types/response/weather-town'
import { IAirNowResponse } from '../types/response/air-now'
import * as type from '../types/common'
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
  async getWeather36hrs(city: string): Promise<IWeather36hrsResponse> {
    const config: type.IRequestConfig = {
      url: 'F-C0032-001',
      type: weather,
      params: {
        sort: 'time',
        locationName: city,
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
  async getTownWeather(
    cityId: string,
    townName: string
  ): Promise<IWeatherTownResponse> {
    const config: type.IRequestConfig = {
      url: 'F-D0047-093',
      type: weather,
      params: {
        locationId: cityId,
        locationName: townName,
        sort: 'time',
        elementName: 'PoP6h,T,AT,Wx,CI',
      },
    }
    const result = await APIhandler(config)
    return <IWeatherTownResponse>result.data
  },
}
