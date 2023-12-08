import api from '../services/api'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetWeatherNowRequest } from '../redux/counterSlice'
import { filter, includes, map } from 'lodash'
import { stations } from '../assets/data'
import * as type from '../types/interface'

const weather = () => {
  const dispatch = useDispatch()
  const weather = useSelector(
    (state: { weather: type.INowData[] }) => state.weather
  )

  const setWeatherData = useCallback(
    (arr: type.INowData[], obj: type.Station): type.INowData | undefined => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].COUNTYNAME === obj.GeoInfo.CountyName) {
          return {
            ...arr[i],
            Weather: obj.WeatherElement.Weather,
            AirTemperature: obj.WeatherElement.AirTemperature,
          }
        }
      }
    },
    []
  )

  const WeatherNowRequest = async () => {
    try {
      const res = await api.getWeatherNow()
      const filter_data = filter(res.records.Station, (item: type.Station) => {
        return includes(stations, item.StationName)
      })

      dispatch(
        GetWeatherNowRequest(
          map(filter_data, (item) => {
            return setWeatherData(weather, item)
          }) as unknown as type.INowData[]
        )
      )
    } finally {
    }
  }

  useEffect(() => {
    WeatherNowRequest()
    const intervalId = setInterval(
      () => {
        WeatherNowRequest()
      },
      15 * 60 * 1000
    )
    return () => clearInterval(intervalId)
  }, [])

  return <></>
}

export default weather
