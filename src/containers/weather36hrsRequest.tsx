import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'lodash'
import { getWeatherIcon } from '../utils/helpers.ts'
import { Location } from '../types/response/weather-36hrs'
import { fetchWeather36hrs } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weather36hrsRequest = () => {
  const [city, setCity] = useState<string | null>(null)
  const dispatch = useDispatch()
  const [single_city, setSingle] = useState<Location | null>()
  const weatherHours = useSelector(
    (state: { hours: Location[] }) => state.hours
  )

  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    if (city) {
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
    }
  }, [city])

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-status', (data) => {
      setCity(() => data)
    })
    const subscriptionHoursStatus = EventBus.on('36hours-status', (data) => {
      setStatus(() => data)
    })
    if (weatherHours) setSingle(() => weatherHours[0] as Location)
    if (weatherHours) setStatus(() => true)

    return () => {
      subscriptionClick.off('city-status')
      subscriptionHoursStatus.off('36hours-status')
    }
  }, [weatherHours, single_city])

  return (
    <>
      {status && single_city && (
        <div className="dark">
          <div className="city-container">
            <div className="hours36">
              <h1>{single_city?.locationName}</h1>
              <div className="weather-hours">
                <div className="first">
                  <h3>今日白天</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      single_city!.weatherElement[0].time[0].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      single_city!.weatherElement[0].time[0].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      single_city!.weatherElement[1].time[0].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      single_city!.weatherElement[2].time[0].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      single_city!.weatherElement[4].time[0].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      single_city!.weatherElement[3].time[0].parameter
                        .parameterName
                    }
                  </p>
                </div>
                <div className="sec">
                  <h3>今晚明晨</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      single_city!.weatherElement[0].time[1].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      single_city!.weatherElement[0].time[1].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      single_city!.weatherElement[1].time[1].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      single_city!.weatherElement[2].time[1].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      single_city!.weatherElement[4].time[1].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      single_city!.weatherElement[3].time[1].parameter
                        .parameterName
                    }
                  </p>
                </div>
                <div className="third">
                  <h3>明日白天</h3>
                  <div
                    className={`weather-icon ${getWeatherIcon(
                      single_city!.weatherElement[0].time[2].parameter
                        .parameterName
                    )}`}
                  ></div>
                  <p>
                    {
                      single_city!.weatherElement[0].time[2].parameter
                        .parameterName
                    }
                  </p>
                  <p className="rain">
                    {
                      single_city!.weatherElement[1].time[2].parameter
                        .parameterName
                    }
                    %
                  </p>
                  <p>
                    {
                      single_city!.weatherElement[2].time[2].parameter
                        .parameterName
                    }
                    °C -{' '}
                    {
                      single_city!.weatherElement[4].time[2].parameter
                        .parameterName
                    }
                    °C
                  </p>
                  <p className="feel">
                    {
                      single_city!.weatherElement[3].time[2].parameter
                        .parameterName
                    }
                  </p>
                </div>
              </div>
              <div className="button-warp">
                {' '}
                <button
                  className="default"
                  onClick={() => {
                    EventBus.emit('forecast-status', true)
                    setStatus(() => false)
                  }}
                >
                  縣市預報
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

export default weather36hrsRequest
