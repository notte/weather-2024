import * as status from '../types/enum'
import { AxiosRequestConfig } from 'axios'

export interface IAllCity {
  COUNTYNAME: string
  coordinates: number[]
}

export interface IRequestConfig {
  url: string
  type: status.APIStatus
  params: AxiosRequestConfig['params']
}

// 被處理過的資料
export interface INowData {
  COUNTYNAME: string
  coordinates: number[]
  Weather?: string
  AirTemperature?: number
}

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

// 36 小時內天氣

export interface IWeather36hrsResponse {
  success: string
  result: Result
  records: Records36hr
}

export interface Result {
  resource_id: string
  fields: Field[]
}

export interface Field {
  id: string
  type: string
}

export interface Records36hr {
  datasetDescription: string
  location: Location[]
}

export interface Location {
  locationName: string
  weatherElement: WeatherElement[]
}

export interface WeatherElement {
  elementName: string
  time: Time[]
}

export interface Time {
  startTime: string
  endTime: string
  parameter: Parameter
}

export interface Parameter {
  parameterName: string
  parameterValue?: string
  parameterUnit?: string
}
