import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'lodash'
import { getWeatherIcon } from '../utils/helpers.ts'
import { Location } from '../types/response/weather-36hrs'
import { fetchWeather36hrs } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weather36hrsRequest = () => {
  const [cityclick, setCityClick] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [single_city, setSingle] = useState<Location>()

  const weatherHours = useSelector(
    (state: { hours: Location[] }) => state.hours
  )

  useEffect(() => {
    dispatch(fetchWeather36hrs() as never)
    const intervalId = setInterval(
      () => {
        dispatch(fetchWeather36hrs() as never)
      },
      6 * 60 * 60 * 1000
    )
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const subscriptionClick = EventBus.on('city-click', (data) => {
      let cityData = filter(weatherHours, (item) => item.locationName === data)
      setSingle(() => cityData[0] as Location)
      setCityClick(true)
    })
    return () => {
      subscriptionClick.off('city-click')
    }
  }, [weatherHours])

  return (
    <>
      {cityclick && (
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
            <button>縣市預報</button>
            <button
              className="close"
              onClick={() => {
                setCityClick(false)
                EventBus.emit('city-close')
              }}
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default weather36hrsRequest
