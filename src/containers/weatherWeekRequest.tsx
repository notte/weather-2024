import { useEffect, useState, MouseEvent, useRef, useCallback } from 'react'
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
  const [city, setCity] = useState<string | null>(null)
  const [temp, setTemp] = useState<string | null>(null)

  const dispatch = useDispatch()
  const [status, setStatus] = useState<boolean>(false)
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
  const [forecast, setForecast] = useState<boolean>(true)
  const [TLine, setTLine] = useState<boolean>(false)
  const [ATLine, setATLine] = useState<boolean>(false)

  const forecastBtn = useRef<HTMLButtonElement | null>(null)
  const TLineBtn = useRef<HTMLButtonElement | null>(null)
  const ATLineBtn = useRef<HTMLButtonElement | null>(null)

  const handlerButton = useCallback(
    (event: MouseEvent): void => {
      event.preventDefault()
      setForecast(() => false)
      setTLine(() => false)
      setATLine(() => false)

      forecastBtn.current!.className = ''
      TLineBtn.current!.className = ''
      ATLineBtn.current!.className = ''
      event.currentTarget.className = 'active'

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
    },
    [setForecast, setTLine, setATLine]
  )

  const handleGetCity = useCallback(
    (data: string) => {
      setCity(() => data)
    },
    [setCity]
  )

  const handleForecastStatus = useCallback(
    (data: string) => {
      setCity(() => data)
      setStatus(() => true)
    },
    [setCity, setStatus]
  )

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', handleGetCity)
    const subscriptionWeekStatus = EventBus.on(
      'forecast-status',
      handleForecastStatus
    )
    return () => {
      subscriptionClick.off('city-status')
      subscriptionWeekStatus.off('forecast-status')
    }
  }, [])

  useEffect(() => {
    if (weatherCityWeek.locationName) {
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
  }, [weatherCityWeek])

  useEffect(() => {
    if (temp === city) return
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

  return (
    <>
      {status && city && weatherCityWeek.locationName && (
        <div className="dark">
          <div className="city-container">
            <div className="city-week">
              <h1>{weatherCityWeek.locationName}</h1>
              <div className="tab-warp">
                <button
                  onClick={handlerButton}
                  data-type="forecast"
                  className="active"
                  ref={forecastBtn}
                >
                  一週預報
                </button>
                <button
                  onClick={handlerButton}
                  data-type="TLine"
                  ref={TLineBtn}
                >
                  一週溫度曲線
                </button>
                <button
                  onClick={handlerButton}
                  data-type="ATLine"
                  ref={ATLineBtn}
                >
                  一週體感曲線
                </button>
              </div>
              {forecast && (
                <Table
                  weekData={
                    getWeatherWeekData(weatherCityWeek) as IWeatherWeekData[]
                  }
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
                <button
                  className="default"
                  onClick={() => {
                    EventBus.emit('36hours-status', city)
                    setTemp(() => city)
                    setStatus(() => false)
                  }}
                >
                  返回兩日預報
                </button>
                <button
                  className="default close"
                  onClick={() => {
                    setStatus(() => false)
                    EventBus.emit('city-close')
                  }}
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default weatherWeekRequest
