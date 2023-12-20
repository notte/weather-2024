import { replace, reduce, indexOf, map, forEach } from 'lodash'
import { CityWeek, WeatherElement, Time } from '../types/response/weather-week'
import { ICityWeekData, IWeekItem, ICityDay } from '../types/table'

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

function setWeather() {
  return (weather: string): string => {
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

// 每一欄位以日期為基礎，欄位名稱是動態抓取的日期
// 資料物件陣列 [{},{}...] 在表格以橫向為一個完整物件
// 也就是說，每個物件放的是 同一天 的資料，陣列則以日期來排序
// 抓取的 API 是一週預報，所以最後陣列長度為 7，也就是說至少要跑七遍

function setWeatherWeek() {
  const week: IWeekItem[] = [
    { day: '' },
    { day: '' },
    { day: '' },
    { day: '' },
    { day: '' },
    { day: '' },
    { day: '' },
  ]
  return (prop: CityWeek): IWeekItem[] | undefined => {
    const array = prop.weatherElement
    if (!array) return
    let days = [
      ...new Set(map(array[0].time, (item) => item.startTime.substring(0, 10))),
    ].splice(0)

    for (let i = 0; i < days.length; i++) {
      week[i].day = days[i]
    }
    const elementData = map(array, (item) => {
      const eachData = map(item.time, (each) => {
        return {
          day: each.startTime.substring(0, 10),
          value: each.elementValue[0].value,
        }
      })
      return {
        element: item.elementName,
        ...eachData,
      }
    })
    for (let item of elementData) {
      const elementName = item.element
      forEach(item, (elem) => {
        for (let index in week) {
          if (week[index].day === elem.day) {
            if (!week[index][elementName]) {
              week[index][elementName] = []
            }
            week[index][elementName] = [...week[index][elementName], elem.value]
          }
        }
      })
    }

    return week
  }
}

export const getWeatherIcon = setWeather()
export const getCityName = setCityName()
export const getAirClassName = setAir()
export const getWeatherWeek = setWeatherWeek()
