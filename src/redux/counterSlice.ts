import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Location } from '../types/response/weather-36hrs'
import { CityWeek } from '../types/response/weather-week'
import { LocationTown } from '../types/response/weather-town'
import { allCity } from '../assets/data'
import {
  fetchWeatherNow,
  fetchAirNow,
  fetchWeather36hrs,
  fetchWeatherWeek,
  fetchTownWeather,
} from './thunks'
import { find } from 'lodash'
import produce from 'immer'
import * as type from '../types/common'
import EventBus from '../utils/event-bus'

export const nowSlice = createSlice({
  name: 'now',
  initialState: allCity as type.INowData[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherNow.pending, () => {
        EventBus.emit('loading-change', true)
      })
      .addCase(fetchWeatherNow.fulfilled, (state, action) => {
        const data = produce(state, (draft) => {
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
        return data
      })
      .addCase(fetchWeatherNow.rejected, () => {
        EventBus.emit('loading-change', false)
      })
      .addCase(fetchAirNow.pending, (_state) => {
        EventBus.emit('loading-change', true)
      })
      .addCase(fetchAirNow.fulfilled, (state, action) => {
        const data = produce(state, (draft) => {
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
        return data
      })
      .addCase(fetchAirNow.rejected, () => {
        EventBus.emit('loading-change', false)
      })
  },
})

export const hoursSlice = createSlice({
  name: 'hours',
  initialState: [] as Location[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather36hrs.pending, () => {
        EventBus.emit('loading-change', true)
      })
      .addCase(fetchWeather36hrs.fulfilled, (_state, action) => {
        return action.payload
      })
      .addCase(fetchWeather36hrs.rejected, () => {
        EventBus.emit('loading-change', false)
      })
  },
})

export const cityWeekSlice = createSlice({
  name: 'cityWeek',
  initialState: {} as CityWeek,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherWeek.pending, () => {
        EventBus.emit('loading-change', true)
      })
      .addCase(fetchWeatherWeek.fulfilled, (_state, action) => {
        return action.payload[0] as CityWeek
      })
      .addCase(fetchWeatherWeek.rejected, () => {
        EventBus.emit('loading-change', false)
      })
  },
})

export const townSlice = createSlice({
  name: 'townSlice',
  initialState: {} as LocationTown,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTownWeather.pending, () => {
        EventBus.emit('loading-change', true)
      })
      .addCase(fetchTownWeather.fulfilled, (_state, action) => {
        return action.payload as LocationTown
      })
      .addCase(fetchTownWeather.rejected, () => {
        EventBus.emit('loading-change', false)
      })
  },
})

export const store = configureStore({
  reducer: {
    hours: hoursSlice.reducer,
    now: nowSlice.reducer,
    cityWeek: cityWeekSlice.reducer,
    town: townSlice.reducer,
  },
})
