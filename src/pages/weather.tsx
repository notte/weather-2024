import Map from '../components/map'
import WeatherNowRequest from '../containers/weatherNowRequest'
import Weather36hrsRequest from '../containers/weather36hrsRequest'
import WeatherWeekRequest from '../containers/weatherWeekRequest'
import WeatherTownRequest from '../containers/weatherTownRequest'
import { useSelector } from 'react-redux'
import * as type from '../types/common'

const weather = () => {
  const weatherNow = useSelector((state: { now: type.INowData[] }) => state.now)

  return (
    <>
      <WeatherTownRequest />
      <WeatherNowRequest />
      <Weather36hrsRequest />
      <WeatherWeekRequest />
      <Map {...weatherNow} />
    </>
  )
}

export default weather
