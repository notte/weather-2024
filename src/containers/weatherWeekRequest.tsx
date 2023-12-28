import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { map } from 'lodash'
import { CityWeek } from '../types/response/weather-week'
import { fetchWeatherWeek } from '../redux/thunks'
import { getWeatherWeekData } from '../utils/helpers'
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
    setDataT(() => {
      const label = map(
        map(
          weatherCityWeek.weatherElement[0].time,
          (item) => item.startTime + ' - ' + item.endTime
        ),
        (item) => {
          let array = item.split(' - ')
          if (array[0].includes('06:00:00')) {
            return array[0].substring(5, 10) + ' 白天'
          } else {
            return '晚上'
          }
        }
      )

      const lowTemps = map(
        weatherCityWeek.weatherElement[3].time,
        (item) => item.elementValue[0].value
      )

      const highTemps = map(
        weatherCityWeek.weatherElement[7].time,
        (item) => item.elementValue[0].value
      )

      return {
        labels: label,
        datasets: [
          {
            label: '最低溫度',
            data: lowTemps,
            borderColor: '#1ce1da',
          },
          {
            label: '最高溫度',
            data: highTemps,
            borderColor: '#e98337',
          },
        ],
      }
    })
  }, [JSON.stringify(weatherCityWeek)])

  return (
    <>
      <div className="city-container">
        <h1>{weatherCityWeek.locationName}</h1>
        <Table
          weekData={getWeatherWeekData(weatherCityWeek) as IWeatherWeekData[]}
        />
        <Line {...dataT} />
      </div>
    </>
  )
}

export default weatherWeekRequest
