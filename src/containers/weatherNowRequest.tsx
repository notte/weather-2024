import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherNow, fetchAirNow } from '../redux/thunks'

const weatherNowRequest = () => {
  const dispatch = useDispatch()
  const weatherNow = useSelector((state: { now: unknown }) => state.now)

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
