import * as status from '../types/enum'
import { AxiosRequestConfig } from 'axios'

export interface IAllCity {
  COUNTYNAME: string
  coordinates: number[]
}

export interface IRequestConfig {
  url: string
  type: status.APIStatus
  params?: AxiosRequestConfig['params']
}

// 被處理過的資料
export interface INowData {
  COUNTYNAME: string
  coordinates: number[]
  Weather?: string
  AirTemperature?: number
  aqi?: number
  status?: string
}
