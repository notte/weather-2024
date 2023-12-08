import Map from '../components/map'
import City from '../components/city'
import WeatherNowRequest from '../containers/weatherNowRequest'
import Weather36hrsRequest from '../containers/weather36hrsRequest'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as type from '../types/interface'

const weather = () => {
  const weather = useSelector(
    (state: { weather: type.INowData[] }) => state.weather
  )
  // useEffect(() => {
  //   console.log(weather)
  // }, [JSON.stringify(weather)])

  return (
    <>
      <WeatherNowRequest />
      <Weather36hrsRequest />
      <Map {...weather} />
      <City />
    </>
  )
}

export default weather
