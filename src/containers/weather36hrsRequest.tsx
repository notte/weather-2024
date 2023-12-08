import api from '../services/api'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWeather36hrsResponse } from '../redux/counterSlice'
import { filter, includes, map } from 'lodash'
import { getWeatherIcon } from '../utils/set-map.ts'
import { stations } from '../assets/data'
import { Location } from '../types/response/weather-36hrs'
import {} from '../types/response/weather-36hrs'

const weather36hrsRequest = () => {
  const dispatch = useDispatch()
  const weatherHours = useSelector(
    (state: { hours: Location[] }) => state.hours
  )

  const [single_city, setSingle] = useState<Location>()

  const demoObject = {
    locationName: '嘉義縣',
    weatherElement: [
      {
        elementName: 'Wx',
        time: [
          {
            startTime: '2023-12-08 06:00:00',
            endTime: '2023-12-08 18:00:00',
            parameter: {
              parameterName: '晴時多雲',
              parameterValue: '2',
            },
          },
          {
            startTime: '2023-12-08 18:00:00',
            endTime: '2023-12-09 06:00:00',
            parameter: {
              parameterName: '晴時多雲',
              parameterValue: '2',
            },
          },
          {
            startTime: '2023-12-09 06:00:00',
            endTime: '2023-12-09 18:00:00',
            parameter: {
              parameterName: '晴時多雲',
              parameterValue: '2',
            },
          },
        ],
      },
      {
        elementName: 'PoP',
        time: [
          {
            startTime: '2023-12-08 06:00:00',
            endTime: '2023-12-08 18:00:00',
            parameter: {
              parameterName: '0',
              parameterUnit: '百分比',
            },
          },
          {
            startTime: '2023-12-08 18:00:00',
            endTime: '2023-12-09 06:00:00',
            parameter: {
              parameterName: '0',
              parameterUnit: '百分比',
            },
          },
          {
            startTime: '2023-12-09 06:00:00',
            endTime: '2023-12-09 18:00:00',
            parameter: {
              parameterName: '0',
              parameterUnit: '百分比',
            },
          },
        ],
      },
      {
        elementName: 'MinT',
        time: [
          {
            startTime: '2023-12-08 06:00:00',
            endTime: '2023-12-08 18:00:00',
            parameter: {
              parameterName: '16',
              parameterUnit: 'C',
            },
          },
          {
            startTime: '2023-12-08 18:00:00',
            endTime: '2023-12-09 06:00:00',
            parameter: {
              parameterName: '17',
              parameterUnit: 'C',
            },
          },
          {
            startTime: '2023-12-09 06:00:00',
            endTime: '2023-12-09 18:00:00',
            parameter: {
              parameterName: '17',
              parameterUnit: 'C',
            },
          },
        ],
      },
      {
        elementName: 'CI',
        time: [
          {
            startTime: '2023-12-08 06:00:00',
            endTime: '2023-12-08 18:00:00',
            parameter: {
              parameterName: '稍有寒意至舒適',
            },
          },
          {
            startTime: '2023-12-08 18:00:00',
            endTime: '2023-12-09 06:00:00',
            parameter: {
              parameterName: '稍有寒意至舒適',
            },
          },
          {
            startTime: '2023-12-09 06:00:00',
            endTime: '2023-12-09 18:00:00',
            parameter: {
              parameterName: '稍有寒意至舒適',
            },
          },
        ],
      },
      {
        elementName: 'MaxT',
        time: [
          {
            startTime: '2023-12-08 06:00:00',
            endTime: '2023-12-08 18:00:00',
            parameter: {
              parameterName: '27',
              parameterUnit: 'C',
            },
          },
          {
            startTime: '2023-12-08 18:00:00',
            endTime: '2023-12-09 06:00:00',
            parameter: {
              parameterName: '22',
              parameterUnit: 'C',
            },
          },
          {
            startTime: '2023-12-09 06:00:00',
            endTime: '2023-12-09 18:00:00',
            parameter: {
              parameterName: '27',
              parameterUnit: 'C',
            },
          },
        ],
      },
    ],
  }

  // const fetchData = useCallback(async () => {
  //   try {
  //     const res = await api.getWeather36hrs()
  //     dispatch(setWeather36hrsResponse(res.records.location))
  //   } finally {
  //   }
  // }, [dispatch])

  // useEffect(() => {
  //   fetchData()
  //   const intervalId = setInterval(
  //     () => {
  //       fetchData()
  //     },
  //     6 * 60 * 60 * 1000
  //   )
  //   return () => clearInterval(intervalId)
  // }, [])

  // useEffect(() => {
  //   setSingle(() => weatherHours[0])
  // }, [weatherHours])

  return (
    <>
      <div className="hours36">
        <h1>{demoObject.locationName}</h1>
        <div className="weather-hours">
          <div className="first">
            <h3>今日白天</h3>
            <div
              className={`weather-icon ${getWeatherIcon(
                demoObject.weatherElement[0].time[0].parameter.parameterName
              )}`}
            ></div>
            <p>
              {demoObject.weatherElement[0].time[0].parameter.parameterName}
            </p>
            <p className="rain">
              {demoObject.weatherElement[1].time[0].parameter.parameterName}%
            </p>
            <p>
              {demoObject.weatherElement[2].time[0].parameter.parameterName}°C -{' '}
              {demoObject.weatherElement[4].time[0].parameter.parameterName}°C
            </p>
            <p className="feel">
              {demoObject.weatherElement[3].time[0].parameter.parameterName}
            </p>
          </div>
          <div className="sec">
            <h3>今晚明晨</h3>
            <div
              className={`weather-icon ${getWeatherIcon(
                demoObject.weatherElement[0].time[1].parameter.parameterName
              )}`}
            ></div>
            <p>
              {demoObject.weatherElement[0].time[1].parameter.parameterName}
            </p>
            <p className="rain">
              {demoObject.weatherElement[1].time[1].parameter.parameterName}%
            </p>
            <p>
              {demoObject.weatherElement[2].time[1].parameter.parameterName}°C -{' '}
              {demoObject.weatherElement[4].time[1].parameter.parameterName}°C
            </p>
            <p className="feel">
              {demoObject.weatherElement[3].time[1].parameter.parameterName}
            </p>
          </div>
          <div className="third">
            <h3>明日白天</h3>
            <div
              className={`weather-icon ${getWeatherIcon(
                demoObject.weatherElement[0].time[2].parameter.parameterName
              )}`}
            ></div>
            <p>
              {demoObject.weatherElement[0].time[2].parameter.parameterName}
            </p>
            <p className="rain">
              {demoObject.weatherElement[1].time[2].parameter.parameterName}%
            </p>
            <p>
              {demoObject.weatherElement[2].time[2].parameter.parameterName}°C -{' '}
              {demoObject.weatherElement[4].time[2].parameter.parameterName}°C
            </p>
            <p className="feel">
              {demoObject.weatherElement[3].time[2].parameter.parameterName}
            </p>
          </div>
        </div>
        <button>縣市預報</button>
      </div>
    </>
  )
}

export default weather36hrsRequest
