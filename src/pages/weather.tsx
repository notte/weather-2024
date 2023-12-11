import Map from '../components/map'
import City from '../components/city'
import { useEffect } from 'react'
import WeatherNowRequest from '../containers/weatherNowRequest'
import { useSelector } from 'react-redux'
import * as type from '../types/interface'

const weather = () => {
  const weatherNow = useSelector((state: { now: type.INowData[] }) => state.now)
  // useEffect(() => {
  //   console.log(weatherNow)
  // }, [weatherNow])
  return (
    <>
      <WeatherNowRequest />
      <Map {...weatherNow} />
      <City />
    </>
  )
}

export default weather
