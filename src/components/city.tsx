import { useEffect, useState } from 'react'
import EventBus from '../utils/event-bus'
import { getCityName } from '../utils/set-map.ts'

const city = () => {
  const [city, setCity] = useState<string>('')

  useEffect(() => {
    const subscription = EventBus.on('city-hover', (data) => {
      setCity(data)
    })

    return () => {
      subscription.off('city-hover')
    }
  }, [])
  return (
    <>
      {city && (
        <div className="city-container">
          <h1>{getCityName(city)}</h1>
          <p>點擊城市看詳細</p>
        </div>
      )}
    </>
  )
}

export default city
