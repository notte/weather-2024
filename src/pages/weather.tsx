import Map from '../components/map'
import WeatherNowRequest from '../containers/weatherNowRequest'
import Weather36hrsRequest from '../containers/weather36hrsRequest'
import WeatherWeekRequest from '../containers/weatherWeekRequest'
import { useSelector } from 'react-redux'
import * as type from '../types/interface'

const weather = () => {
  const weatherNow = useSelector((state: { now: type.INowData[] }) => state.now)
  return (
    <>
      <WeatherNowRequest />
      <Weather36hrsRequest />
      <WeatherWeekRequest />
      <Map {...weatherNow} />
    </>
  )
}

export default weather
