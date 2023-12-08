import { replace } from 'lodash'

const weatherMap: { [key: string]: string } = {
  雨: 'rain-icon',
  霧: 'fog-icon',
  靄: 'fog-icon',
  陰: 'cloudy-icon',
  多雲: 'clouds-icon',
  晴: 'sun-icon',
  雪: 'snow-icon',
  雷: 'storm-icon',
  冰雹: 'hail-icon',
}

function setWeather() {
  return (weather: string): string => {
    const regExp = new RegExp(/(雨|陰|晴|雪|雷|霧|靄|多雲|冰雹)/, 'g')
    const weatherArr = weather.match(regExp)

    let checkWeather = ''
    if (weatherArr) {
      weatherArr!.length > 1 && weather.includes('雨')
        ? (checkWeather = '雨')
        : (checkWeather = weatherArr![0])
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
