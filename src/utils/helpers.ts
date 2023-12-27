import { replace, reduce, indexOf, forEach } from 'lodash'
import { CityWeek, WeatherElement } from '../types/response/weather-week'
import { IWeatherWeekData, IWorkData } from '../types/table'

function setWeather() {
  const weatherMap: { [key: string]: string } = {
    多雲: 'clouds-icon',
    雨: 'rain-icon',
    霧: 'fog-icon',
    靄: 'fog-icon',
    陰: 'cloudy-icon',
    晴: 'sun-icon',
    雪: 'snow-icon',
    雷: 'storm-icon',
    冰雹: 'hail-icon',
  }
  const priorityWeather = [
    '晴',
    '雨',
    '陰',
    '雪',
    '雷',
    '霧',
    '靄',
    '冰雹',
    '多雲',
  ]
  return (weather: string): string => {
    const regExp = new RegExp(`(${priorityWeather.join('|')})`, 'g')
    const weatherArr = weather.match(regExp)

    let checkWeather = ''
    if (weatherArr) {
      weatherArr!.length > 1 && weather.includes('雨')
        ? (checkWeather = '雨')
        : (checkWeather =
            priorityWeather[
              reduce(
                weatherArr,
                (prev, work) => {
                  const index = indexOf(priorityWeather, work)
                  if (index > prev) return index
                  return prev
                },
                0
              )
            ])
    }

    return weatherMap[checkWeather]
  }
}

function setCityName() {
  return (city: string): string => {
    city = replace(city, '台', '臺')
    if (city === '桃園縣') city = '桃園市'
    return city
  }
}

function setAir() {
  return (aqi: number): string | undefined => {
    if (aqi <= 50) return 'good'
    if (aqi > 50 && aqi <= 100) return 'moderate'
    if (aqi > 100 && aqi <= 150) return 'sensitive'
    if (aqi > 150 && aqi <= 200) return 'unhealthy'
    if (aqi > 200 && aqi <= 300) return 'very-unhealthy'
    if (aqi > 300) return 'hazardous'
  }
}

function setWeatherWeekData() {
  return (prop: CityWeek): IWeatherWeekData[] | undefined => {
    let result: IWorkData = {}
    const array: WeatherElement[] = prop.weatherElement
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].elementName === 'WeatherDescription') continue
        if (array[i].elementName === 'PoP12h') continue

        forEach(array[i].time, (item) => {
          const key = item.startTime.substring(0, 10)
          const elementName = array[i].elementName
          if (!result[key]) result[key] = {}
          if (!result[key][elementName]) result[key][elementName] = []
          result[key][elementName].push(item.elementValue[0].value)
        })
      }
    }
    return Object.entries(result as IWorkData).map(([date, data]) => ({
      date,
      ...data,
    }))
  }
}

export const getWeatherIcon = setWeather()
export const getCityName = setCityName()
export const getAirClassName = setAir()
export const getWeatherWeekData = setWeatherWeekData()
