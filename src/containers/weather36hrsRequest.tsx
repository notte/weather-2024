import api from '../services/api'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetWeatherNowRequest } from '../redux/counterSlice'
import { filter, includes, map } from 'lodash'
import { stations } from '../assets/data'
import * as type from '../types/interface'
import {} from '../types/response/weather-36hrs'

const weather36hrsRequest = () => {
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const res = await api.getWeather36hrs()
      // console.log(res)
    } finally {
    }
  }

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(
      () => {
        fetchData()
      },
      6 * 60 * 60 * 1000
    )
    return () => clearInterval(intervalId)
  }, [])

  return <></>
}

export default weather36hrsRequest
