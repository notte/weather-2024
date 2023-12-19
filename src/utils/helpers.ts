import { replace, reduce, indexOf, map } from 'lodash'
import { CityWeek, WeatherElement, Time } from '../types/response/weather-week'
import { ICityWeekData } from '../types/table'

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

const week = [
  { day: '' },
  { day: '' },
  { day: '' },
  { day: '' },
  { day: '' },
  { day: '' },
  { day: '' },
]

function setWeatherWeek() {
  return (prop: CityWeek) => {
    const array = prop.weatherElement
    console.log(array)
  }
}

// function setWeatherWeek() {
//   return (prop: CityWeek) => {
//     const array = Object.entries(prop)
//     let item = {}
//     let time: string[] = []

//     for (let index in array) {
//       if (array[index][0] === 'weatherElement') {
//         item = map(array[index][1], (item: WeatherElement) => {
//           return {
//             element: item.elementName,
//             description: item.description,
//             measures: item.time[0].elementValue[0].measures,
//             value: map(item.time, (each) => {
//               return each.elementValue[0].value
//             }),
//           }
//         })

//         time = map(array[index][1][0].time, (item: Time) => {
//           return item.startTime
//         })
//       }
//     }

//     return {
//       locationName: prop.locationName,
//       lat: prop.lat,
//       lon: prop.lon,
//       weatherElement: item,
//       time,
//     } as ICityWeekData
//   }
// }

// function setWeatherWeek() {
//   return (prop: CityWeek) => {
//     const array = Object.entries(prop)
//     let item = {}

//     for (let index in array) {
//       if (array[index][0] === 'weatherElement') {
//         console.log(array[index][1])
//         item = map(array[index][1], (item: WeatherElement) => {
//           return {
//             description: item.description,
//             data: item.time,
//           }
//         })
//       }
//     }

//     return {
//       locationName: prop.locationName,
//       lat: prop.lat,
//       lon: prop.lon,
//       weatherElement: item,
//     }
//   }
// }

export const getWeatherIcon = setWeather()
export const getCityName = setCityName()
export const getAirClassName = setAir()
export const getWeatherWeek = setWeatherWeek()
