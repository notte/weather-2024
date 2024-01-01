import { useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { map, includes, filter } from 'lodash'
import { CityWeek } from '../types/response/weather-week'
import { fetchWeatherWeek } from '../redux/thunks'
import { getWeatherWeekData, getWeatherLine } from '../utils/helpers'
import Line from '../components/chart/line'
import Table from '../components/chart/table'
import { IWeatherWeekData } from '../types/table'
import * as type from '../types/common'
import EventBus from '../utils/event-bus'

const weatherWeekRequest = () => {
  const dispatch = useDispatch()
  const [city, setCity] = useState<string | null>(null)
  const weatherCityWeek = useSelector(
    (state: { cityWeek: CityWeek }) => state.cityWeek
  )
  const [single_city, setSingle] = useState<CityWeek | null>(null)
  const [dataT, setDataT] = useState<type.ILineProps>({
    labels: [],
    datasets: [],
  })
  const [dataAT, setDataAT] = useState<type.ILineProps>({
    labels: [],
    datasets: [],
  })
  const [forecast, setForecast] = useState<boolean>(true)
  const [TLine, setTLine] = useState<boolean>(false)
  const [ATLine, setATLine] = useState<boolean>(false)

  const [status, setStatus] = useState<boolean>(false)

  const handler = (event: MouseEvent): void => {
    event.preventDefault()
    setForecast(() => false)
    setTLine(() => false)
    setATLine(() => false)

    switch (event.currentTarget.getAttribute('data-type')) {
      case 'forecast':
        setForecast(() => true)
        break
      case 'TLine':
        setTLine(() => true)
        break
      case 'ATLine':
        setATLine(() => true)
        break
    }
  }

  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherWeek(city) as never)
      const intervalId = setInterval(
        () => {
          dispatch(fetchWeatherWeek(city) as never)
        },
        6 * 60 * 60 * 1000
      )
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [city])

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', (data) => {
      setCity(() => data)
    })
    const subscriptionWeekStatus = EventBus.on('forecast-status', (data) => {
      setStatus(() => data)
    })
    if (weatherCityWeek.locationName) {
      setSingle(() => weatherCityWeek)
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
    }

    return () => {
      subscriptionClick.off('city-status')
      subscriptionWeekStatus.off('forecast-status')
    }
  }, [weatherCityWeek, single_city])

  return (
    <>
      {status && single_city && (
        <div className="city-container">
          <div className="city-week">
            {' '}
            <h1>{single_city.locationName}</h1>
            <div className="tab-warp">
              <button onClick={handler} data-type="forecast">
                一週預報
              </button>
              <button onClick={handler} data-type="TLine">
                一週溫度曲線
              </button>
              <button onClick={handler} data-type="ATLine">
                一週體感曲線
              </button>
            </div>
            {forecast && (
              <Table
                weekData={getWeatherWeekData(single_city) as IWeatherWeekData[]}
              />
            )}
            {TLine && (
              <div className="chart">
                <Line {...dataT} />
              </div>
            )}
            {ATLine && (
              <div className="chart">
                <Line {...dataAT} />
              </div>
            )}
            <div className="button-warp">
              {' '}
              <button
                className="default"
                onClick={() => {
                  EventBus.emit('36hours-status', true)
                  setStatus(() => false)
                }}
              >
                返回兩日預報
              </button>
              <button
                className="default close"
                onClick={() => {
                  setStatus(() => false)
                }}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default weatherWeekRequest
