import { createAsyncThunk } from '@reduxjs/toolkit'
import { stations, observation } from '../assets/data'
import { filter, includes, map } from 'lodash'
import { Station } from '../types/response/weather-now'
import { Record } from '../types/response/air-now'
import { Location } from '../types/response/weather-36hrs'
import { CityWeek } from '../types/response/weather-week'
import { allCity } from '../assets/data'
import * as type from '../types/interface'
import api from '../services/api'

const setWeatherData = (arr: type.INowData[], obj: Station) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].COUNTYNAME === obj.GeoInfo.CountyName) {
      return {
        ...arr[i],
        Weather: obj.WeatherElement.Weather,
        AirTemperature: obj.WeatherElement.AirTemperature,
      }
    }
  }
}

const setAirData = (arr: type.INowData[], obj: Record) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].COUNTYNAME === obj.county) {
      return {
        ...arr[i],
        aqi: +obj.aqi,
        status: obj.status,
      }
    }
  }
}

export const fetchWeatherNow = createAsyncThunk(
  'fetchWeather',
  async (): Promise<type.INowData[]> => {
    try {
      const res = await api.getWeatherNow()
      const filter_data = filter(res.records.Station, (item: Station) => {
        return includes(stations, item.StationName)
      })
      return map(filter_data, (item) => {
        return setWeatherData(allCity, item)
      }) as unknown as type.INowData[]
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
)

export const fetchWeather36hrs = createAsyncThunk(
  'fetchWeather36hrs',
  async (): Promise<Location[]> => {
    try {
      const res = await api.getWeather36hrs()
      return res.records.location as Location[]
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
)

export const fetchWeatherWeek = createAsyncThunk(
  'fetchWeatherWeek',
  async (city: string): Promise<CityWeek[]> => {
    try {
      const res = await api.getWeatherWeek(city)
      return res.records.locations[0].location as unknown as CityWeek[]
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
)

export const fetchAirNow = createAsyncThunk(
  'fetchAir',
  async (): Promise<type.INowData[]> => {
    try {
      const res = await api.getAirNow()
      const filter_data = filter(res.records, (item: Record) => {
        return includes(observation, item.sitename)
      })
      return map(filter_data, (item) => {
        return setAirData(allCity, item)
      }) as unknown as type.INowData[]
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
)
