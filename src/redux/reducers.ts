import * as type from '../types/interface'

interface AppState {
  map_now: type.INowData[]
  weather_detail: any[]
  air_detail: any[]
}

const initialState: AppState = {
  map_now: [],
  weather_detail: [],
  air_detail: [],
}

const dataReducer = (
  state = initialState,
  action: { type: unknown; payload: unknown }
) => {
  switch (action.type) {
    case 'GET_WEATHER_NOW_REQUEST':
      return action.payload
    default:
      return state
  }
}

export default dataReducer
