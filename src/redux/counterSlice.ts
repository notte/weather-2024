import { createSlice, configureStore } from '@reduxjs/toolkit'
import * as type from '../types/interface'
import { Location } from '../types/response/weather-36hrs'
import { concat } from 'lodash'
import { allCity } from '../assets/data'

const nowSlice = createSlice({
  name: 'now',
  initialState: concat([], allCity) as type.INowData[],
  reducers: {
    setWeatherNowResponse: (state, action) => {
      return action.payload
    },
  },
})

const hoursSlice = createSlice({
  name: 'hours',
  initialState: [] as Location[],
  reducers: {
    setWeather36hrsResponse: (state, action) => {
      return action.payload
    },
  },
})

export const { setWeatherNowResponse } = nowSlice.actions
export const { setWeather36hrsResponse } = hoursSlice.actions

export const store = configureStore({
  reducer: {
    now: nowSlice.reducer,
    hours: hoursSlice.reducer,
  },
})
