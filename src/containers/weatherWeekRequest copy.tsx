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
  Title,
  Tooltip,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

const weatherWeekRequest = () => {
  const dispatch = useDispatch()
  const weatherCityWeek = useSelector(
    (state: { cityWeek: CityWeek }) => state.cityWeek
  )
  const [city_week, setCityWeek] = useState<CityWeek>()
  const [dataT, setDataT] = useState<{
    label: string[]
    datasets: { label: string; data: string[]; borderColor: string }[]
  }>({ label: [], datasets: [] })
  const [forceRerender, setForceRerender] = useState(false)

  const options = {
    responsive: true,
    plugins: {},
  }

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
    if (!weatherCityWeek.locationName) return
    setCityWeek(() => weatherCityWeek)
  }, [JSON.stringify(weatherCityWeek)])

  useEffect(() => {
    if (!city_week?.locationName) return

    setDataT(() => {
      const labels = map(
        city_week.weatherElement[0].time,
        (item) => item.startTime + ' - ' + item.endTime
      )

      const lowTemps = map(
        city_week.weatherElement[3].time,
        (item) => item.elementValue[0].value
      )

      const highTemps = map(
        city_week.weatherElement[7].time,
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
  }, [city_week])

  useEffect(() => {
    console.log(dataT)
  }, [dataT])

  return (
    <>
      {dataT.datasets.length > 0 && (
        <Line key={forceRerender ? '1' : '2'} options={options} data={dataT} />
      )}
    </>
  )
}

export default weatherWeekRequest
