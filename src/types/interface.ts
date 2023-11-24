import * as status from '../types/enum'
import { AxiosRequestConfig } from 'axios'

export interface IAllCity {
  COUNTYNAME: string
  coordinates: number[]
}

export interface INowData {
  COUNTYNAME: string
  coordinates: number[]
  Weather: string
  AirTemperature: number
  status: string
  aqi: number
}

export interface IRequestConfig {
  url: string
  type: status.APIStatus
  params: AxiosRequestConfig['params']
}

// API Response

// 目前天氣
export interface IWeatherNowResponse {
  success: string
  result: Result
  records: Records
}

export interface Result {
  resource_id: string
  fields: Field[]
}

export interface Field {
  id: string
  type: string
}

export interface Records {
  Station: Station[]
}

export interface Station {
  StationName: string
  StationId: string
  ObsTime: ObsTime
  GeoInfo: GeoInfo
  WeatherElement: WeatherElement
}

export interface ObsTime {
  DateTime: string
}

export interface GeoInfo {
  CountyName: string
}

export interface WeatherElement {
  Weather: string
  AirTemperature: number
}
