import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Location } from '../types/response/weather-36hrs'
import { allCity } from '../assets/data'
import { fetchWeatherNow, fetchAirNow, fetchWeather36hrs } from './thunks'
import { find } from 'lodash'
import produce from 'immer'
import * as type from '../types/interface'

export const nowSlice = createSlice({
  name: 'now',
  initialState: allCity as type.INowData[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherNow.pending, (state) => {})
      .addCase(fetchWeatherNow.fulfilled, (state, action) => {
        return produce(state, (draft) => {
          for (let i = 0; i < draft.length; i++) {
            const element = find(
              action.payload,
              (item) => item.COUNTYNAME === draft[i].COUNTYNAME
            )
            if (element) {
              draft[i].AirTemperature = element.AirTemperature
              draft[i].Weather = element.Weather
            }
          }
        })
      })
      .addCase(fetchWeatherNow.rejected, (state, action) => {})
      .addCase(fetchAirNow.pending, (state) => {})
      .addCase(fetchAirNow.fulfilled, (state, action) => {
        return produce(state, (draft) => {
          for (let i = 0; i < draft.length; i++) {
            const element = find(
              action.payload,
              (item) => item.COUNTYNAME === draft[i].COUNTYNAME
            )
            if (element) {
              draft[i].aqi = element.aqi
              draft[i].status = element.status
            }
          }
        })
      })
      .addCase(fetchAirNow.rejected, (state, action) => {})
  },
})

export const hoursSlice = createSlice({
  name: 'hours',
  initialState: [] as Location[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather36hrs.pending, (state) => {})
      .addCase(fetchWeather36hrs.fulfilled, (state, action) => {
        return { ...action.payload }
      })
      .addCase(fetchWeather36hrs.rejected, (state, action) => {})
  },
})

export const store = configureStore({
  reducer: {
    hours: hoursSlice.reducer,
    now: nowSlice.reducer,
  },
})
