import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherIcon } from '../utils/helpers.ts'
import { Location } from '../types/response/weather-36hrs'
import { fetchWeather36hrs } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weather36hrsRequest = () => {
  const [city, setCity] = useState<string | null>(null)

  const dispatch = useDispatch()
  const weatherHours = useSelector(
    (state: { hours: Location[] }) => state.hours
  )

  const handleGetCity = useCallback(
    (data: string) => {
      setCity(() => data)
    },
    [city, setCity, weatherHours]
  )
  const handleBack = useCallback(
    (data: string) => {
      setCity(() => data)
    },
    [setCity]
  )

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', handleGetCity)
    const subscriptionHoursStatus = EventBus.on('36hours-status', handleBack)

    return () => {
      subscriptionClick.off('city-status')
      subscriptionHoursStatus.off('36hours-status')
    }
  }, [city, weatherHours, handleGetCity, handleBack])

  useEffect(() => {
    dispatch(fetchWeather36hrs(city as string) as never)
    const intervalId = setInterval(
      () => {
        dispatch(fetchWeather36hrs(city as string) as never)
      },
      6 * 60 * 60 * 1000
    )
    return () => {
      clearInterval(intervalId)
    }
  }, [city])

  return (
    <>
      {city && (
        <div className="dark">
          <div className="city-container">
            <div className="hours36">
              <h1>{weatherHours[0]?.locationName}</h1>
              <div className="weather-hours">
                <div className="first">
                  <h3>今日白天</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      weatherHours[0]!.weatherElement[0].time[0].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[0].time[0].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      weatherHours[0]!.weatherElement[1].time[0].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[2].time[0].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      weatherHours[0]!.weatherElement[4].time[0].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      weatherHours[0]!.weatherElement[3].time[0].parameter
                        .parameterName
                    }
                  </p>
                </div>
                <div className="sec">
                  <h3>今晚明晨</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      weatherHours[0]!.weatherElement[0].time[1].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[0].time[1].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      weatherHours[0]!.weatherElement[1].time[1].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[2].time[1].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      weatherHours[0]!.weatherElement[4].time[1].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      weatherHours[0]!.weatherElement[3].time[1].parameter
                        .parameterName
                    }
                  </p>
                </div>
                <div className="third">
                  <h3>明日白天</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      weatherHours[0]!.weatherElement[0].time[2].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[0].time[2].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      weatherHours[0]!.weatherElement[1].time[2].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      weatherHours[0]!.weatherElement[2].time[2].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      weatherHours[0]!.weatherElement[4].time[2].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      weatherHours[0]!.weatherElement[3].time[2].parameter
                        .parameterName
                    }
                  </p>
                </div>
              </div>
              <div className="button-warp">
                <button
                  className="default"
                  onClick={() => {
                    EventBus.emit('forecast-status', true)
                    setCity(() => '')
                  }}
                >
                  縣市預報
                </button>
                <button
                  className="default close"
                  onClick={() => {
                    EventBus.emit('city-close')
                    setCity(() => '')
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

export default weather36hrsRequest
