import { createSlice } from '@reduxjs/toolkit'
import * as type from '../types/interface'
import { Location } from '../types/response/weather-36hrs'
import { concat } from 'lodash'
import { allCity } from '../assets/data'

const counterSlice = createSlice({
  name: 'weather',
  initialState: {
    now: concat([], allCity) as type.INowData[],
    hours: [] as Location[],
  },
  reducers: {
    SetWeatherNowResponse: (state, action) => {
      return { ...state, now: action.payload }
    },
    SetWeather36hrsResponse: (state, action) => {
      return { ...state, hours: action.payload }
    },
  },
})

export const { SetWeatherNowResponse, SetWeather36hrsResponse } =
  counterSlice.actions
export default counterSlice.reducer
