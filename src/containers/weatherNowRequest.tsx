import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeatherNow, fetchAirNow } from '../redux/thunks'

const weatherNowRequest = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWeatherNow() as never)
    dispatch(fetchAirNow() as never)

    const intervalWeather = setInterval(
      () => {
        fetchWeatherNow()
      },
      15 * 60 * 1000
    )

    const intervalAir = setInterval(
      () => {
        fetchAirNow()
      },
      60 * 60 * 1000
    )

    return () => {
      clearInterval(intervalWeather)
      clearInterval(intervalAir)
    }
  }, [])

  return <></>
}

export default weatherNowRequest
