import All from '../containers/weatherAll'
import City from '../containers/weatherCity'
import Map from '../components/map'
import api from '../services/api'

const weather = () => {
  api.getWeatherNow().then((res) => {
    console.log(res)
  })
  return (
    <>
      <Map />
    </>
  )
}

export default weather
