import { createSlice } from '@reduxjs/toolkit'
import * as type from '../types/interface'
import { concat } from 'lodash'
import { allCity } from '../assets/data'

const counterSlice = createSlice({
  name: 'weather',
  initialState: concat([], allCity) as type.INowData[],
  reducers: {
    GetWeatherNowRequest: (_state, action) => action.payload,
  },
})

export const { GetWeatherNowRequest } = counterSlice.actions
export default counterSlice.reducer
