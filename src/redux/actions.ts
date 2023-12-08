import * as type from '../types/interface'

// map all 天氣
export const GetWeatherNowRequest = (updateData: type.INowData) => ({
  type: 'GET_WEATHER_NOW_REQUEST',
  payload: updateData,
})
// map all 空氣
export const GetWeather36hrsRequest = (updateData: any) => ({
  type: 'GET_WEATHER_36HRS_REQUEST',
  payload: updateData,
})
// map detail 天氣
export const GetWeatherDetailRequest = () => ({
  type: 'GET_WEATHER_DETAIL_REQUEST',
})
// map detail 空氣
export const GetAirDetailRequest = () => ({
  type: 'GET_AIR_DETAIL_REQUEST',
})
