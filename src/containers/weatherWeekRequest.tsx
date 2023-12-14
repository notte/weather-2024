import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { map } from 'lodash'
import { CityWeek } from '../types/response/weather-week.ts'
import { fetchWeatherWeek } from '../redux/thunks'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const weatherWeekRequest = () => {
  const dispatch = useDispatch()
  const weatherCityWeek = useSelector(
    (state: { cityWeek: CityWeek }) => state.cityWeek
  )
  const [dataT, setDataT] = useState<{
    label: string[]
    datasets: { label: string; data: string[]; borderColor: string }[]
  }>({ label: [], datasets: [] })

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
      const labels = map(
        weatherCityWeek.weatherElement[0].time,
        (item) => item.startTime + ' - ' + item.endTime
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
        label: labels,
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
      <Line
        options={{
          responsive: true,
          plugins: {},
        }}
        data={dataT}
      />
    </>
  )
}

export default weatherWeekRequest
