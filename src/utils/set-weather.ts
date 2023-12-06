function setWeather() {
  return (weather: string): string => {
    const regExp = new RegExp(/(雨|陰|晴|雪|雷|霧|靄|多雲|冰雹)/, 'g')

    let checkWeather = ''
    let className = ''

    if (weather) {
      const weatherArr = weather.match(regExp)
      if (weatherArr!.length > 1 && weather.includes('雨')) {
        checkWeather = '雨'
      }
    }

    switch (weather) {
      case '雨':
        className = 'rain-icon'
        break
      case '陰':
        className = 'cloudy-icon'
        break
      case '多雲':
        className = 'clouds-icon'
        break
      case '晴':
        className = 'sun-icon'
        break
      case '雪':
        className = 'snow-icon'
        break
      case '雷':
        className = 'storm-icon'
        break
      case '冰雹':
        className = 'hail-icon'
        break
      case '霧':
      case '靄':
        className = 'fog-icon'
        break
    }
    return className
  }
}

const getWeatherIcon = setWeather()

export default getWeatherIcon
