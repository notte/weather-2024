import {
  replace,
  reduce,
  indexOf,
  forEach,
  map,
  includes,
  entries,
} from 'lodash'
import { CityWeek, WeatherElement } from '../types/response/weather-week'
import { WeatherElementTown, Time } from '../types/response/weather-town'
import { IWorkData, IWeatherWeekData, ITemperature, IWx } from '../types/table'
import * as type from '../types/common'

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
  return (weather: string): string | undefined => {
    if (weather) {
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
  return (prop: CityWeek): IWorkData[] | undefined => {
    let result: IWorkData[] = []
    let obj: IWorkData = {}
    const array: WeatherElement[] = prop.weatherElement
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].elementName === 'WeatherDescription') continue
        if (array[i].elementName === 'PoP12h') continue

        const elementName = array[i].elementName
        obj = {}
        forEach(array[i].time, (item, index) => {
          if (index === 0 && includes(item.startTime, '18:00')) return
          const day = item.startTime.substring(0, 16)

          if (!obj[elementName]) obj[elementName] = {}
          if (!obj[elementName][day]) {
            obj[elementName][day] = item.elementValue[0].value
          }
        })
        result.push(obj)
      }
      return result
    }
  }
}

function setTowntWeather() {
  return (weather: WeatherElementTown[]): IWorkData[] | undefined => {
    let result: IWorkData[] = []
    let obj: IWorkData = {}
    const array: WeatherElementTown[] = weather
    if (array) {
      for (let i = 0; i < array.length; i++) {
        obj = {}
        const elementName = array[i].elementName
        forEach(array[i].time, (item) => {
          const day = item.startTime
            ? item.startTime.substring(0, 16)
            : item.dataTime
              ? item.dataTime.substring(0, 16)
              : null

          if (!obj[elementName]) obj[elementName] = {}
          if (day && !obj[elementName][day] && elementName === 'CI') {
            obj[elementName][day] = item.elementValue[1].value
          }
          if (day && !obj[elementName][day]) {
            obj[elementName][day] = item.elementValue[0].value
          }
        })
        result.push(obj)
      }
      return result
    }
  }
}
function setTemperature() {
  return (
    min: IWeatherWeekData,
    max: IWeatherWeekData
  ): ITemperature | undefined => {
    const obj: { [key: string]: { [key: string]: string } } = {}
    let minArr
    let maxArr
    if (min.MinT && max.MaxT) {
      minArr = entries(min.MinT as Object)
      maxArr = entries(max.MaxT as Object)
    }
    if (min.MinAT && max.MaxAT) {
      minArr = entries(min.MinAT as Object)
      maxArr = entries(max.MaxAT as Object)
    }
    if (minArr && maxArr) {
      for (let i = 0; i < minArr.length; i++) {
        const sameDay = minArr[i][0].substring(0, 10)
        const isDay =
          includes(minArr[i][0], '06:00') || includes(minArr[i][0], '12:00')
        const time = isDay ? 'day' : 'night'

        if (!obj[sameDay]) obj[sameDay] = {}
        obj[sameDay][time] = `${minArr[i][1]}°C - ${maxArr[i][1]}°C`
      }
      return obj
    }
  }
}

function setWx() {
  return (Wx: Object): IWx | undefined => {
    const array = entries(Wx as Object)
    const obj: IWx = {}
    map(array, (item) => {
      const sameDay = item[0].substring(0, 10)
      const isDay = includes(item[0], '06:00') || includes(item[0], '12:00')
      const time = isDay ? 'day' : 'night'
      if (!obj[sameDay]) obj[sameDay] = {}
      obj[sameDay][time] = item[1]
    })
    return obj
  }
}

function setWeatherLine() {
  return (
    low: WeatherElement | WeatherElementTown,
    high: WeatherElement | WeatherElementTown
  ): type.ILineProps => {
    if (includes(low.description, '最') || includes(high.description, '最')) {
      const label = map(
        map(low.time, (item: Time) => item.startTime + ' - ' + item.endTime),
        (item) => {
          let array = item.split(' - ')
          if (
            includes(array[0], '06:00:00') ||
            includes(array[0], '12:00:00')
          ) {
            return `${array[0].substring(5, 10)} 白天`
          } else {
            return `${array[0].substring(5, 10)} 晚上`
          }
        }
      )

      const lowTemps = map(low.time, (item: Time) => item.elementValue[0].value)
      const highTemps = map(
        high.time,
        (item: Time) => item.elementValue[0].value
      )

      return {
        labels: label,
        datasets: [
          {
            label: low.description,
            data: lowTemps,
            borderColor: '#1ce1da',
          },
          {
            label: high.description,
            data: highTemps,
            borderColor: '#e98337',
          },
        ],
      }
    } else {
      const label = map(low.time, (item: Time) => {
        return item.dataTime?.substring(5, 16)
      })

      const lowTemps = map(low.time, (item: Time) => item.elementValue[0].value)
      const highTemps = map(
        high.time,
        (item: Time) => item.elementValue[0].value
      )

      return {
        labels: label as string[],
        datasets: [
          {
            label: low.description,
            data: lowTemps,
            borderColor: '#1ce1da',
          },
          {
            label: high.description,
            data: highTemps,
            borderColor: '#e98337',
          },
        ],
      }
    }
  }
}

function setUVI() {
  return (uvi: string): string => {
    if (+uvi < 3) return 'v1'
    if (+uvi > 2 && +uvi < 6) return 'v2'
    if (+uvi > 5 && +uvi < 8) return 'v3'
    if (+uvi > 7 && +uvi < 11) return 'v4'
    return 'v5'
  }
}

function setTownTableColspan() {
  return (col: string, data: string[]) => {
    let time = 0
    const str = col.substring(0, 10)
    for (let i = 0; i < data.length; i++) {
      if (includes(data[i], str)) time++
    }
    return time
  }
}

export const getWeatherIcon = setWeather()
export const getCityName = setCityName()
export const getAirClassName = setAir()
export const getWeatherWeekData = setWeatherWeekData()
export const getTemperature = setTemperature()
export const geWx = setWx()
export const getWeatherLine = setWeatherLine()
export const getUVIClass = setUVI()
export const getTowntWeather = setTowntWeather()
export const getColspan = setTownTableColspan()
