import { replace, reduce, indexOf } from 'lodash'

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

export const getWeatherIcon = setWeather()
export const getCityName = setCityName()
