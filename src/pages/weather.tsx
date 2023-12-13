import Map from '../components/map'
import WeatherNowRequest from '../containers/weatherNowRequest'
import City36hrs from '../containers/weather36hrsRequest.tsx'
import { useSelector } from 'react-redux'
import * as type from '../types/interface'

const weather = () => {
  const weatherNow = useSelector((state: { now: type.INowData[] }) => state.now)
  return (
    <>
      <WeatherNowRequest />
      <City36hrs />
      <Map {...weatherNow} />
    </>
  )
}

export default weather
