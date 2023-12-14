import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'lodash'
import { getWeatherIcon } from '../utils/set-map.ts'
import { CityWeek } from '../types/response/weather-week.ts'
import { fetchWeatherWeek } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weatherWeekRequest = () => {
  const dispatch = useDispatch()
  const [city_week, setCityWeek] = useState<CityWeek>()
  const weatherCityWeek = useSelector(
    (state: { cityWeek: CityWeek }) => state.cityWeek
  )

  useEffect(() => {
    dispatch(fetchWeatherWeek('桃園市') as never)
    const intervalId = setInterval(
      () => {
        dispatch(fetchWeatherWeek('桃園市') as never)
      },
      6 * 60 * 60 * 1000
    )
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    setCityWeek(() => weatherCityWeek)
    console.log(city_week)
  }, [weatherCityWeek, city_week])

  return (
    <>
      {city_week?.locationName && (
        <div className="city-container">
          <div className="city-week">
            <h1>{city_week?.locationName}</h1>
            <h1>{city_week?.geocode}</h1>
            <h1>{city_week!.weatherElement[0].description}</h1>
          </div>
        </div>
      )}
    </>
  )
}

export default weatherWeekRequest
