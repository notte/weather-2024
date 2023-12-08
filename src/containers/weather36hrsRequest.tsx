import api from '../services/api'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetWeather36hrsResponse } from '../redux/counterSlice'
import { filter, includes, map } from 'lodash'
import { stations } from '../assets/data'
import { Location } from '../types/response/weather-36hrs'
import {} from '../types/response/weather-36hrs'

const weather36hrsRequest = () => {
  const dispatch = useDispatch()
  const weather = useSelector(
    (state: { weather: { hours: Location[] } }) => state.weather.hours
  )
  const [single_city, setSingle] = useState<Location>()

  const fetchData = async () => {
    try {
      const res = await api.getWeather36hrs()
      dispatch(SetWeather36hrsResponse(res.records.location))
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

  useEffect(() => {
    setSingle(() => weather[0])
  }, [weather])

  return (
    <>
      <div className="hours36">
        <h1>{single_city?.locationName}</h1>
        <div className="first"></div>
        <div className="sec"></div>
        <div className="third"></div>
      </div>
    </>
  )
}

export default weather36hrsRequest
