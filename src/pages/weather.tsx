import Map from '../components/map'
import City from '../components/city'
import WeatherNowRequest from '../containers/weatherNowRequest'
import Weather36hrsRequest from '../containers/weather36hrsRequest'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as type from '../types/interface'

const weather = () => {
  const weatherNow = useSelector((state: { now: type.INowData[] }) => state.now)

  return (
    <>
      <WeatherNowRequest />
      <Map {...weatherNow} />
      <City />
    </>
  )
}

export default weather
