import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { map, includes, filter } from 'lodash'
import { CityWeek } from '../types/response/weather-week'
import { fetchWeatherWeek } from '../redux/thunks'
import { getWeatherWeekData, getWeatherLine } from '../utils/helpers'
import Line from '../components/chart/line'
import Table from '../components/chart/table'
import { IWeatherWeekData } from '../types/table'
import * as type from '../types/common'

const weatherWeekRequest = () => {
  const dispatch = useDispatch()
  const weatherCityWeek = useSelector(
    (state: { cityWeek: CityWeek }) => state.cityWeek
  )
  const [dataT, setDataT] = useState<type.ILineProps>({
    labels: [],
    datasets: [],
  })
  const [dataAT, setDataAT] = useState<type.ILineProps>({
    labels: [],
    datasets: [],
  })

  const [forecast, setForecast] = useState<boolean>(false)
  const [TLine, setTLine] = useState<boolean>(false)
  const [ATLine, setATLine] = useState<boolean>(false)

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
    if (!weatherCityWeek.weatherElement) return

    const [MinT] = filter(
      { ...weatherCityWeek.weatherElement },
      (item) => item.elementName === 'MinT'
    )
    const [MaxT] = filter(
      { ...weatherCityWeek.weatherElement },
      (item) => item.elementName === 'MaxT'
    )
    const [MinAT] = filter(
      { ...weatherCityWeek.weatherElement },
      (item) => item.elementName === 'MinAT'
    )
    const [MaxAT] = filter(
      { ...weatherCityWeek.weatherElement },
      (item) => item.elementName === 'MaxAT'
    )

    setDataT(() => getWeatherLine(MinT, MaxT))
    setDataAT(() => getWeatherLine(MinAT, MaxAT))
  }, [JSON.stringify(weatherCityWeek)])

  return (
    <>
      <div className="city-container">
        <h1>{weatherCityWeek.locationName}</h1>
        <div className="options-warp">
          <button>一週預報</button>
          <button>一週溫度曲線</button>
          <button>一週體感曲線</button>
        </div>
        <Table
          weekData={getWeatherWeekData(weatherCityWeek) as IWeatherWeekData[]}
        />
        <Line {...dataT} />
        <Line {...dataAT} />
      </div>
    </>
  )
}

export default weatherWeekRequest
