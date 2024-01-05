import * as status from './enum'
import { AxiosRequestConfig } from 'axios'

export interface IRequestConfig {
  url: string
  type: status.APIStatus
  params?: AxiosRequestConfig['params']
}

// AllCity 預設資料
export interface ICityItem {
  COUNTYNAME: string
  id: string
  coordinates: number[]
  style: string
  children: string[]
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

export interface ILineProps {
  labels: string[]
  datasets: { label: string; data: string[]; borderColor: string }[]
}
